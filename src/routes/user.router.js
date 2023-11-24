import {Router} from 'express';
import {userModel} from '../models/user.model.js'
import { CreateHash } from '../utils.js';
import { jwtValidation } from '../middlewares/jwt.middleware.js';
import passport from 'passport';
import { auth } from '../middlewares/auth.middleware.js';
const router = Router();

router.get('/:uid',jwtValidation,auth, async(req,res) =>{
    const {uid} = req.params;
    // console.log(req.user)
    res.json({estado:"aca"})
    // try {
    //     const user = userModel.findById(uid);
    //     res.json({message:"usuario",user})
    // } catch (error) {
    //     res.json({error:error.message})        
    // }
})

router.get('/', async (req,res) =>{
    try {
        let users = await userModel.find();
        res.send({result:"success",payload:users})
    } catch (error) {
        //console.log("No se pudo encntrar ",error);
    }
})

router.post("/restore", async (req,res) =>{
    let { email, pass, confirm} = req.body
    console.log("aca")
    try{
        if(pass !== confirm){
            res.send("Las contraseñas no coinciden")
        }
        let result = await userModel.updateOne({email:email},{pass:CreateHash(pass)})
        res.redirect("/login")
    } catch (error) {
        res.send({result:"Error",error:error.message})
    }
})
export default router