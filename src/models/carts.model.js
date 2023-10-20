import mongoose from "mongoose";

const cartCollection = 'carts';
const cartSchema = new mongoose.Schema({
    cartId:Number,
    products:Array
})
export const cartModel = mongoose.model(cartCollection,cartSchema);