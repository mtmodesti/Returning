import { Endereco } from "../../models/Enderecos";
import AppError from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { IEnderecosCriar } from "../../interfaces/Endereco";

export default class CriarEnderecosService {
  static async execute({
    cidade,
    estado,
    cep,
    rua,
    numero,
    bairro,
    complemento,
    usuarioId,
  }: IEnderecosCriar): Promise<Endereco> {
    const enderecoRepositorio = AppDataSource.getRepository(Endereco);

    const enderecoUsuario = enderecoRepositorio.create({
      cidade,
      estado,
      cep,
      rua,
      numero,
      bairro,
      complemento,
      usuario: usuarioId,
    });

    await enderecoRepositorio.save(enderecoUsuario);

    return enderecoUsuario;
  }
}
