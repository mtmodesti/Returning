import { Console } from "../../models/Consoles";
import IConsoleCriar from "../../interfaces/Console";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";

export default class CriarConsoleService {
  static async execute({
    nome,
    valor,
    dono,
    estado,
    observacao,
    disponivel,
  }: IConsoleCriar): Promise<Console> {
    const consoleRepositorio = AppDataSource.getRepository(Console);

    if (
      !nome ||
      !valor ||
      !observacao ||
      !dono ||
      !estado ||
      disponivel === undefined
    ) {
      throw new AppError("Precisa de todos os campos");
    }

    const console = consoleRepositorio.create({
      nome,
      valor,
      dono,
      estado,
      observacao,
      disponivel,
    });

    await consoleRepositorio.save(console);

    return console;
  }
}
