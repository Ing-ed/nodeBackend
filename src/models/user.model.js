import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'; //nombre de la coleccion en la base de datos
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number
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
        default:'user'
    },
    isThird:{
        type:Boolean,
        default:false
    }
})

export const userModel = mongoose.model(userCollection,userSchema);