// window.alert("Hola, soy js")
const socket = io();
socket.emit("connection","Hola, esto es un socket")
socket.emit("connection",22)

const form = document.getElementById("form")
form.onsubmit = (e) =>{
    e.preventDefault()
    const inputs = form.getElementsByTagName("input")
    const prodMod = {
        prodId : +inputs[0].value,
        field : inputs[1].value,
        value : inputs[2].value,
    }
    socket.emit("updateProd",prodMod)
    console.log(prodMod)
}

socket.on("updateProd",data =>{
    console.log("data",data)
})

// document.getElementById("modificar").addEventListener("click",()={
//     // const prodMod = {}
// })