import { Router } from "express";

const router = Router();
router.get("/",(req,res) =>{
    console.log("cookie")
    res.cookie("1raCookie","prueba").send("Probando cookie")
})
router.get("/leer",(req,res) =>{
    console.log("Leyendo",req.cookies)
})

export default router;