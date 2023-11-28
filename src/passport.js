import passport from "passport";
import jwt, { ExtractJwt } from 'passport-jwt'
import {Strategy as GitHubStrategy} from 'passport-github2'
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTStrategy } from "passport-jwt";
import { userModel } from "./models/user.model.js";
import { CreateHash,CompareHash } from "./utils.js";


passport.use("jwt", new JWTStrategy({
    secretOrKey:"mobyDick",
    jwtFromRequest: cookieExtractor
}, 
async function (jwt_payload,done){
    console.log("payload",jwt_payload);
    return done(null,jwt_payload);
}))

function cookieExtractor(req){
    // console.log("extract",req,"coockies",req.cookies)
    let token = null;
    if(req && req.cookies){
        token = req.cookies['auth']
        // console.log(token)
    }
    return token
}

passport.use("register",new localStrategy(
    {passReqToCallback:true, usernameField:'email',passwordField:'pass'},
    async function(req,username,password,done){
        console.log({...req.body,pass:CreateHash(password),username:username})
        try{
            console.log(username,password)
            let user = await userModel.findOne({email:username})
            if(user !== null){
                return done(null,false,{message:"exist"})
            } else {
                let result = await userModel.create({...req.body,pass:CreateHash(password)})
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
    callbackURL:"http://localhost:8080/api/sessions/gitCallback",
    scope:['user:email']
}, async (accessToken,refreshToken,profile,done)=>{
    console.log(profile._json.email)
    try {
        const user = await userModel.findOne({email:profile._json.email})
        if(user){
            if(user.isThird){
                return done(null,user)
            } else {
                user.isThird = true
                return done(null,user)
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


passport.use("current", new JWTStrategy({
    secretOrKey:"mobyDick",
    jwtFromRequest: cookieExtractor
}, 
async function (jwt_payload,done){
    console.log("payload",jwt_payload);
    return done(null,jwt_payload);
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