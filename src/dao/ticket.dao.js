import { TicketModel } from "../models/ticket.model.js";

class TicketManger{
    constructor(){}

    async CreateTicket(body){
        try{
            let result = await TicketModel.create(body);
            return result;
        } catch (error){
            return error.message
        }
    }
    async Count(){
        try{
            let result = await TicketModel.count();
            return result;
        } catch (error){
            return error.message
        }
    }
} export default TicketManger