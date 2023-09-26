import express from "express";
// import {ProductManager} from '../../inc/Products.js'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carrito.router.js'

// const manager = new ProductManager()
const app = express()
app.use(express.json())
app.use(express.urlencoded( {extended : true}))

app.use('/api/products',productRouter);
app.use('/api/cart', cartRouter);

app.listen(8080)