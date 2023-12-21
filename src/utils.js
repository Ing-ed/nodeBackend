import {fileURLToPath} from 'url'
import { dirname } from 'path'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

const SECRET = "mobyDick"
export function CreateHash(pass){
    pass = bcrypt.hashSync(pass,bcrypt.genSaltSync(10))
    return pass;
}
export function CompareHash(pass,user){
    return(bcrypt.compareSync(pass,user.pass))
}

//crear token
export function TokenGen(user){
    const token = jwt.sign(user,SECRET,{expiresIn:900})
    return token;
}