import express from "express";
import {ProductManager} from './inc/Products.js'

const manager = new ProductManager()
const app = express()

app.get('/',(req,res) =>{
    res.send("Bienvenido, constulte /products para obtener todos los productos")
})

app.get("/products",(req,res) =>{
    const limit = req.query.limit;
    let arr = []
    manager.getProducts().then((r) =>{
        if(limit){
            console.log("limit", limit);
            res.json(r.slice(0,+limit))
        } else{
            res.send(r)
        }
    })
    .catch((e) => {
        res.send("ERROR")
    })
})

app.get("/products/:pid",(req,res) => {
    manager.getProductById(+req.params.pid).then((r) =>{
             res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
    console.log(req)
})

app.listen(8080)