import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'; //nombre de la coleccion en la base de datos
const userSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    rol:{
        type:String,
    }
})

export const userModel = mongoose.model(userCollection,userSchema);