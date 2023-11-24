import { Router } from "express";
import { foods } from "../../resources/foods.js";
import { productModel } from "../models/products.models.js";
import { cartModel } from "../models/carts.model.js";
import { userModel } from "../models/user.model.js";
import passport from "passport";
// import { ProductManager } from "../views/Dao/Products.js";

const router = Router();
// const manager = new ProductManager("productos.json");
let prods = []
// manager.getProducts()
// .then((r) =>{
//     prods = r
// })


router.get("/current",passport.authenticate('jwt',{session:false,failureRedirect:'kk'}),(req,res)=>{
    res.send(req.user)
})
router.get("/kk",(req,res)=>{
    res.send("NOOO")
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
        let {userName, rol} = username
        console.log(username.userName)  
        rol = rol === "true" ? "admin": ""
        let idCart = cart._id.toString()
        let result = await productModel.find().lean()
        //console.log(cart)
        res.render('productos',{result,idCart,userName, rol})
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

router.get("/login/:message?",(req,res) => {
    const {message} = req.params
    if(message)
        res.render('login',{Message:"Algo salio mal"})
    else
        res.render('login',{Message:"Inicio de sesion"})
})

router.get("/signup/:message?",(req,res) =>{
    const {message} = req.params
    let msg = ""
    if(message){
        msg = "algo salio mal, reintente"
    }
    res.render('signup',{msg:msg})
})
router.get("/restore",(req,res)=>{
    res.render('restorePass')
})

export default router