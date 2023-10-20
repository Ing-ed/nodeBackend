import mongoose from 'mongoose'

const userCollection = 'users'; //nombre de la coleccion en la base de datos
const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    }
})

export const userModel = mongoose.model(userCollection,userSchema);