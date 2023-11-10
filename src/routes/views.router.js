import { Router } from "express";
import { foods } from "../../resources/foods.js";
import { productModel } from "../models/products.models.js";
import { cartModel } from "../models/carts.model.js";
import { userModel } from "../models/user.model.js";
// import { ProductManager } from "../views/Dao/Products.js";

const router = Router();
// const manager = new ProductManager("productos.json");
let prods = []
// manager.getProducts()
// .then((r) =>{
//     prods = r
// })



router.get("/",(req,res) => {
    res.render('home',{prods})
})

router.get("/realtimeproducts",(req,res) =>{
    res.render('realTimeProducts',{prods})
})
router.get("/chat",(req,res) =>{
    res.render('chat',{prods})
})
router.get("/productos/:uid",async (req,res) =>{
    //uid -> user ID
    let { uid } = req.params;
    try{
        let cart = await cartModel.findOne({user:uid})
        if(!cart){
            let cartId = await cartModel.count()
            cart = await cartModel.create({
                cartId:cartId +1,
                user:uid
            })
        }
        let username = await userModel.findOne({_id:uid}) //se supone que el usuario ya existe sino no se puede mostrar esta pagina
        let {user, rol} = username
        let idCart = cart._id.toString()
        let result = await productModel.find().lean()
        //console.log(cart)
        res.render('productos',{result,idCart,user,rol})
    } catch (error){
        res.send({result:"error",error:error.message})
    }
})

router.get("/cart/:cid", async (req,res) =>{
    let {cid} = req.params;
    try{
        let result = await cartModel.findOne({_id:cid}).populate('products.product').lean()
        result = [result]
        //console.log("result",JSON.stringify(result,null,'\t'))
        // //console.log(result[0].products)
        res.render('cart',{result,cid})
    } catch (error) {
        res.send({result:"error",error:error.message})
    }
})

router.get("/login",(req,res) => {
    res.render('login')
})

router.get("/signup",(req,res) =>{
    res.render('signup')
})
router.get("/restore",(req,res)=>{
    res.render('restorePass')
})

export default router