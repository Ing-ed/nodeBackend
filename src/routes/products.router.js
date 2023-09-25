import { ProductManager } from "../Products.js";
import { Router } from "express";
const router = Router();

const manager = new ProductManager();
router.get("/",(req,res) =>{
    console.log("aca")
    const limit = req.query.limit;
    let arr = []
    manager.getProducts().then((r) =>{
        if(limit){
            console.log("limit", limit);
            res.json(r.slice(0,+limit))
        } else{
            res.send(r)
        }
    })
    .catch((e) => {
        res.send("ERROR")
    })
})

router.get("/:pid",(req,res) => {
    manager.getProductById(+req.params.pid).then((r) =>{
             res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
    console.log(req)
})

router.post("/",(req,res) =>{
    console.log("body",req.body);
    manager.addProduct(req.body)
    .then((r) =>{
        res.send({message:r})
    }) .catch((e) =>{
        res.send({error:e})
    })
    // res.send(req.body)
})

export default router;