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
export default router