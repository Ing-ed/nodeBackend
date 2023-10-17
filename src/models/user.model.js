import mongoose from 'mongoose'

const userCollection = 'users'; //nombre de la coleccion en la base de datos
const userScheme = new mongoose.Schema({
    first_name:string,
    last_name:string,
    email:{
        type:string,
        unique:true
    }
})

export const userModel = mongoose.model(userCollection,userScheme);