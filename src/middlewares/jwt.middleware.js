import jwt from 'jsonwebtoken'
const SECRET = "mobyDick"

export function jwtValidation(req,res,next){
    try {
        // const auth = req.get('Authorization');
        const token = req.cookies['auth']
        // const token = auth.split(" ")[1]
        const userToken = jwt.verify(token,SECRET)
        // console.log(userToken, "token")
        req.user = userToken;
        next();
    } catch (error) {
        res.json({error:error.message})
        console.log(error.message)
    }
}