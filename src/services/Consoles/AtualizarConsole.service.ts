import { Console } from "../../models/Consoles";
import { AppDataSource } from "../../data-source";
import { IConsoleAtualizar } from "../../interfaces/Console";
import AppError from "../../errors/AppError";

export default class AtualizarConsoleService {
  static async execute({
    id,
    nome,
    valor,
    dono,
    estado,
    observacao,
    disponivel,
  }: IConsoleAtualizar): Promise<Console> {
    const consoleRepositorio = AppDataSource.getRepository(Console);

    const console = await consoleRepositorio.findOne({ where: { id } });

    if (!console) {
      throw new AppError("Não encontrado nenhum console com esse id", 404);
    }

    nome ? (console.nome = nome) : console.nome;
    valor ? (console.valor = valor) : console.valor;
    dono ? (console.dono = dono) : console.dono;
    estado ? (console.estado = estado) : console.estado;
    observacao ? (console.observacao = observacao) : console.observacao;
    disponivel ? (console.disponivel = disponivel) : console.disponivel;

    return consoleRepositorio.save(console);
  }
}
