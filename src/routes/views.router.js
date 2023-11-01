import { Router } from "express";
import { foods } from "../../resources/foods.js";
import { productModel } from "../models/products.models.js";
import { cartModel } from "../models/carts.model.js";
import { ProductManager } from "../views/Dao/Products.js";

const router = Router();
const manager = new ProductManager("productos.json");
let prods = []
manager.getProducts()
.then((r) =>{
    prods = r
})



router.get("/",(req,res) => {
    res.render('home',{prods})
})

router.get("/realtimeproducts",(req,res) =>{
    res.render('realTimeProducts',{prods})
})
router.get("/chat",(req,res) =>{
    res.render('chat',{prods})
})
router.get("/productos",async (req,res) =>{
    try{
        let result = await productModel.find().lean()
        console.log(result)
        res.render('productos',{result})
    } catch (error){
        res.send({result:"error",error:error.message})
    }
})

router.get("/cart/:cid", async (req,res) =>{
    let {cid} = req.params;
    try{
        let result = await cartModel.find().lean()
        console.log("result",result)
        res.render('cart',{result})
    } catch (error) {
        res.send({result:"error",error:error.message})
    }
})

// router.put("/updateProd")

export default router