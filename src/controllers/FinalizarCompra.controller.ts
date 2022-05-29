import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import AppError from "../errors/AppError";
import FinalizarCompraService from "../services/FinalizarCompra/FinalizarCompra.service";

export default class FinalizarCompra {
  static async store(request: Request, response: Response) {
    const token = request.headers.authorization;
    const { id } = request.params;
    if (!token) {
      return new AppError("Missing token");
    }
    const usuario = await FinalizarCompraService.execute(id, token);
    return response.json({ usuario });
  }
}
