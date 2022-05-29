import { Console } from "../../models/Consoles";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";

export default class UnicoConsoleService {
  static async execute(id: string): Promise<Console> {
    const consoleRepositorio = AppDataSource.getRepository(Console);
    const console = await consoleRepositorio.findOne({ where: { id } });

    if (!console) {
      throw new AppError("Não encontrado nenhum console com esse id", 404);
    }

    return console;
  }
}
