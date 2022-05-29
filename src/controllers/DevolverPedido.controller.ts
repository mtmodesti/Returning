import { Request, Response } from "express";
import devolverPedidoService from "../services/Devolver/devolverPedido.service";

export default class DevolverProdutos {
    static async store(request: Request, response: Response) {
      
        const { id } = request.params
        
        devolverPedidoService.execute(id)

        return response.status(201).json({devolvido:"devolvido"})
    }
    

}
