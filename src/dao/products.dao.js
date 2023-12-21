import { productModel } from "../models/products.models.js";

class ProdManager {
    constructor(){
    }
    async GetAll(){
        try{
            let result = await productModel.find().lean()
            return result
        } catch(error){
            return null
        }
    }
    async GetAllp({limit, page, sort, query}){
        console.log("products",limit, page, sort, query)
        try{
            console.log("busqueda")
            let search = query !== undefined? {category:query}: {}
            let orden = sort !== undefined ? {price:sort}: {}
            let pagina = page !== undefined ? page: 1
            // let products = await productModel.find();
            let products = await productModel.paginate(search,{limit:+limit>0? +limit : 10,page:page>0?page:1,sort:orden});
            console.log("productos encontrados",products)
            let result =
            {
                status:"success",
                payload:products.docs,
                totalPages:products.totalPages,
                prevPage:products.hasPrevPage ? products.prevPages : null,
                nextPage:products.hasNextPage ? products.nextPage : null,
                page:products.page,
                hasPrevPage:products.hasPrevPage,            
                hasNextPage:products.hasNextPage,
                prevLink:products.hasPrevPage ? `http://localhost:8080/api/products/${limit}/${products.prevPage}/${query}/${sort}`:null,
                nextLink:products.hasNextPage ? `http://localhost:8080/api/products/${limit}/${products.nextPage}/${query}/${sort}`:null,
            }
            return(result);
        } catch (error){
            return({result:"error", error:error.message});
        }
    }

    async GetById({pid}){
        console.log(pid)
        try{
            let product = await productModel.findOne({code:pid})
            console.log(product,"producto")
            if(product === null){return({result:"error",error:"Producto inexistene"})}
            return(product);
        }catch (error) {
            return(error.message)
        }
    }

    async CreateProd(info){
        console.log(info);
        try{
            let result = await productModel.create(info)
            return({result:"success",payload:result})
        } catch(error) {
            return({result:"Error", error: error.message})
        }
    }
    async UpdateProd(pid,field,value){
        console.log(pid, field, value)
        try{
            let actualizacion = {$set:{}}
            actualizacion.$set[field] = value
            console.log(actualizacion)
            let result = await productModel.updateOne({_id:pid},actualizacion)
            console.log(result)
            return({result:"success",payload:result})
        } catch (error) {
            return({result:"error",error:error.message})
        }
    }
    async DeleteProd({pid}){
        console.log(pid)
        try{
            let result = await productModel.deleteOne({_id:pid})
            return({result:"success",payload:result})
        } catch(error){
            return({result:"error",error:error})
        }
    }
}

export default ProdManager