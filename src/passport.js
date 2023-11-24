import passport from "passport";
import jwt, { ExtractJwt } from 'passport-jwt'
import {Strategy as GitHubStrategy} from 'passport-github2'
import { Strategy as localStrategy } from "passport-local";
import { userModel } from "./models/user.model.js";
import { CreateHash,CompareHash } from "./utils.js";


const JWTStrategy = jwt.Strategy;
// console.log(process.env)
passport.use('jwt',new JWTStrategy({
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:'mobyDick'
}, async (jwt_payload,done)=>{
    try {
        return done(null,jwt_payload)
    } catch (error) {
        return done(error)
    }
}
))

function cookieExtractor(req){
    let token = null;
    if(req && req.cookies){
        token = req.cookies['authCookie']
    }
    return token
}

passport.use("register",new localStrategy(
    {passReqToCallback:true, usernameField:'email',passwordField:'pass'},
    async function(req,username,password,done){
        console.log(req.body.email)
        try{
            console.log(username,password)
            let user = await userModel.findOne({email:username})
            if(user !== null){
                return done(null,false,{message:"exist"})
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

passport.use("github",new GitHubStrategy({
    clientID:"Iv1.049bf7e511dc969b",
    clientSecret:"459395e41e0c3035adf41777aa12975546a9c002",
    callbackURL:"http://localhost:8080/sessions/gitCallback",
    scope:['user:email']
}, async (accessToken,refreshToken,profile,done)=>{
    console.log(profile._json.email)
    try {
        const user = await userModel.findOne({email:profile._json.email})
        if(user){
            if(user.isThird){
                return done(null,user)
            } else {
                return done(null,false)
            }
        } else {
            let userInfo ={
                firstName:profile._json.name.split(' ')[0],
                lastName:profile._json.name.split(' ')[1],
                userName:profile._json.login,
                email:profile._json.email,
                pass:" ",
                isThird:true,
            }
            console.log(userInfo)
            let result = await userModel.create(userInfo)
            return done(null,result)
        }
    } catch (error) {
        done(error)
    }
    done(null,false)
}))
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