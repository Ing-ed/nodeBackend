import { Router } from "express";
import { messageModel } from "../models/messages.models.js";

const router = Router();

router.post("/", async (req,res) =>{
    //console.log(req.body);
    try{
        let result = await messageModel.create(req.body)
        res.send({result:"suceess",payload:"OK"})
    } catch (error){
        res.send({result:"error",error:"error"})
    }
})
export default router