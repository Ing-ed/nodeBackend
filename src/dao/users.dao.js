import { userModel } from "../models/user.model.js";

class UserManager {
    constructor(){}
    async GetById(params){
        let {uid} = params
        try{
            let result = await userModel.findOne({_id:uid}) //se supone que el usuario ya existe sino no se puede mostrar esta pagina
            return (result);
        }catch(error){
            return (null)
        }
    }
} export default UserManager