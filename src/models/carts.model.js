import mongoose from "mongoose";

const cartCollection = 'carts';
const cartSchema = new mongoose.Schema({
    cartId:Number,
    user:{
        type: mongoose.Schema.Types.ObjectID,
        ref:'users',
        _id: false
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
export const cartModel = mongoose.model(cartCollection,cartSchema);