import { Router } from "express";
import { foods } from "../../resources/foods.js";

const router = Router();

const user = {
    name:"Emiliano",
    last_name:"Dovichi",
    admin:true,
    foods
}

router.get("/",(req,res) => {
    res.render('index',user)
})

export default router