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
                done(null,result)
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
            return done(null, false)
        }
        try{
            let exist = await userModel.findOne({email:email})
            if(!exist){
                done()
            }
            console.log(CompareHash(pass,exist))
            if(!CompareHash(pass,exist)){
            // if(exist.pass !== pass){
                return res.send("password incorrecto")
            }
            res.redirect(`/productos/${exist._id}`)
        }catch (error){
            res.send({result:"Error",error:error.message})
        }
    }
))

passport.serializeUser((user,done) =>{
    console.log(user,"usuario")
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