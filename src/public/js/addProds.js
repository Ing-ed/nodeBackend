const buttons = Array.from(document.getElementsByClassName("add"));
const rol = document.getElementById("addProd");
const cartId = document.getElementById("idCart").innerHTML
console.log(cartId,"id de carrito")
buttons.map((item) =>{
    if(rol !== null){
        // let deleteThis = document.createElement("button")
        // deleteThis.innerHTML = "Borrar"
        // deleteThis.addEventListener("clic",()=>{
        //     console.log("click")
        //     fetch(`http://${window.location.host}/api/products/${item.name}`,{
        //         method:'PUT',
        //         headers:{
        //             'Content-Type':'application/json'
        //         }
        //     })
        // })
        // item.parentNode.appendChild(deleteThis)
        item.innerHTML = "Modificar stock"
        item.addEventListener('click',()=>{
            fetch(`http://${window.location.host}/api/products/${item.name}`,{
                method:item.parentNode.getElementsByClassName("cant")[0].value > 0?'PUT' :'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    field:"stock",
                    value:item.parentNode.getElementsByClassName("cant")[0].value
                })
            })
            .then((r) => r.json())
            .then((r) => {
                if(r.error){
                    window.alert(`Algo salio mal \n ${r.error}`);
                }
                console.log(r.error,"resp")})
            // console.log(item.parentNode.getElementsByClassName("cant")[0].value,"paren")
            // console.log("nombre",item.name,window.location.host)
        })
    }else {
        item.addEventListener('click',()=>{
        fetch(`http://${window.location.host}/api/cart/${cartId}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                prodId:item.name,
                quantity:item.parentNode.getElementsByClassName("cant")[0].value
            })
        })
        .then((r) => r.json())
        .then((r) => {
            if(r.error){
                window.alert(`Algo salio mal \n ${r.error}`);
            }
            console.log(r.error,"resp")})
        // console.log(item.parentNode.getElementsByClassName("cant")[0].value,"paren")
        // console.log("nombre",item.name,window.location.host)
    })}
})
console.log(buttons)