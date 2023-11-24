// import { ProductManager } from "../views/Dao/Products.js";
import { Router } from "express";
import { Validar } from "../../resources/Validacion.js";
import { productModel } from "../models/products.models.js";
import mongoosePaginate from 'mongoose-paginate-v2'
const router = Router();

// const manager = new ProductManager("productos.json");

// get
router.get("/",async (req,res) =>{
    let {limit, page, sort, query} = req.query;
    // let {query} = req.query;
    
    //console.log(query, sort)

    try{
        let search = query !== undefined ?{category:query} :{} 
        let orden = sort !== undefined ? {price:sort} : {}
        let pagina = page !== undefined ? page : 1
        let products = await productModel.paginate(search,{limit:+limit>0? +limit : 10,page:page>0?page:1,sort:orden});
        let result =
        {
            status:"success",
            payload:products.docs,
            totalPages:products.totalPages,
            prevPage:products.hasPrevPage ? products.prevPages : null,
            nextPage:products.hasNextPage ? products.nextPage : null,
            page:products.page,
            hasPrevPage:products.hasPrevPage,            
            hasNextPage:products.hasNextPage,
            prevLink:products.hasPrevPage ? `http://localhost:8080/api/products/${limit}/${products.prevPage}/${query}/${sort}`:null,
            nextLink:products.hasNextPage ? `http://localhost:8080/api/products/${limit}/${products.nextPage}/${query}/${sort}`:null,

        }
        res.send(result)
    } catch (error){
        res.send({result:"error",error:error})
    }

    // ////console.log("aca")
    // const limit = req.query.limit;
    // let arr = []
    // manager.getProducts().then((r) =>{
    //     if(limit){
    //         ////console.log("limit", limit);
    //         res.json(r.slice(0,+limit))
    //     } else{
    //         res.send(r)
    //     }
    // })
    // .catch((e) => {
    //     res.send("ERROR")
    // })
})

//getById
router.get("/:pid", async (req,res) => {
    const {pid} = req.params;
    try{

        let product = await productModel.findOne({code:pid})
        if(product === null){res.send({result:"error",error:"Producto no encontrado"})}
        // //console.log(product)
        res.send({result:"success",payload:product})
    } catch (error) {
        res.send({result:"error",error:error})
    }
    // manager.getProductById({prodId:+req.params.pid}).then((r) =>{
    //          res.send(r)
    //     })
    //     .catch((e) => {
    //         res.send(e)
    //     })
    // ////console.log(req)
})

//add
router.post("/",async (req,res) =>{
    try{
        let result = await productModel.create(req.body)
        res.send({result:"success",payload:result})
    } catch(error) {
        res.send({result:"Error", error: error})
    }

    // if(!Validar(req.body,"addProduct")){
    //     res.send({message:"Faltan campos"})
    // } else{
    //     //console.log("paso validacion")
    //     manager.addProduct(req.body)
    //     .then((r) =>{
    //         res.send({message:r})
    //     }) .catch((e) =>{
    //         res.send({error:e})
    //     })
    // }
})

//update
router.put("/:pid", async (req,res) =>{
    const {pid} = req.params
    const {field, value} = req.body
    //console.log(pid)
    try{
        let products = await productModel.find();
        let index = products.findIndex((p) => p.code === pid);
        if(index <0 ){res.send({result:"error",error:"el producto no existe"})}
        products[index][field] = value;
        let actualizacion = {$set:{}}
        actualizacion.$set[field] = value
        let result = await productModel.updateOne({_id:products[index]._id},actualizacion)
        res.send({result:"success",payload:result})
    } catch (error) {
        res.send({result:"error",error:error})
    }

    manager.updateProduct({...req.body,prodId:+pid})
    // .then((r) => {
    //     res.send({message:r})
    // }) .catch((e) => {
    //     res.send({message:e})
    // })
})

//delete
router.delete("/:pid",async (req,res) =>{
    const {pid} = req.params
    try{
        let result = await productModel.deleteOne({code:pid})
        res.send({result:"success",payload:result})
    } catch(error){
        res.send({result:"error",error:error})
    }
    
    // manager.deleteProduct({prodId:+pid})
    // .then((r) => {
    //     res.send({message:r})
    // }) .catch((e) =>{
    //     res.send({message:e})
    // })
})

export default router;