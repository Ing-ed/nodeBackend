// import { ProductManager } from "../views/Dao/Products.js";
import { Router } from "express";
import { cartModel } from "../models/carts.model.js";
import CartManager from "../dao/carrito.dao.js";
import ProdManager from '../dao/products.dao.js'
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import passport from "passport";
const router = Router();

const cartManager = new CartManager()
const prodManager = new ProdManager()

router.get("/:cid?",async (req,res) =>{
    const {cid} = req.params;
    let result = await cartManager.GetById(cid)
    res.send(result)
})

router.post("/",async (req,res) =>{
    let {prodId,quantity} = req.body
    let result = await cartManager.CreateCart(req.body);
    res.send(result);
})
router.put("/:cid",jwtValidation, async (req,res) =>{
    let result = await cartManager.UpdateCart(req.params.cid,req.body)
    res.send(result)
})

router.put("/:cid/product/:pid",async (req,res)=>{
    let result = await cartManager.UpdateOne(req.params);
    res.send(result);
})


router.delete("/:cid",async (req,res) =>{
    console.log(req.params)
    let {cid} = req.params;
    let result = await cartManager.CleanCart(cid)
    console.log(result.acknowledged)
    if(result.acknowledged){
        console.log(result)
        return res.redirect(`/cart/${cid}`)
    }
})

router.delete("/:cid/products/:pid", async (req,res) =>{
    let result = await cartManager.CleanProdFromCart(req.params);
    console.log("resultado",result)
    res.send(result.payload? result.payload.acknowledged : result.error);
})

//finalizacion de compra
router.get("/:cid/purchase", async (req,res)=>{
    console.log(req.params)
    // let {cid} = 
    let cart = await cartManager.GetById(req.params);
    console.log(cart,"cart")
    let prods = cart.result.products
    console.log(prods)
    let aux = prods
    let amount = 0;
    let prodsSuma = prods.filter((item) => item.quantity <= item.product.stock) //filtro los productos que cuentan
    let prodsQueda = prods.filter((item) => item.quantity > item.product.stock) //filtro los que la cantidad excede
    console.log(prods)
    prodsSuma.map((item,index) => {
        amount += +item.product.price * +item.quantity // hago la cuenta
        prodManager.UpdateProd(item.product.prodId,"stock",`-${item.quantity}`) //actualizo el stock
    })
    let result = await cartManager.UpdateProds(req.params,prods) // actualizo el carrito
    console.log(amount, "monto")
})
export default router;