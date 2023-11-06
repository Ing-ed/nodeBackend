import {Router} from 'express';
import {userModel} from '../models/user.model.js'

const router = Router();

router.get('/', async (req,res) =>{
    try {
        let users = await userModel.find();
        res.send({result:"success",payload:users})
    } catch (error) {
        console.log("No se pudo encntrar ",error);
    }
})
router.post("/signup", async (req,res) =>{
    let {user, email, pass} = req.body;
    
    try{
        let result = await userModel.create({user:user,email:email,pass:pass})
        res.send({result:"Success",payload:result})
    } catch (error){
        res.send({result:"Error",error:error.message})
    }
})
export default router