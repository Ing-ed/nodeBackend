import { Router } from "express";

const router = Router();
router.get("/",(req,res) =>{
    console.log("cookie")
    res.cookie("cookie1","prueba").send("Probando cookie")
})
router.get("/leer",(req,res) =>{
    const {cookie1} = req.cookies
    const {cookie2} = req.signedCookies
    console.log("Leyendo",req.cookies, req.signedCookies)
    res.json({cookie1:cookie1,cookie2:cookie2})
})
router.get("/signed",(req,res) =>{
    res.cookie("cookie2","firmada",{signed:true,maxAge:20000}).send("2da cookie enviada")
})
router.post("/login",(req,res) =>{
    const {name, email} = req.body;
    req.session.name = name;
    req.session.email = email;
    res.send("Session iniciada");
})

export default router;