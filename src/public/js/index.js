// window.alert("Hola, soy js")
const prods = document.getElementsByClassName("prod");
const page = document.getElementById("index");
const productos = document.getElementById("productos")

let products = []
const socket = io();
socket.emit("connection","Hola, esto es un socket")
socket.emit("connection",22)

//console.log("emitBegin")
socket.emit("getProducts");
//console.log("emitEND")

const form = document.getElementById("form")
form.onsubmit = (e) =>{
    e.preventDefault()
    const inputs = form.getElementsByTagName("input")
    //console.log(inputs[0].name,"ACA")
    const prodAdd = {
        title : inputs[0].value,
        description : inputs[1].value,
        code : inputs[2].value,
        price : inputs[3].value,
        status : true,
        stock : inputs[4].value,
        category : inputs[5].value,
        thumbnails : [""]
    }
    socket.emit("addProduct",prodAdd)
    //console.log(prodAdd)
}


const form2 = document.getElementById("form2")
form2.onsubmit = (e) =>{
    e.preventDefault()
    const inputs = form2.getElementsByTagName("input")
    const prodDelete = {
        prodId: inputs[0].value
    }
    socket.emit("deleteProduct",prodDelete)
    //console.log("eliminar",prodDelete)
}

socket.on("getProducts",data =>{
    // //console.log("dataGetProds",data)
    products = data
    productos.innerHTML = ""
    products.map((item,index) => {
        productos.innerHTML += `<h3>Producto ${index}`
        for(let i in item){
            //console.log(i,item[i])
            productos.innerHTML += `${i} : ${item[i]}<br>`
        }
        productos.innerHTML += `<hr>`
    })
    //console.log(products,"productos")
})
