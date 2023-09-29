import express from "express";
import handlebars from 'express-handlebars'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carrito.router.js'
import viewRouter from './routes/views.router.js'
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { ProductManager } from "./Products.js";

const manager = new ProductManager("productos.json")
let prods = []
manager.getProducts()
.then((r) =>{
    prods = r
})
const app = express()
//inicializar el motor de plantillas
app.engine('handlebars', handlebars.engine())
//indicar las rutas donde estan las vistas
app.set('views', __dirname+'/views');
//indicar que motor se quiere utilizar
app.set('view engine','handlebars');

app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded( {extended : true}))

app.use('/',viewRouter);
app.use('/api/products',productRouter);
app.use('/api/cart', cartRouter);

const httpServer = app.listen(8080)
const socketServer = new Server(httpServer);
socketServer.on('connection',socket=>{
    console.log("cliente conectado");
    socket.on("connection",(data) =>{
        console.log(data)
    })
    socket.on("updateProd",data =>{
        manager.updateProduct(data)
        .then((r) => {
            socketServer.emit("updateProd",r)
        }).catch((e)=>{
            socketServer.emit("updateProd",e)
        })
        console.log("recibi",data)
    })
})