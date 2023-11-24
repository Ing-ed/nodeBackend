export function auth(req,res,next){ 
    const { user } = req;
    console.log(user)
    if(user.email === "emidovichi@gmail.com"){
        next()
    } else {
        res.send("No autorizado")
    }
}