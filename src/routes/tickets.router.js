import { Router } from "express";
import TicketManger from "../dao/ticket.dao.js";
import CartManager from "../dao/carrito.dao.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
const router = Router()
const ticketManger = new TicketManger()
const cartManager = new CartManager()

// corregir/verificar la creacion del ticket, vaciar carrito, y finalizacion del proceso de compra

router.post("/:cid",jwtValidation, async (req,res) =>{
    let numberPurchase = await ticketManger.Count()
    console.log(numberPurchase, "cuenta")
    console.log(req.params)
    let {email} = req.user
    console.log(email)
    let {dateTime, amount} = req.body
    let prods = await cartManager.GetById(req.params)
    let products = []
    prods.payload.products.map((item)=>{
        products.push({product:item.product._id,quantity:item.quantity})
        // console.log("item", item)
    })
    let body = {...req.body,code:numberPurchase,email:email,producst:products}
    console.log(body)
    let result = await ticketManger.CreateTicket(body);
})
export default router;