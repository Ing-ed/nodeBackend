import { Router } from "express";
import ProdManager from "../dao/products.dao.js";
import CartManager from "../dao/carrito.dao.js";
import UserManager from "../dao/users.dao.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import passport from "passport";
// import { ProductManager } from "../views/Dao/Products.js";

/*
    Implementar con JWT un sistema por el cual se distinga usuario de admin
 */

const prodManager = new ProdManager()
const cartManager = new CartManager()
const userManager = new UserManager() 

const router = Router();
// const manager = new ProductManager("productos.json");
let prods = []
// manager.getProducts()
// .then((r) =>{
//     prods = r
// })


// router.get("/current",passport.authenticate('jwt',{session:false,failureRedirect:'kk'}),(req,res)=>{
//     console.log(req.user)
//     res.send(req.user)
// })
// router.get("/kk",(req,res)=>{
//     res.send("NOOO")
// })

router.get("/",(req,res) => {
    res.redirect('/login')
})

router.get("/realtimeproducts",(req,res) =>{
    res.render('realTimeProducts',{prods})
})
router.get("/chat",(req,res) =>{
    res.render('chat',{prods})
})
router.get("/productos/:uid",async (req,res) =>{
    //uid -> user ID
    let cart = await cartManager.getByUser(req.params);
    console.log("productos", cart)
    if(cart === null){
        cart = await cartManager.CreateCart(req.params);
    }
    console.log("cart",cart)
    let idCart = cart._id.toString()
    let user = await userManager.GetById(req.params);
    let {userName, rol} = user
    console.log(user.userName)  
    rol = rol === "admin" ? rol: ""
    let result = await prodManager.GetAll()
    console.log(result,"estos son todos los productos")
    res.render('productos',{result,idCart,userName,rol})
})

router.get("/cart/:cid", async (req,res) =>{
    let {cid} = req.params;
    let result = await cartManager.GetById(req.params);
    console.log("carrito",result)
    res.render('cart',{result,cid})
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
router.get("/restore/:message?",(req,res)=>{
    const {message} = req.params
    if(message){
        res.render('restorePass',{Message:"Algo salio mal"})
    } else{
        res.render('restorePass',{Message:"Recupera tu contraseña"})
    }
})

router.get("/current",jwtValidation,async (req,res) =>{
    let userInfo = req.user
    res.render("current",{userInfo})
})
export default router