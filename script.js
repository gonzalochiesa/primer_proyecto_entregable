
function cliente(name, numero, email, mensaje) {
  this.nombre = name;
  this.numero = numero;
  this.email = email;
  this.mensaje = mensaje;
}

let obtenerNombre = () => document.getElementById("name").value;
let obtenerNumero = () => parseInt(document.getElementById("numero").value);
let obtenerEmail = () => document.getElementById("email").value;
let obtenerMensaje = () => document.getElementById("mensaje").value;


let enviar = () => {

  let nuevoDato = new cliente(obtenerNombre(), obtenerNumero(), obtenerEmail(), obtenerMensaje());
  console.log(nuevoDato)
  guardarCliente(nuevoDato)



  console.log("Cliente enviado:", nuevoDato);




}

document.getElementById("enviar").addEventListener("click", enviar);

var apiUrl = "http://localhost:3000/api/clientes";

// Función para crear o actualizar un usuario
function guardarCliente(cliente) {
  console.log("Voy a grabar el registro..");
  var method = "POST";
  var url = apiUrl;


  fetch(url, {
    method: method,
    body: JSON.stringify({
      nombre: cliente.nombre,
      email: cliente.email,
      mensaje: cliente.mensaje,
      numero: cliente.numero
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      cargarUsuarios();
      document.getElementById("usuarioForm").reset();
    })
    .catch((error) => {
      console.error("Error al guardar usuario:", error);
    });
}

