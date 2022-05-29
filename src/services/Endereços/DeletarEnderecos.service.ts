import { Endereco } from "../../models/Enderecos";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { DeleteResult } from "typeorm";

export default class DeletarEnderecosService {
  static async execute(id: string): Promise<DeleteResult> {
    const enderecoRepositorio = AppDataSource.getRepository(Endereco);

    const enderecoUsuario = await enderecoRepositorio.findOne({
      where: {
        id,
      },
    });

    if (!enderecoUsuario) {
      throw new AppError("Não encontrado nenhum endereço com esse id", 404);
    }

    return await enderecoRepositorio.delete(id);
  }
}
