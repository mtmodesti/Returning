import { Request, Response } from "express";
import CriarDevolucaoJogo from "../services/Devolver/devolverJogo.service";

export default class DevolverJogoController {
  static async store(request: Request, response: Response) {
    const { jogo_id } = request.body;
    let token = request.headers.authorization;

    token = token?.split(" ")[1];

    const devolucao = await CriarDevolucaoJogo.execute({
      jogo_id,
      token,
    });
    return response.status(200).json(devolucao);
  }
}
