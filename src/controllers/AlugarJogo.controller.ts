import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import CriarAluguelJogo from "../services/Alugar/criarAluguelJogo.service";
import { Jogo_Pedido } from "../models/Jogos_Pedidos";

export default class AlugarJogoController {
  static async store(request: Request, response: Response) {
    const { jogo_id } = request.body;

    let token = request.headers.authorization;

    token = token?.split(" ")[1];

    const { sub }: any = token
    
    const pedido = await CriarAluguelJogo.execute({ jogo_id, token });

    return response.status(201).json(pedido);
  }

  static async index(request: Request, response: Response) {
    const pedidoRepositorio = AppDataSource.getRepository(Jogo_Pedido);

    const pedidos = await pedidoRepositorio.find();

    return response.status(200).json(instanceToPlain(pedidos));
  }
}
