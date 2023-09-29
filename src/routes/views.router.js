import { Router } from "express";
import { foods } from "../../resources/foods.js";
import { ProductManager } from "../Products.js";

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
// router.put("/updateProd")

export default router