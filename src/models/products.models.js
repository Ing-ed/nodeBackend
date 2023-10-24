import mongoose from "mongoose";
const productCollection = 'products'; //Nombre de la coleccion
const productSchema = new mongoose.Schema({
    title: {type: String, required:true, unique:true},
    description:{type: String,required: true},
    code:{type: String,required: true,unique:true},
    category:{type: String,required: true},
    price:{type: Number,required: true},
    status:{type: Boolean,required: true},
    stock:{type: Number,required: true},
    thumbnails:Array
})

export const productModel = mongoose.model(productCollection,productSchema);