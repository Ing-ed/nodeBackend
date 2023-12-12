// import { ProductManager } from "../views/Dao/Products.js";
import { Router } from "express";
import { cartModel } from "../models/carts.model.js";
import CartManager from "../dao/carrito.dao.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { jwtAuthenticate } from "../middlewares/auth.middleware.js";
import passport from "passport";
const router = Router();

const cartManager = new CartManager()

router.get("/:cid?",async (req,res) =>{
    const {cid} = req.params;
    let result = await cartManager.GetById(cid)
    res.send(result)
})

router.post("/",async (req,res) =>{
    let {prodId,quantity} = req.body
    let result = await cartManager.CreateCart(req.body);
    res.send(result);
})
router.put("/:cid", async (req,res) =>{
    let result = await cartManager.UpdateCart(req.params.cid,req.body)
    // console.log(result,"result")
    res.send(result)
})
// router.put("/:cid",passport.authenticate("jwt",{session:false}),jwtAuthenticate, async (req,res) =>{
//     let result = await cartManager.UpdateCart(req.params.cid,req.body)
//     console.log(result,"result")
//     let {cid} = req.params
//     let {prodId,quantity} = req.body
//     //console.log("aca")
//     // console.log(req.body)
//     try{
//         let result = await cartModel.findOneAndUpdate(
//             {_id:cid,'products.product':prodId},
//             {$inc:{'products.$.quantity':+quantity}},
//             {new:true}
//         )
//         if(!result){
//             let result = await cartModel.updateOne(
//             {_id:cid},
//             {$push:{products:{product:prodId.toString(),quantity:quantity}}}
//         )}
//         console.log(result, "result")
//         res.send({result:"Success",payload:result})
//     } catch (error) {
//         //console.log("error",error.message)
//         if(error.message.includes('expired')){
//             res.send("tiempo expirado")
//             console.log("expired")
//         }
//         else
//             res.send({result:"error",error:error.message});
//     }
// })

router.put("/:cid/product/:pid",async (req,res)=>{
    let result = await cartManager.UpdateOne(req.params);
    res.send(result);
    // const {cid,pid} = req.params
    // //console.log("params",cid,pid)
    // try{
    //     let carts = await cartModel.find()
    //     let cartIndex = carts.findIndex((item) => item.cartId === +cid)
    //     //console.log(carts[cartIndex]);
    //     let prodIndex = carts[cartIndex].products.findIndex((item) => item.prodId === +pid);
    //     let prod = []
    //     if(prodIndex >= 0){
    //         prod = {prodId:+pid,quantity:+carts[cartIndex].products[prodIndex].quantity + +req.body.quantity}; //es el producto a actualizar
    //     } else {
    //         prod = carts[cartIndex].products
    //         prod.push({prodId:+pid,quantity:+req.body.quantity})
    //     }
    //     //console.log(prod)
    //     let result = await cartModel.updateOne({_id:carts[cartIndex]._id},{products:prod})
    //     res.send({result:"sucess",payload:result})
    //     // //console.log(result)
    // } catch (error){
    //     //console.log("error",error)
    // }

    // manager.updateProductFromCart({cartId:+cid,prodId:+pid,quantity:req.body.quantity})
    // .then((r) => {
    //     res.send({message:r});
    // }) .catch((e) =>{
    //     res.send({message:e})
    // })
})


router.delete("/:cid",async (req,res) =>{
    console.log(req.params)
    let {cid} = req.params;
    let result = await cartManager.CleanCart(cid)
    console.log(result.acknowledged)
    if(result.acknowledged){
        console.log(result)
        return res.redirect(`/cart/${cid}`)
    }
})

router.delete("/:cid/products/:pid", async (req,res) =>{
    let result = await cartManager.CleanProdFromCart(req.params);
    console.log("resultado",result)
    res.send(result.payload? result.payload.acknowledged : result.error);
})

export default router;