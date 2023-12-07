const express = require('express');
const fss = require("fs");
const cors = require('cors');
const fs = fss.promises;

const app = express();
const port = 3000;
var corOptions = {
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: false,
    maxAge: 3600,
};
app.use(cors(corOptions));
 app.use(cors());
app.use(express.json());

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error interno del servidor");
});

// ************************************//
//         Secccion de Json.
// ************************************//
const dataFilePath = './data.json';
// Obtener todos los elementos
app.get("/api/clientes", async (req, res) => {
    try {
        const data = await fs.readFile(dataFilePath, "utf8");
        const items = JSON.parse(data);
        res.json(items);
    } catch (error) {
        console.log(error);
    }
});

// Crear un nuevo elemento
app.post("/api/clientes", async (req, res) => {
    try {
        // Validamos los campos
        if (!req.body.nombre || !req.body.email || !req.body.numero ||!req.body.mensaje) {
            return res
                .status(400)
                .json({ message: "Todos los campos son requeridos" });
        } else {
            const newItem = req.body;
            const data = await fs.readFile(dataFilePath, "utf8");
            const items = JSON.parse(data);
            newItem.id = getNextId(items);
            items.push(newItem);
            await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), "utf8");
            res
                .status(201)
                .json({ data: newItem, message: "La información fué Registrada" });
        }
    } catch (error) {
        console.log(error);
    }
});




// Función para obtener el próximo ID
function getNextId(clientes) {
        if (!clientes || clientes.length === 0) {
        return 1;
    }
    const maxId = Math.max(...clientes.map((item) => item.id));
    return maxId + 1;
}

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});



// Seleccionar el elemento en el que mostrarás el contenido JSON


