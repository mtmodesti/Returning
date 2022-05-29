import { Usuario } from "../../models/Usuarios";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";

export default class DeletarUsuarioService {
  static async execute(id: string): Promise<Usuario> {
    const usuarioRepositorio = AppDataSource.getRepository(Usuario);

    const usuario = await usuarioRepositorio.findOne({ where: { id } });

    if (!usuario) {
      throw new AppError("Não foi encontrado nenhum usuario com esse id", 404);
    }
    await usuarioRepositorio.delete(id);

    return usuario;
  }
}
