var apiUrl = "http://localhost:3000/api/clientes";


const cargoTabla = () => {
    console.log("cargo tabla");
    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
    .then((response) => {
        let tabla = document.getElementById("tablaClientes").getElementsByTagName("tbody")[0];
        tabla.innerHTML = "";
        for (let i = 0; i < response.length; i++) {
            const element = response[i];
            var fila = tabla.insertRow();
            var  celdaNombre= fila.insertCell(0);
            var  celdaEmail= fila.insertCell(1);
            var  celdaMensaje= fila.insertCell(2);
            var celdaNumero = fila.insertCell(3);
            var celdaId = fila.insertCell(4);
    
            celdaNombre.innerHTML = element.nombre;
            celdaEmail.innerHTML = element.email;
            celdaMensaje.innerHTML = element.mensaje;
            celdaNumero.innerHTML = element.numero;
            celdaId.innerHTML = element.id;
    
        }    
    })
}
document.addEventListener("DOMContentLoaded", cargoTabla);
