import bcrypt from 'bcrypt'

class Hash{
    constructor(){}
    CreateHash(pass){
        pass = bcrypt.hashSync(pass,bcrypt.genSaltSync(10))
        return pass;
    }
    CompareHash(pass,user){
        return(bcrypt.compareSync(pass,user.pass))
    }
}
export default Hash