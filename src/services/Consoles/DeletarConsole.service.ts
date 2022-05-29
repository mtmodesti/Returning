import { Console } from "../../models/Consoles";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { DeleteResult } from "typeorm";

export default class DeletarConsoleService {
  static async execute(id: string): Promise<DeleteResult> {
    const consoleRepositorio = AppDataSource.getRepository(Console);

    const console = await consoleRepositorio.findOne({ where: { id } });

    if (!console) {
      throw new AppError("Não encontrado nenhum console com esse id", 404);
    }

    return await consoleRepositorio.delete(id);
  }
}
