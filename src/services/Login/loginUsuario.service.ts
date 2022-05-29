import { Usuario } from "./../../models/Usuarios";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { Carrinho } from "../../models/Carrinhos";
import { Request, Response } from "../../interfaces/Login";

export class AutenticacaoService {
  static async execute({ email, senha }: Request): Promise<Response> {
    const repositorioUsuario = AppDataSource.getRepository(Usuario);
    const carrinhoRepositorio = AppDataSource.getRepository(Carrinho);

    const usuario = await repositorioUsuario.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new AppError("Combinação de e-mail ou senha incorretos");
    }
    const carrinho = await carrinhoRepositorio.findOne({
      where: { usuarioId: usuario.id },
    });

    const senhaMatch = await compare(senha, usuario.senha);

    if (!senhaMatch) {
      throw new AppError("Combinação de e-mail ou senha incorretos");
    }

    const token = sign(

       { usuarioCarrinho: carrinho?.id, },

      process.env.SECRET_KEY || "default",
      {
        subject:usuario.id,
        expiresIn: "3d",
      }
    );

    return {
      usuario,
      token,
    };
  }
}
