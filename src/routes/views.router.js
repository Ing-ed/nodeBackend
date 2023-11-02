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
        let cartId = await cartModel.count()
        let cart = await cartModel.create({
            cartId:cartId +1
        })
        let idCart = cart._id.toString()
        let result = await productModel.find().lean()
        console.log(cart)
        res.render('productos',{result,idCart})
    } catch (error){
        res.send({result:"error",error:error.message})
    }
})

router.get("/cart/:cid", async (req,res) =>{
    let {cid} = req.params;
    try{
        let result = await cartModel.findOne({_id:cid}).populate('products.product').lean()
        result = [result]
        console.log("result",JSON.stringify(result,null,'\t'))
        // console.log(result[0].products)
        res.render('cart',{result : result})
    } catch (error) {
        res.send({result:"error",error:error.message})
    }
})

// router.put("/updateProd")

export default router