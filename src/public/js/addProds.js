const buttons = Array.from(document.getElementsByClassName("add"));
buttons.map((item) =>{
    item.addEventListener('click',()=>{
        fetch(`http://${window.location.host}/api/cart`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                prodId:item.name,
                quantity:item.parentNode.getElementsByClassName("cant")[0].value
            })
        })
        console.log(item.parentNode.getElementsByClassName("cant")[0].value,"paren")
        console.log("nombre",item.name,window.location.host)
    })
})
console.log(buttons)