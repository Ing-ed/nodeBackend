export function jwtAuthenticate(req,res,next){ 
    const { email } = req.user;
    console.log("email",req.user,email)
    console.log(email)
    if(email === "emidovichi@gmail.com"){
        next()
    } else {
        res.send("No autorizado")
    }
}