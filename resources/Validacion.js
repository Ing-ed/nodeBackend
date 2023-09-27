export function Validar(datos,metodo){
    const camposAddProduct = ["title","description","code","price","status","category"]
    const camposUpdateProduct = ["prodId","field","value"]
    const camposGetProductById = ["prodId"]
    const camposDeleteProduct = ["prodId"]
    const camposaddProductToCart = ["prodId","quantity"]
    const camposupdateProductFromCart = ["cartId","prodId","quantity"]
    let res = true
    console.log(metodo,"Metodo")
    switch(metodo){
        case "addProduct":
            camposAddProduct.map((item) => {
                if(datos[item] === undefined){
                    console.log("aca",item)
                    res = false;
                    
                }
            })
            break;
        case "UpdateProduct":
            camposUpdateProduct.map((item) => {
                if(datos[item] === undefined){
                    console.log("aca",item)
                    res = false;
                    
                }
            })
            break;
        case "GetProductById":
            camposGetProductById.map((item) => {
                if(datos[item] === undefined){
                    console.log("aca",item)
                    res = false;
                    
                }
            })
            break;
        case "DeleteProduct":
            camposDeleteProduct.map((item) => {
                if(datos[item] === undefined){
                    console.log("aca",item)
                    res = false;
                    
                }
            })
            break;
        case "addProductToCart":
            camposaddProductToCart.map((item) => {
                if(datos[item] === undefined){
                    console.log("aca",item)
                    res = false;
                    
                }
            })
            break;
        case "updateProductFromCart":
            camposupdateProductFromCart.map((item) => {
                if(datos[item] === undefined){
                    console.log("aca",item)
                    res = false;
                    
                }
        })
        break;
    }
    return (res);
}