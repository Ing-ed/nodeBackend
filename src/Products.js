import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
// import fs from 'fs'
const ruta = dirname(import.meta.url);

export class ProductManager{    
    
    #prodId = 0
    // #path = "./Productos.txt"
    constructor(){
        console.log("Ruta",ruta);
        this.path = "productos.json"
        this.products = []
    }
    addProduct(title, description,code, price, status, stock, category, thumbnail ){
       let arr = []
       arr.push({
        id:this.#prodId,
        title:title,
        description:description,
        code:code,
        price:price,
        status:status,
        stock:stock,
        category:category,
        thumbnail:thumbnail
        })
        if(fs.existsSync(this.path)){
            return(fs.promises.readFile(this.path))
            .then((r) => {
                let res = JSON.parse(r);
                let index = res.findIndex((item) => item.code === code)
                // if(index => 0){return({message:"producto existente",codigo:code,index:index})}
                this.#prodId = arr[arr.length -1].id
                this.#prodId++
                arr[0].id = this.#prodId;
                arr = [...arr,res]
                console.log(arr)
                return(fs.promises.writeFile(this.path,JSON.stringify(arr)))
                .then((r) => {
                    this.#prodId
                    return("agregado con exito")
                })
                .catch((e) => {return("error al guardar")})
            })
        }

    }
    updateProduct(prodId,field,value){
        console.log("update")
        return(fs.promises.readFile(this.path)
            .then((r) => {
                let arr = JSON.parse(r)
                let index = arr.findIndex((item) => item.id === prodId)
                if(index <0) {return (1)}
                arr[index][field] = value
                console.log("update", arr)
                fs.promises.writeFile(this.path,JSON.stringify(arr))
                .then((r) => {return (0)})
                .catch((e) => {return(2)})
            })
            .catch((e) => {return(3)})
        )
    }
    deleteProduct(prodId){
        return(fs.promises.readFile(this.path)
        .then((r) => {
            let arr = JSON.parse(r)
            let index = arr.findIndex((item) => item.id === prodId)
            if(index <0) {return (1)}
            arr.splice(index,1)
            fs.promises.writeFile(this.path,JSON.stringify(arr))
            .then((r) => {return(0)})
            .catch((e) => {return(2)})
        })
        .catch((e) => {return(3)})       
        )
    }

    getProducts(){
        // if(fs.existsSync(this.path)){
            // console.log("aca")
        return(fs.promises.readFile(this.path)
        .then((r) =>{
            // console.log("ahora aca",r)
            let prods = JSON.parse(r)
            return(prods)
        })
        .catch((e) =>{
            return([])
        }))
        // }
    }
    getProductById(prodId){
        return(fs.promises.readFile(this.path)
        .then((r) =>{
            console.log(prodId)
            let arr = JSON.parse(r)
            let index = arr.findIndex((item) => item.id === prodId)
            if(index <0) {return("Producto no encontrado")}
            return(arr[index])
        })
        .catch((e) => {
            return(e)
        }))
    }
}
// console.log("Comienzo")
// let manager = new ProductManager()
// // console.log(manager.getProducts())
// for(let i = 0; i< 3; i++){
//     manager.addProduct("producto de prueba",
//         "Este es un producto de prueba",
//         200,
//         "sin imagen",
//         "abd123-"+i.toString(),
//         25)
//     .then((r) => console.log("respuesta de add",r))
//     .catch((e) => console.log("error de add",e))
// }
// manager.getProducts()
// .then((r) => console.log(r, "Productos"))
// .catch((e) => console.log("err","e"))
// manager.getProductById(0)
// .then((r) => console.log("respuesta de getbyId",r))
// .catch((e) => console.log("error de getbyId",e))
// manager.updateProduct(0,"description","Descripcion cambiada")
// .then((r) => console.log("respuesta update",r))
// .catch((e) => console.log("error de update",e))
// manager.deleteProduct(1)
// // .then((r) => console.log("respuesta de borrar",r))
// // .catch((e) => console.log("Error al borrar",e))
// // console.log(manager.getProducts(),"Productos")
