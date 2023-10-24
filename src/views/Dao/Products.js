import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { type } from 'os'
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
            // this.products = []
            this.products.push({
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
            this.products = JSON.parse(r)
            this.#prodId = this.products[this.products.length -1].prodId
            this.#prodId++
            let index = this.products.findIndex((item) => item.code === code)
            console.log("index",index,"codeR",code)
            if(index >= 0) {return("producto existente")}
            this.products.push({
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
            fs.promises.writeFile(this.filePath,JSON.stringify(this.products))
            .then((r) => {return("Agregado con exito")})
            .catch((e) => {return("Erroral guardar")})
        })
        .catch((e) => {
            // //console.log(e, "error")
            return(e)
        }))
    }
    updateProduct({prodId,field,value}){
        console.log("update",prodId,field,value)
        return(fs.promises.readFile(this.filePath)
            .then((r) => {
                this.products = JSON.parse(r)
                this.products.map((t) => console.log(t.prodId))
                let index = this.products.findIndex((item) => item.prodId === prodId)
                console.log("index", index)
                if(index <0) {return ("Producto inexistente")}
                this.products[index][field] = value
                fs.promises.writeFile(this.filePath,JSON.stringify(this.products))
                .then((r) => {return("Actualizado con exito")})
                .catch((e) => {return(e)})
            })
            .catch((e) => {return(e)})
        )
    }
    deleteProduct({prodId}){
        console.log(prodId)
        return(fs.promises.readFile(this.filePath)
        .then((r) => {
            this.products = JSON.parse(r)
            let index = this.products.findIndex((item) => item.prodId === +prodId)
            if(index <0) {return ("producto inexistente")}
            this.products.splice(index,1)
            fs.promises.writeFile(this.filePath,JSON.stringify(this.products))
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
            this.products = JSON.parse(r)
            return(this.products)
        })
        .catch((e) =>{
            return([])
        }))
        // }
    }
    getProductById({prodId}){
        return(fs.promises.readFile(this.filePath)
        .then((r) =>{
            console.log(prodId)
            this.products = JSON.parse(r)
            let index = arr.findIndex((item) => item.prodId === prodId)
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
        return(this.getProductById({prodId})
        .then((r) => {
            let prod = r
            console.log(r, "r","tipo", typeof r)
            if(typeof r === 'string'){return("Producto no encontrado")} //validacion de que el producto existe
            if(fs.existsSync(this.cartPath)){ //si existe el carrito
                console.log("existe")
                fs.promises.readFile(this.cartPath)
                .then((r) => {
                    let cart = JSON.parse(r);
                    this.#cartId = cart[cart.length -1].cartId
                    this.#cartId++
                    cart.push({
                        cartId:this.#cartId,
                        products:[{prodId:prod.prodId,quantity:quantity}]
                    })
                    fs.promises.writeFile(this.cartPath,JSON.stringify(cart))
                    .then((r) =>{
                        return("agregado al carrito")
                    })
                    .catch((e) => {return("e")})
                })
                .catch((e) => {return("e")})
            } else {    //si no existe el carrito
                let cart = [{
                    cartId:this.#cartId,
                    products:[{prodId:prod.prodId,quantity:quantity}]
                }]
                fs.promises.writeFile(this.cartPath)
                .then((r) =>{
                    return("agregado al carrito")
                })
                .catch((e) => {return(e)})

            }
        }))
    }
    
    updateProductFromCart({cartId,prodId,quantity}){
        return(this.getProductById({prodId:prodId})
        .then((r) => {
            let prod = r;
            if(typeof r === 'string'){return("Producto no encontrado")} //validacion de que el producto existe
            fs.promises.readFile(this.cartPath)
            .then((r) => {
                let cart = JSON.parse(r);
                let cartIndex = cart.findIndex((item) => item.cartId === cartId);
                // console.log(cartIndex,"indice")
                if(cartIndex < 0) {return "carrito no encontrado"}
                let prodIndex = cart[cartIndex].products.findIndex((item) => item.prodId === prodId)
                if(prodIndex >= 0){ //producto en el carrito, sumar cantidad
                    // console.log("cantidad ->",cart[cartIndex].products[prodIndex].quantity)
                    cart[cartIndex].products[prodIndex].quantity += quantity
                    console.log(cart[cartIndex])
                } else{
                    cart[cartIndex].products.push({prodId:prodId,quantity:quantity})
                }
                fs.promises.writeFile(this.cartPath,JSON.stringify(cart))
                .then((r) =>{
                    console.log("escribi")
                    return("agregado al carrito")
                })
                .catch((e) => {
                    console.log("error")
                    return("e")
                })
            })
            .catch((e) => {return("e")})
        }))
    }

    getCartById({cartId}){
        console.log(cartId, this.cartPath)
        return(fs.promises.readFile(this.cartPath)
        .then((r) => {
            let carts = JSON.parse(r)
            let index = carts.findIndex((item) => item.cartId === cartId)
            if(index < 0){return("Carrito no encontrado")}
            return(carts[index])
        })
        .catch((e) => {
            return(e)
        }))
    }

}
