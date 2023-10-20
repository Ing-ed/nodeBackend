import { ProductManager } from "../Products.js";
import { Router } from "express";
import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.models.js";
const router = Router();

const manager = new ProductManager("productos.json","carrito.json");

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
        console.log("Error")
    }
    // console.log("body",req.body);
    // manager.addProductToCart(req.body)
    // .then((r) =>{
    //     res.send({message:r})
    // }) .catch((e) =>{
    //     res.send({error:e})
    // })
})

router.put("/:cid/product/:pid",(req,res)=>{
    const {cid,pid} = req.params
    console.log("params",cid,pid)
    manager.updateProductFromCart({cartId:+cid,prodId:+pid,quantity:req.body.quantity})
    .then((r) => {
        res.send({message:r});
    }) .catch((e) =>{
        res.send({message:e})
    })
})

router.get("/:cid",async (req,res) =>{
    const {cid} = req.params;
    try{
        let carts = await cartModel.find();
        let index = carts.findIndex((item) => item.id === cid)
        if(index <0 ){
            res.send({result:"error",cause:"item no encontrado"});
        } else{
            res.send({result:"sucess",payload:carts[index]})
        }
        console.log(carts)
    } catch (error){
        console.log(error)
    }
    // manager.getCartById({cartId:+cid})
    // .then((r) => {
    //     res.send({message:r})
    // }) .catch((e) => {
    //     res.send({message:e})
    // })
})

export default router;