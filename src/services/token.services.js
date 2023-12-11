import jwt from 'jsonwebtoken'

//por defecto secret es mobyDick
class TokenManager{
    constructor(secret = "mobyDick"){
        this.SECRET = secret
        // console.log(this.SECRET)
    }
    CreateToken(user){
        const token = jwt.sign(user,this.SECRET,{expiresIn:300})
        return token;
    }
} export default TokenManager