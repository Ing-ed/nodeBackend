import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
// import fs from 'fs'
// const ruta = dirname(import.meta.url);

export class ProductManager{    
    
    #prodId = 0
    #cartId = 0
    // #path = "./Productos.txt"
    constructor(prodFile,cartFile =""){
        this.filePath = prodFile
        this.cartPath = cartFile;
        console.log(this.filePath,this.cartPath)
        this.products = []
    }
    addProduct({title,description,code,price,status,stock,category,thumbnails}){
        if(!fs.existsSync(this.filePath)){
            let arr = []
            arr.push({
                prodId:this.#prodId,
                title:title,
                description:description,
                code:code,
                price:price,
                status:status,
                stock:stock,
                category:category,
                thumbnails:thumbnails
            })
            console.log("arr",arr)
            return(fs.promises.writeFile(this.filePath,JSON.stringify(arr))
            .then((r) => {return("agregado con exito")})
            .catch((e) => {return("error al guardar")})
            )
        }
        return(fs.promises.readFile(this.filePath)
        .then((r) => {
            let arr = JSON.parse(r)
            this.#prodId = arr[arr.length -1].prodId
            this.#prodId++
            let index = arr.findIndex((item) => item.code === code)
            console.log("index",index,"codeR",code)
            if(index >= 0) {return("producto existente")}
            arr.push({
                prodId:this.#prodId,
                title:title,
                description:description,
                code:code,
                price:price,
                status:status,
                stock:stock,
                category:category,
                thumbnails:thumbnails
            })
            //console.log(arr,"array")
            this.#prodId++
            fs.promises.writeFile(this.filePath,JSON.stringify(arr))
            .then((r) => {return("Agregado con exito")})
            .catch((e) => {return("Erroral guardar")})
        })
        .catch((e) => {
            // //console.log(e, "error")
            return(e)
        }))
    }
    updateProduct({prodId,field,value}){
        console.log("update")
        return(fs.promises.readFile(this.filePath)
            .then((r) => {
                let arr = JSON.parse(r)
                let index = arr.findIndex((item) => item.id === prodId)
                if(index <0) {return ("Producto inexistente")}
                arr[index][field] = value
                console.log("update", arr)
                fs.promises.writeFile(this.filePath,JSON.stringify(arr))
                .then((r) => {return("Actualizado con exito")})
                .catch((e) => {return(e)})
            })
            .catch((e) => {return(e)})
        )
    }
    deleteProduct({prodId}){
        return(fs.promises.readFile(this.filePath)
        .then((r) => {
            let arr = JSON.parse(r)
            let index = arr.findIndex((item) => item.id === prodId)
            if(index <0) {return (1)}
            arr.splice(index,1)
            fs.promises.writeFile(this.filePath,JSON.stringify(arr))
            .then((r) => {return("Producto eliminado")})
            .catch((e) => {return(e)})
        })
        .catch((e) => {return(e)})       
        )
    }

    getProducts(){
        // if(fs.existsSync(this.filePath)){
            // //console.log("aca")
        return(fs.promises.readFile(this.filePath)
        .then((r) =>{
            // //console.log("ahora aca",r)
            let prods = JSON.parse(r)
            return(prods)
        })
        .catch((e) =>{
            return([])
        }))
        // }
    }
    getProductById(prodId){
        return(fs.promises.readFile(this.filePath)
        .then((r) =>{
            //console.log(prodId)
            let arr = JSON.parse(r)
            let index = arr.findIndex((item) => item.id === prodId)
            if(index <0) {return("Producto no encontrado")}
            return(arr[index])
        })
        .catch((e) => {
            return(e)
        }))
    }

    // Funciones del carrito
    addProductToCart({prodId,quantity}){
        console.log(prodId,quantity);
        if(fs.existsSync(this.cartPath)){
            return(fs.promises.readFile(this.cartPath)
            .then((r) => {
                let cart = JSON.parse(r)
                this.#cartId = cart[cart.length -1].cartId
                this.#cartId++
                console.log("cartID",this.#cartId)
                let index = cart.findIndex((item) => item.prodId === prodId) //si el producto esta en el carrito
                console.log(index)
                if(index >= 0){
                    cart[index].quantity += quantity;
                } else {
                    cart.push({cartId:this.#cartId,prodId:prodId,quantity:quantity});
                }
                fs.promises.writeFile(this.cartPath,JSON.stringify(cart))
                .then((r) => {return("carrito guardado")})
                .catch((e) => {return(e)})
            }))
        }
    }

}
