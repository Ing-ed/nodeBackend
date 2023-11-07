// import { application } from "express";

const socket = io();

const form = document.getElementById("sender");
form.onsubmit = (e) =>{
    e.preventDefault();
    //console.log("Aca")
    let user = document.getElementById("user")
    let message = document.getElementById("message");
    //console.log(message.value)
    fetch('http://localhost:8080/messages',{
        method:'POST',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            user:user.value,
            message:message.value
        })
    })
    .then((r) =>{
        return r.json()
    })
    .then((r) => {
        //console.log(r,"R")
        if (r.payload === "OK"){
            window.alert("Mensaje guardado con exito")
            message.value = ""
            user.value = ""
        } else {
            window.alert(`algo salio mal`)
        }
    }) .catch((e => { window.alert (`algo salio mal catch ${JSON.stringify(e)}`)}))
}
socket.on("chat", data =>{
    let chat = document.getElementById("chat")
    //console.log("chat",data)
})