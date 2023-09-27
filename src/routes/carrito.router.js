import { ProductManager } from "../Products.js";
import { Router } from "express";
const router = Router();

const manager = new ProductManager("productos.json","carrito.json");

router.post("/",(req,res) =>{
    console.log("body",req.body);
    manager.addProductToCart(req.body)
    .then((r) =>{
        res.send({message:r})
    }) .catch((e) =>{
        res.send({error:e})
    })
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

router.get("/:cid",(req,res) =>{
    const {cid} = req.params;
    manager.getCartById({cartId:+cid})
    .then((r) => {
        res.send({message:r})
    }) .catch((e) => {
        res.send({message:e})
    })
})

export default router;