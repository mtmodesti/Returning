import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { Console } from "../../models/Consoles";
import jwt from "jsonwebtoken";
import { Usuario } from "../../models/Usuarios";
import { DevolverConsole } from "../../interfaces/Devolver";

export default class CriarDevolucaoConsole {
  static async execute({ console_id, token }: DevolverConsole) {
    const consoleRepositorio = AppDataSource.getRepository(Console);
    const usuarioRepositorio = AppDataSource.getRepository(Usuario);

    const consoles = await consoleRepositorio.findBy({
      id: In(console_id),
    });

    if (consoles.length !== console_id.length) {
      throw new AppError("Lista invalida com esse id");
    }

    consoles.forEach((item) => {
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

    await consoleRepositorio.save(consoles);

    return consoles;
  }
}
