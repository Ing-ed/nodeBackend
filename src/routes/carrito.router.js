import { ProductManager } from "../views/Dao/Products.js";
import { Router } from "express";
import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.models.js";
const router = Router();

const manager = new ProductManager("productos.json","carrito.json");

router.get("/:cid?",async (req,res) =>{
    const {cid} = req.params;
    try{
        let carts = await cartModel.find();
        if(cid === undefined){
            res.send({result:"success",payload:carts})
            return
        }
        console.log(carts, "Carritos")
        let result = await cartModel.findOne(
            {cartId:+cid}
        ).populate('products')
        res.send({result:"success",payload:result})
        
        // console.log(carts)
    } catch (error){
        console.log("error", error)
    }
    // manager.getCartById({cartId:+cid})
    // .then((r) => {
    //     res.send({message:r})
    // }) .catch((e) => {
    //     res.send({message:e})
    // })
})

router.post("/",async (req,res) =>{
    let {prodId,quantity} = req.body
    console.log(!prodId,!quantity)
    if((prodId === undefined) || (quantity === undefined)){res.send({result:"error",error:"Faltan datos"}) 
    return}
    try{
        let carts = await cartModel.find();
        let cartindex = carts.length > 0? carts.length++ : 0;
        console.log(cartindex)
        carts = await cartModel.create({
            cartId:cartindex,
            products:[req.body]
        })
        res.send({result:"success",payload:carts});
        // let cart = await cartModel.create({

        // })
    } catch (error){
        res.send({result:"error",error:error});
        console.log("Error", error)
    }
    // console.log("body",req.body);
    // manager.addProductToCart(req.body)
    // .then((r) =>{
    //     res.send({message:r})
    // }) .catch((e) =>{
    //     res.send({error:e})
    // })
})

router.put("/:cid", async (req,res) =>{
    let {cid} = req.params
    let {pid, cant} = req.body
    console.log("aca")
    console.log(req.body)
    try{
        let result = await cartModel.updateOne(
            {cartId:+cid},
            {$push:{products:req.body}}
        )
        res.send({result:"Success",payload:result})
    } catch (error) {
        res.send({result:"error",error:error.message});
    }
})

router.put("/:cid/product/:pid",async (req,res)=>{
    const {cid,pid} = req.params
    console.log("params",cid,pid)
    try{
        let carts = await cartModel.find()
        let cartIndex = carts.findIndex((item) => item.cartId === +cid)
        console.log(carts[cartIndex]);
        let prodIndex = carts[cartIndex].products.findIndex((item) => item.prodId === +pid);
        let prod = []
        if(prodIndex >= 0){
            prod = {prodId:+pid,quantity:+carts[cartIndex].products[prodIndex].quantity + +req.body.quantity}; //es el producto a actualizar
        } else {
            prod = carts[cartIndex].products
            prod.push({prodId:+pid,quantity:+req.body.quantity})
        }
        console.log(prod)
        let result = await cartModel.updateOne({_id:carts[cartIndex]._id},{products:prod})
        res.send({result:"sucess",payload:result})
        // console.log(result)
    } catch (error){
        console.log("error",error)
    }

    // manager.updateProductFromCart({cartId:+cid,prodId:+pid,quantity:req.body.quantity})
    // .then((r) => {
    //     res.send({message:r});
    // }) .catch((e) =>{
    //     res.send({message:e})
    // })
})


router.delete("/:cid",async (req,res) =>{
    let {cid} = req.params;
    try{
        let result = await cartModel.updateOne(
            {cartId:+cid},
            {$set: {products:[]}}
        )
        res.send({result:"Success",payload:result})
    } catch (error) {
        res.send({result:"Error",error:error.message})

    }
})

router.delete("/:cid/products/:pid", async (req,res) =>{
    let {cid, pid} = req.params;
    console.log(cid,pid)
    try{
        
        let result = await cartModel.updateOne(
            {cartId:cid},
            {$pull:{products : {prodId: +pid}}}                
            )
        res.send({result:"succes",payload:result})
    } catch(error){
        console.log(error)

    }
    // let result = await cartModel.deleteOne({})
})

export default router;