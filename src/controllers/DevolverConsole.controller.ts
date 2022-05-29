import { Request, Response } from "express";
import CriarDevolucaoConsole from "../services/Devolver/devolverConsole.service";

export default class DevolverConsoleController {
  static async store(request: Request, response: Response) {
    const { console_id } = request.body;
    let token = request.headers.authorization;

    token = token?.split(" ")[1];

    const devolucao = await CriarDevolucaoConsole.execute({
      console_id,
      token,
    });
    return response.status(200).json(devolucao);
  }
}
