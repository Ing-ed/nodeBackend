import express from "express";
import {ProductManager} from './inc/Products.js'

const manager = new ProductManager()
const app = express()

app.get('/',(req,res) =>{
    res.send("Bienvenido, constulte /products para obtener todos los productos")
})

app.get("/products",(req,res) =>{
    let arr = []
    manager.getProducts().then((r) =>{
        res.send(r)
    })
    .catch((e) => {
        res.send("ERROR")
    })
})

app.get("/products/:pid",(req,res) => {
    console.log(req.params)
})

app.listen(8080)