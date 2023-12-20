import { userModel } from "../models/user.model.js";
import Hash from "../services/password.services.js";
import TokenManager from "../services/token.services.js";

const hashManager = new Hash()
const tokenManager = new TokenManager()

class SessionManager {
    constructor(){

    }
    async SignUp(body){
        console.log(body)
        try{
            let passHash = hashManager.CreateHash(body.pass);
            let result = await userModel.create({...body,pass:passHash});
            return(0);
        } catch (error){
            return(1);
        }
    }
    async LogIn(body){
        try{
            let exist = await userModel.findOne({email:body.email})
            if(!exist){
                return res.redirect("/signup")
            }
            console.log(exist._id)
            // console.log(CompareHash(pass,exist))
            if(!hashManager.CompareHash(body.pass,exist)){
                return([null])
            }
            const {firstName, lastName,email,rol} = exist
            const token = tokenManager.CreateToken({firstName,lastName,email,rol})
            // console.log(token,"token")
            return([exist,token])
        }catch (error){
            return([null])
        }
    }
    async RestorePass(body){
        let { email, pass, confirm} = body
        console.log("acaestoy", body)
        try{
            if(pass !== confirm){
                res.send("Las contraseñas no coinciden")
            }
            let result = await userModel.updateOne({email:email},{pass:hashManager.CreateHash(pass)})
            return(0)
        } catch (error) {
            console.log(error.message)
            return(1)
        }
    }
} export default SessionManager