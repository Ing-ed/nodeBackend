const fs = require('fs')

class ProductManager{    
    #prodId = 0
    // #path = "./Productos.txt"
    constructor(){
        // this.products = []
        this.path = "./productos.txt"
        this.products = []
    }
    addProduct(title, descipion, price, thumbnail, code, stock){
        if(!fs.existsSync(this.path)){
            let arr = []
            arr.push({id:this.#prodId,title:title,descipion:descipion,price:price,thumbnail,thumbnail,code:code,stock:stock})
            return(fs.promises.writeFile(this.path,JSON.stringify(arr))
            .then((r) => {return(0)})
            .catch((e) => {return(2)})
            )
        }
        return(fs.promises.readFile(this.path,'utf-8')
        .then((r) => {
            let arr = JSON.parse(r)
            let index = arr.findIndex((item) => item.code === code)
            if(index >= 0) {return(1)}
            arr.push({id:this.#prodId,title:title,descipion:descipion,price:price,thumbnail,thumbnail,code:code,stock:stock})
            this.#prodId++
            fs.promises.writeFile(this.path,JSON.stringify(arr))
            .then((r) => {return(0)})
            .catch((e) => {return(2)})
        })
        .catch((e) => {
            console.log(e, "error")
            return(3)
        }))
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
            let prods = JSON.parse(r)
            let prod = prods.find((item)=> item.id = prodId)
            console.log(prod)
            return(prod)
        })
        .catch((e) => {
            return(e)
        }))
    }
}
let manager = new ProductManager()
// console.log(manager.getProducts())
manager.getProducts()
.then((r) => console.log(r, "Productos"))
.catch((e) => console.log("err","e"))
for(let i = 0; i<3; i++){
    manager.addProduct("producto de prueba","Este es un producto de prueba",200,"sin imagen","abd123",25)
    .then((r) =>{
        if(r >0){
            console.log("error en el intento ",i,"de agregar el producto", r);
        } else{
            console.log("Producto agregado con exito")
        }
    }).catch((e) => console.log("error",e))
}
// console.log(manager.getProducts(),"Productos")
