import mongoose from "mongoose";

const ticketCollection = 'tickets';
const ticketSchema = new mongoose.Schema({
    code:{
        type:String,
        unique:true
    },
    dateTime:{
        type:String,
    },
    amount:{
        type:Number
    },
    email:{
        type:String
    },
    products:{
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectID,
                    ref:'products'
                },
                _id:false,
                quantity:Number
            }
        ],
        default:[],
    }
}) 
export const TicketModel = mongoose.model(ticketCollection,ticketSchema);