// import { ProductManager } from "../views/Dao/Products.js";
import { Router } from "express";
import { Validar } from "../../resources/Validacion.js";
import { productModel } from "../models/products.models.js";
import prodManager from "../dao/products.dao.js";
import mongoosePaginate from 'mongoose-paginate-v2'
const router = Router();

// const manager = new ProductManager("productos.json");
const manager = new prodManager()
// get
router.get("/",async (req,res) =>{
    let {limit, page, sort, query} = req.query;
    // let {query} = req.query;
    let result = await manager.GetAll(req.query)
    res.send(result)
})

//getById
router.get("/:pid", async (req,res) => {
    let result = await manager.GetById(req.params)
    res.send(result)
})

//add
router.post("/",async (req,res) =>{
    let result = await manager.CreateProd(req.body)
    res.send(result);
})

//update
router.put("/:pid", async (req,res) =>{
    const {pid} = req.params
    const {field, value} = req.body
    let result = await manager.UpdateProd(pid,field,value)
    res.send(result)
})

//delete
router.delete("/:pid",async (req,res) =>{
    let result = await manager.DeleteProd(req.params)
    res.send(result)
})

export default router;