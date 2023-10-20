import mongoose from "mongoose";
const productCollection = 'products'; //Nombre de la coleccion
const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    code:String,
    price:Number,
    status:Boolean,
    stock:Number,
    thumbnails:Array
})

export const productModel = mongoose.model(productCollection,productSchema);