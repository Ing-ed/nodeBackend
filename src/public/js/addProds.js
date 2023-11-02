const buttons = Array.from(document.getElementsByClassName("add"));
const cartId = document.getElementById("idCart").innerHTML
console.log(cartId,"id de carrito")
buttons.map((item) =>{
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
        .then((r) => console.log(r))
        console.log(item.parentNode.getElementsByClassName("cant")[0].value,"paren")
        console.log("nombre",item.name,window.location.host)
    })
})
console.log(buttons)