import express from "express";
import session from "express-session";
import handlebars from 'express-handlebars'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carrito.router.js'
import viewRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'
import sessionRouter from './routes/sessions.router.js'
import messageRouter from './routes/messages.router.js'
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo'
import passport from "passport";
import './passport.js'
// import InitializePassport from "./config/passport.config.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";
// import { ProductManager } from "./views/Dao/Products.js";
// import { messageModel } from "./models/messages.models.js";
import mongoose from 'mongoose'

// const manager = new ProductManager("productos.json")
// let prods = []
// manager.getProducts()
// .then((r) =>{
//     prods = r
// })
const app = express()
//inicializar el motor de plantillas
app.engine('handlebars', handlebars.engine())
//indicar las rutas donde estan las vistas
app.set('views', __dirname+'/views');
//indicar que motor se quiere utilizar
app.set('view engine','handlebars');

//indicar el directorio publico
app.use(express.static(__dirname+'/public'))
//indicar el uso de json y urlencode
app.use(express.json())
app.use(express.urlencoded( {extended : true}))
//clave para las cookies firmadas
app.use(cookieParser("signada"))
// uso de sesiones
app.use(session({
    store:MongoStore.create({
        mongoUrl: 'mongodb+srv://inged:Bujinkan.bud0@ecommerce.qbxfygm.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:15
    }),
    secret:"mobyDick",
    cookie:{maxAge: 60000}
}))
// InitializePassport();
app.use(passport.initialize());
app.use(passport.session());


//indicar las rugas
app.use('/',viewRouter);
app.use('/api/products',productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users',userRouter);
app.use('/api/sessions',sessionRouter)
app.use('/messages',messageRouter);


const httpServer = app.listen(8080)
mongoose.connect('mongodb+srv://inged:Bujinkan.bud0@ecommerce.qbxfygm.mongodb.net/?retryWrites=true&w=majority')


const socketServer = new Server(httpServer);
socketServer.on('connection',socket=>{
    //console.log("cliente conectado");
    socket.on("connection",(data) =>{
        //console.log(data)
    })

    socket.on("getProducts" ,data =>{
        //console.log("IS")
        manager.getProducts()
        .then((r) => {
            socketServer.emit("getProducts",r)
        })
    })

    socket.on("addProduct",data =>{
        manager.addProduct(data)
        .then((r) => {
            //console.log(r,"r")
            manager.getProducts()
            .then((r) => {
                //console.log("R -> ",r)
                socketServer.emit("getProducts",r)
            }) .catch((e) => socketServer.emit(e))
        }).catch((e)=>{
            socketServer.emit("updateProd",e)
        })
        //console.log("recibi",data)
    })

    socket.on("deleteProduct",data=>{
        manager.deleteProduct(data)
        .then((r) => {
            //console.log(r,"r")
            manager.getProducts()
            .then((r) =>{
                socketServer.emit("getProducts",r)
            }).catch((e) => socketServer.emit(e))
        }).catch((e)=>{
            socketServer.emit("updateProd",e)
        })
    })
})