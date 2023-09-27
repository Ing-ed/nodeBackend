import { ProductManager } from "../Products.js";
import { Router } from "express";
import { Validar } from "../../resources/Validacion.js";
const router = Router();

const manager = new ProductManager("productos.json");
// get
router.get("/",(req,res) =>{
    //console.log("aca")
    const limit = req.query.limit;
    let arr = []
    manager.getProducts().then((r) =>{
        if(limit){
            //console.log("limit", limit);
            res.json(r.slice(0,+limit))
        } else{
            res.send(r)
        }
    })
    .catch((e) => {
        res.send("ERROR")
    })
})

//getById
router.get("/:pid",(req,res) => {
    manager.getProductById({prodId:+req.params.pid}).then((r) =>{
             res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
    //console.log(req)
})

//add
router.post("/",(req,res) =>{
    if(!Validar(req.body,"addProduct")){
        res.send({message:"Faltan campos"})
    } else{
        manager.addProduct(req.body)
        .then((r) =>{
            res.send({message:r})
        }) .catch((e) =>{
            res.send({error:e})
        })
    }
})

//update
router.put("/",(req,res) =>{
    manager.updateProduct(req.body)
    .then((r) => {
        res.send({message:r})
    }) .catch((e) => {
        res.send({message:e})
    })
})

//delete
router.delete("/",(req,res) =>{
    manager.deleteProduct(req.body)
    .then((r) => {
        res.send({message:r})
    }) .catch((e) =>{
        res.send({message:e})
    })
})

export default router;