import { Router } from "express";
import {userModel} from '../models/user.model.js'
import { CompareHash, TokenGen } from "../utils.js";
import SessionManager from '../dao/sessions.dao.js'
import passport from "passport";

const sessionManager = new SessionManager()

const router = Router();
router.get("/",(req,res) =>{
    //console.log("cookie")
    res.cookie("cookie1","prueba").send("Probando cookie")
})

router.get("/leer",(req,res) =>{
    const {cookie1} = req.cookies
    const {cookie2} = req.signedCookies
    //console.log("Leyendo",req.cookies, req.signedCookies)
    res.json({cookie1:cookie1,cookie2:cookie2})
})
router.get("/signed",(req,res) =>{
    res.cookie("cookie2","firmada",{signed:true,maxAge:20000}).send("2da cookie enviada")
})
// registro con passport
// router.post("/signup/",passport.authenticate('register',{failureRedirect:'failReg',successRedirect:'/login', failureMessage:true}), async (req,res) =>{
//     console.log(req.body)
//     res.send({status:"success",message:"usuario registrado"})
// })
// router.get('/failReg', async (req,res) =>{
//     console.log("falla");
//     console.log(req.session.messages, typeof(req.session.messages))
//     res.redirect('/signup/error')
// })
// // login con passport
// router.post("/login/",passport.authenticate('login',{failureRedirect:'/sessions/failLog'}), async (req,res) =>{
//     console.log(req.user,"usuario")
//     return res.redirect(`/productos/${req.user._id}`)
// })
// router.get("/failLog",async (req,res) =>{
//     // console.log()
//     return res.redirect(`/login/error`)
// })



router.post("/signup", async (req,res) =>{
    let result = await sessionManager.SignUp(req.body)
    res.redirect(result === 0 ? '/login' : '/signup')
})

router.post("/login",async (req,res) =>{
    let result = await sessionManager.LogIn(req.body);
    if(result[0] === null){
        return res.redirect('/login/err')
    }
    const token = result[1]
    return res.cookie("auth",token).redirect(`/productos/${result[0]._id}`)
})

router.post("/restore", async (req,res) =>{
    console.log("restore")
    let result = await sessionManager.RestorePass(req.body)
    console.log(result)
    if(result > 0){
        return res.redirect('/restore/err')
    } else {
        return res.redirect('/login')
    }
})

router.get("/logout", async (req,res) =>{
    try{
        req.session.destroy()
        res.redirect('/login')
        console.log("logout")
    } catch (error){
        res.send({error:error.message})
    }
    
})



export default router;