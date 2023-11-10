import { Router } from "express";
import {userModel} from '../models/user.model.js'
import { CompareHash } from "../utils.js";

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
router.post("/login",async (req,res) =>{
    const {email, pass} = req.body;
    console.log(email,pass);
    try{
        let exist = await userModel.findOne({email:email})
        if(!exist){
            return res.redirect("/signup")
        }
        console.log(CompareHash(pass,exist))
        if(!CompareHash(pass,exist)){
        // if(exist.pass !== pass){
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
    try{
        let result = req.session.destroy()
        res.redirect('/login')
    } catch (error){
        res.send({error:error.message})
    }
    
})


export default router;