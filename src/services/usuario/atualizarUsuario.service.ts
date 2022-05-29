import { Usuario } from "../../models/Usuarios";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { compare, hash } from "bcrypt";
import { IUsuarioAtualizar } from "../../interfaces/Usuario";

export default class AtualizarUsuarioService {
  static async execute({
    id,
    nome,
    cpf,
    email,
    telefone,
    senha,
    pendencia,
  }: IUsuarioAtualizar): Promise<Usuario> {
    const usuarioRepositorio = AppDataSource.getRepository(Usuario);

    const usuario = await usuarioRepositorio.findOne({ where: { id } });

    if (!usuario) {
      throw new AppError("Não foi encontrado nenhum usuario com esse id", 404);
    }

    if (senha) {
      const senhaDecodificada = await compare(senha, usuario.senha);

      if (senhaDecodificada) {
        throw new AppError("Passwords are the same", 406);
      }
    }

    nome ? (usuario.nome = nome) : usuario.nome;
    cpf ? (usuario.cpf = cpf) : usuario.cpf;
    email ? (usuario.email = email) : usuario.email;
    telefone ? (usuario.telefone = telefone) : usuario.telefone;
    senha ? (usuario.senha = await hash(senha, 8)) : usuario.senha;
    pendencia ? (usuario.pendencia = pendencia) : usuario.pendencia;

    return usuarioRepositorio.save(usuario);
  }
}
