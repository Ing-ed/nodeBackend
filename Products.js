class ProductManager{
    #prodId = 0
    constructor(){
        this.products = []
    }
    addProduct(title, descipion, price, thumbnail, code, stock){
        let index = this.products.findIndex((item) => item.code === code);
        if(index >= 0){return(1);}
        this.products.push({id:this.#prodId,title:title, descipion:descipion, price:price, thumbnail:thumbnail, code:code, stock:stock});
        console.log(this.products,"productos")
        this.#prodId++;
        return(0);
    }
    getProducts(){
        return(this.products);
    }
    getProductById(prodId){
        let index = this.products.findIndex((item) => item.id === prodId);
        if(index < 0){
            // console.log("Producto no existente")
            return("Producto no existente");
        }
        return(this.products[index])
    }
}
let manager = new ProductManager()
console.log(manager.getProducts())
//intentare agregar 3 veces el mismo producto, la salida deberia ser producto existente*2
for(let i = 0; i<3; i++){
    if(manager.addProduct("producto de prueba","Este es un producto de prueba",200,"sin imagen","abc123",25) >0){
        console.log("Producto existente -> intento ",i);
    } else {
        console.log("Producto agregado con exito")
    }
}
prosducts = manager.addProduct("producto de prueba","Este es un producto de prueba",200,"sin imagen","abc123",25);
console.log(manager.getProducts())
console.log("id->   1",manager.getProductById(1)) //producto no existente
console.log("id->   0",manager.getProductById(0)) //producto existente