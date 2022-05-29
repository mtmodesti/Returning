import { Jogo } from "../../models/Jogos";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { IJogoAtualizar } from "../../interfaces/Jogos";

export default class AtualizarJogoService {
  static async execute({
    id,
    nome,
    valor,
    descricao_jogo,
    dono,
    estado,
    disponivel,
  }: IJogoAtualizar): Promise<Jogo> {
    const jogoRepositorio = AppDataSource.getRepository(Jogo);

    const jogo = await jogoRepositorio.findOne({ where: { id } });

    if (!jogo) {
      throw new AppError("Não encontrado nenhum jogo com esse id", 404);
    }

    nome ? (jogo.nome = nome) : jogo.nome;
    valor ? (jogo.valor = valor) : jogo.valor;
    dono ? (jogo.dono = dono) : jogo.dono;
    estado ? (jogo.estado = estado) : jogo.estado;
    descricao_jogo
      ? (jogo.descricao_jogo = descricao_jogo)
      : jogo.descricao_jogo;
    disponivel ? (jogo.disponivel = disponivel) : jogo.disponivel;

    return jogoRepositorio.save(jogo);
  }
}
