import { Usuario } from "../../models/Usuarios";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { hash } from "bcrypt";
import { IUsuarioCriar } from "../../interfaces/Usuario";
import { Carrinho } from "../../models/Carrinhos";

export default class CriarUsuarioService {
  static async execute({
    nome,
    cpf,
    email,
    telefone,
    senha,
    pendencia,
  }: IUsuarioCriar): Promise<Usuario> {
    const usuarioRepositorio = AppDataSource.getRepository(Usuario);
    const carrinhoRepositorio = AppDataSource.getRepository(Carrinho);

    const verificandoEmailExiste = await usuarioRepositorio.findOne({
      where: { email },
    });

    if (verificandoEmailExiste) {
      throw new AppError("Email já exite", 404);
    }

    const senhaCodificada = await hash(senha, 8);

    const usuario = usuarioRepositorio.create({
      nome,
      cpf,
      email,
      telefone,
      senha: senhaCodificada,
      pendencia,
    });

    await usuarioRepositorio.save(usuario);

    const carrinho = carrinhoRepositorio.create({
      usuarioId: usuario.id,
    });

    await carrinhoRepositorio.save(carrinho);

    return usuario;
  }
}
