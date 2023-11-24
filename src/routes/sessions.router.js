import { Router } from "express";
import {userModel} from '../models/user.model.js'
import { CompareHash } from "../utils.js";
import passport from "passport";

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
//registro con passport
router.post("/signup/",passport.authenticate('register',{failureRedirect:'failReg',successRedirect:'/login', failureMessage:true}), async (req,res) =>{
    console.log(req.body)
    res.send({status:"success",message:"usuario registrado"})
})
router.get('/failReg', async (req,res) =>{
    console.log("falla");
    console.log(req.session.messages, typeof(req.session.messages))
    res.redirect('/signup/error')
})
//login con passport
// router.post("/login/",passport.authenticate('login',{failureRedirect:'/sessions/failLog'}), async (req,res) =>{
//     console.log(req.user,"usuario")
//     return res.redirect(`/productos/${req.user._id}`)
// })

router.get("/failLog",async (req,res) =>{
    // console.log()
    return res.redirect(`/login/error`)
})

router.post("/login",async (req,res) =>{
    const {email, pass} = req.body;
    console.log(email,pass);
    try{
        let exist = await userModel.findOne({email:email})
        if(!exist){
            return res.redirect("/signup")
        }
        console.log(exist._id)
        console.log(CompareHash(pass,exist))
        if(!CompareHash(pass,exist)){
            return res.send("password incorrecto")
        }
        res.redirect(`/productos/${exist._id}`)
    }catch (error){
        res.send({result:"Error",error:error.message})
    }
    // req.session.user = user;
    // req.session.pass = pass;
    // res.send("Session iniciada");
})
router.get("/logout", async (req,res) =>{
    // console.log(req)
    try{
        req.session.destroy()
        res.redirect('/login')
        console.log("logout")
    } catch (error){
        res.send({error:error.message})
    }
    
})
//signup github
router.get("/autGithub",passport.authenticate('github',{failureRedirect:'/failGitHub',scope:["user:email"]}))

router.get("/gitCallback",passport.authenticate('github'),(req,res)=>{
    console.log(req.user)
    return res.cookie('pruebaToken').redirect(`/productos/${req.user._id}`)
})
router.get("/failGitHub",(req,res) =>{
    res.send("Error")
})


export default router;