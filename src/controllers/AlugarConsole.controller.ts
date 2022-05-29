import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Console_Pedido } from "../models/Consoles_Pedidos";
import CriarAluguelConsole from "../services/Alugar/criarAluguelConsole.service";

export default class AlugarConsoleController {
  static async store(request: Request, response: Response) {
    const { console_id } = request.body;

    let token = request.headers.authorization;

    token = token?.split(" ")[1];

    const pedido = await CriarAluguelConsole.execute({ console_id, token });

    return response.status(201).json(pedido);
  }

  static async index(request: Request, response: Response) {
    const pedidoRepositorio = AppDataSource.getRepository(Console_Pedido);

    const pedidos = await pedidoRepositorio.find();

    return response.status(200).json(instanceToPlain(pedidos));
  }
}
