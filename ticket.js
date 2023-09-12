class TicketManager{
    #precioBaseGanancia = 1;
    #idEvento = 0;
    constructor(){
        this.events = [];
    }
    getEvents(){
        return this.events;
    }
    addEvent(nombre, lugar, precio, capacidad = 50, fecha = "hoy"){
        this.events.push({id:this.#idEvento,nombre:nombre,lugar:lugar,precio:precio,capacidad:capacidad,fecha:fecha,participantes:[]})
        this.#idEvento++;
    }
    addUser(eventId,userId){
        let indexEvent = this.events.findIndex((item) => item.id === eventId);
        if(indexEvent <0){
            return("el evento no existe")
        }
        let indexUser = this.events[indexEvent].participantes.findIndex((item) => item.id === userId);
        console.log(indexUser,"indexEncontrado")
        if(indexUser >=0){
            return("el usuario ya esta registrado");
        }
        this.events[indexEvent].participantes.push({id:userId});
        console.log(this.events[indexEvent])
        return("usuario agregado");
    }
    eventOnTour(eventId,lugar,fecha){
        let modifEvent = this.events.find((item) => item.id === eventId)
        if(modifEvent !== undefined){
            modifEvent.lugar = lugar;
            modifEvent.fecha = fecha;
            modifEvent.participantes = []
        }
        console.log("evento encontrado",modifEvent);
    }
}

let ticket = new TicketManager();
ticket.addEvent("lula","aca",200,)
ticket.addEvent("lula","aca",200,30)
// console.log(ticket.getEvents());
console.log(ticket.addUser(1,0))
console.log(ticket.addUser(0,10))
console.log(ticket.addUser(0,10))
ticket.eventOnTour(0,"cordoba","mañana")