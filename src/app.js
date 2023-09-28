import express from "express";
import handlebars from 'express-handlebars'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carrito.router.js'
import viewRouter from './routes/views.router.js'
import __dirname from "./utils.js";

// const manager = new ProductManager()
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

app.listen(8080)