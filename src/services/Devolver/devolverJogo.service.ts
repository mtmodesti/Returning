import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { Jogo } from "../../models/Jogos";
import jwt from "jsonwebtoken";
import { Usuario } from "../../models/Usuarios";
import { DevolverJogo } from "../../interfaces/Devolver";

export default class CriarDevolucaoJogo {
  static async execute({ jogo_id, token }: DevolverJogo) {
    const jogoRepositorio = AppDataSource.getRepository(Jogo);
    const usuarioRepositorio = AppDataSource.getRepository(Usuario);

    const jogos = await jogoRepositorio.findBy({
      id: In(jogo_id),
    });

    if (jogos.length !== jogo_id.length) {
      throw new AppError("Lista invalida com esse id");
    }

    jogos.forEach((item) => {
      item.disponivel = true;
    });

    if (!token) {
      throw new AppError("Token não encontrado");
    }

    const { sub }: any = jwt.decode(token);

    const usuario = await usuarioRepositorio.findOne({
      where: { id: sub },
    });

    if (!usuario) {
      throw new AppError("Não existe usuario com esse id");
    }

    if (usuario.pendencia === false) {
      throw new AppError("Não ha pendencias em seu nome");
    }
    usuario.pendencia = false;

    await usuarioRepositorio.save(usuario);

    await jogoRepositorio.save(jogos);

    return jogos;
  }
}
