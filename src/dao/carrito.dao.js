import { cartModel } from "../models/carts.model.js";

class CartManager{
    constructor(){}
    async GetById(params){
        let {cid} = params
        try{
            let carts = await cartModel.find();
            if(cid === undefined){
                return({result:"success",payload:carts})
            }
            let result = await cartModel.findOne({_id:cid}).populate('products.product').lean()
            return({result:"success",payload:result})
        } catch (error){
            return("error", error.message)
        }
    }
    async getByUser({uid}){
        try{
            let cart = await cartModel.findOne({user:uid})
            if(!cart){
                return(null)
            }
            return(cart)
        } catch(error){
            return(null);
        }
    }
    async CreateCart(params){
        let { uid } = params;
        console.log(uid,"uid")
        try{
            console.log("2")
            let cartId = await cartModel.count()
            console.log(cartId)
            let result = await cartModel.create({
                cartId: cartId +1,
                user:uid
            })
            console.log("3")
            console.log("resultado",result._id.toString())
            let resp = await cartModel.findOne({_id:result._id}).populate({path:'products.product', select:'title description price'})
            // console.log(resp)
            return(resp)
        } catch (error){
            return({result:"error",error:error.message});
        }
    }
    async UpdateCart(cid,body){
        let {prodId,quantity} = body
        try{
            let result = await cartModel.findOneAndUpdate(
                {_id:cid,'products.product':prodId},
                {$inc:{'products.$.quantity':+quantity}},
                {new:true}
            )
            if(!result){
                let result = await cartModel.updateOne(
                {_id:cid},
                {$push:{products:{product:prodId.toString(),quantity:quantity}}}
            )}
            console.log(result, "result")
            return({result:"Success",payload:result})
        } catch (error) {
            //console.log("error",error.message)
            if(error.message.includes('expired')){
                return("tiempo expirado")
            }
            else
                return({result:"error",error:error.message});
        }
    }
    async UpdateOne(params){
        const {cid,pid} = params
        try{
            let carts = await cartModel.find()
            let cartIndex = carts.findIndex((item) => item.cartId === +cid)
            //console.log(carts[cartIndex]);
            let prodIndex = carts[cartIndex].products.findIndex((item) => item.prodId === +pid);
            let prod = []
            if(prodIndex >= 0){
                prod = {prodId:+pid,quantity:+carts[cartIndex].products[prodIndex].quantity + +req.body.quantity}; //es el producto a actualizar
            } else {
                prod = carts[cartIndex].products
                prod.push({prodId:+pid,quantity:+req.body.quantity})
            }
            //console.log(prod)
            let result = await cartModel.updateOne({_id:carts[cartIndex]._id},{products:prod})
            return({result:"sucess",payload:result})
            // //console.log(result)
        } catch (error){
            return({result:"error",error:error.message})
            //console.log("error",error)
        }
    }
    async CleanCart(cid){
        console.log(cid)
        try{
            let result = await cartModel.updateOne(
                {_id:cid},
                {$set: {products:[]}}
            )
            return(result)
        } catch (error) {
            return(error.message)
        }
    }
    async CleanProdFromCart(params){
        console.log("clean")
        let {cid, pid} = params;
        try{
            let result = await cartModel.updateOne(
                {cartId:cid},
                {$pull:{products : {product: pid}}}                
                )
            return({result:"succes",payload:result})
        } catch(error){
            return({result:"error",error:error.message})    
        }
    }
} export default CartManager