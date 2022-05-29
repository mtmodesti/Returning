import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { DeleteResult } from "typeorm";
import { Jogo } from "../../models/Jogos";

export default class DeletarJogoService {
  static async execute(id: string): Promise<DeleteResult> {
    const jogoRepositorio = AppDataSource.getRepository(Jogo);

    const jogo = await jogoRepositorio.findOne({ where: { id } });

    if (!jogo) {
      throw new AppError("Não encontrado nenhum jogo com esse id", 404);
    }

    return await jogoRepositorio.delete(id);
  }
}
