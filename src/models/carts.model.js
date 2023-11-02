import mongoose from "mongoose";

const cartCollection = 'carts';
const cartSchema = new mongoose.Schema({
    cartId:Number,
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