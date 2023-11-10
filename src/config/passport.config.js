import passport from "passport";
import local from 'passport-local'
import {userModel} from '../models/user.model.js'
import { CreateHash, CompareHash } from "../utils.js";

const localStrategy = local.Strategy
function InitializePassport(){
    passport.use('register',new localStrategy({passReqToCallback:true, usernameField:'email'},async (req,username,pass,done)=>{
        const {user,email} = req.body;
        try{
            let user = await userModel.findOne({email:username});
            console.log(user)
        } catch (error){
            console.log(error.message)
        }
    }))
}
export default InitializePassport