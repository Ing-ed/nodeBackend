import express from "express";
// import {ProductManager} from '../../inc/Products.js'
import productRouter from './routes/products.router.js'

// const manager = new ProductManager()
const app = express()
app.use(express.json())
app.use(express.urlencoded( {extended : true}))

app.use('/api/products',productRouter);

app.listen(8080)