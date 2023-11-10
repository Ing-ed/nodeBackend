import {Router} from 'express';
import {userModel} from '../models/user.model.js'
import { CreateHash } from '../utils.js';
import passport from 'passport';
const router = Router();

router.get('/', async (req,res) =>{
    try {
        let users = await userModel.find();
        res.send({result:"success",payload:users})
    } catch (error) {
        //console.log("No se pudo encntrar ",error);
    }
})
// router.post("/signup", async (req,res) =>{
//     console.log(req.body)
//     let {user, email, pass} = req.body;
//     try{
//         let passHash = CreateHash(pass)
//         let result = await userModel.create({user:user,email:email,pass:passHash,rol:"user"})
//         res.redirect('/login')
//     } catch (error){
//         res.send({result:"Error",error:error.message})
//     }
// })


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