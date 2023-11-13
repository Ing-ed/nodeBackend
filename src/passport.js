import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { userModel } from "./models/user.model.js";
import { CreateHash,CompareHash } from "./utils.js";

passport.use("register",new localStrategy(
    {passReqToCallback:true, usernameField:'email',passwordField:'pass'},
    async function(req,username,password,done){
        console.log(req.body.email)
        try{
            console.log(username,password)
            let user = await userModel.findOne({email:username})
            if(user !== null){
                return done(null,false)
            } else {
                let result = await userModel.create({user:req.body.user,email:username,pass:CreateHash(password)})
                return done(null,result)
            }
            console.log(user);
            // done(null,"user")
        } catch(error){
            console.log(error)
            done(error);
        }
    }
));

passport.use("login",new localStrategy(
    {passReqToCallback:true,usernameField:'email',passwordField:'pass'},
    async function(req,username,password,done){
        const {email, pass} = req.body;
        if(!email || !pass){
            return done(null,false)
        }
        try{
            let exist = await userModel.findOne({email:email})
            if(!exist){
                return done(null,false,"usuario no encontrado")
            }
            if(!CompareHash(pass,exist)){
                return done(null,false,"password incorrecto")
            }
            console.log(exist._id)
            done(null,exist)
        }catch (error){
            done(error)
        }
    }
))

passport.serializeUser((user,done) =>{
    // console.log(user,"usuario")
    done(null,user._id)
})

passport.deserializeUser((async (id,done) =>{
    try{
        let user = await userModel.findById(id)
        done(null,user)
    } catch(error){
        done(error)
    }
}))