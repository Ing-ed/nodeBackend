import passport from "passport";
import local from 'passport-local'
import {userModel} from '../models/user.model.js'
import { CreateHash, CompareHash } from "../utils.js";

const localStrategy = local.Strategy
const InitializePassport = ()=>{


passport.use('register',new localStrategy(
    {passReqToCallback:true,usernameField:'email'},
    async (user,email,pass,done) =>{
        console.log("ggggg")
    }
))}
// function InitializePassport(){
//     passport.use('register',
//     new localStrategy({passReqToCallback:true, usernameField:'email'},async (req,username,pass,done)=>{
//         const {user,email} = req.body;
//         console.log("registro")
//         try{
//             let user = await userModel.findOne({email:username});
//             console.log(user)
//             return(done,user)
//         } catch (error){
//             console.log(error.message)
//         }
//     }))
// }
export default InitializePassport