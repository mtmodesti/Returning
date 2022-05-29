import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Endereco } from "../models/Enderecos";
import CriarEnderecosService from "../services/Endereços/CriarEnderecos.service";
import AtualizarEnderecosService from "../services/Endereços/AtualizarEnderecos.service";
import DeletarEnderecosService from "../services/Endereços/DeletarEnderecos.service";

export default class EnderecoController {
  static async store(request: Request, response: Response) {
    const { cidade, estado, cep, rua, numero, bairro, complemento, usuarioId } =
      request.body;

    const endereco = await CriarEnderecosService.execute({
      cidade,
      estado,
      cep,
      rua,
      numero,
      bairro,
      complemento,
      usuarioId,
    });
    return response.status(201).json(endereco);
  }
  static async index(request: Request, response: Response) {
    const enderecoRepositorio = AppDataSource.getRepository(Endereco);

    const enderecos = await enderecoRepositorio.find();

    return response.status(200).json(enderecos);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { cidade, estado, cep, rua, numero, bairro, complemento } =
      request.body;

    const endereco = await AtualizarEnderecosService.execute({
      id,
      cidade,
      estado,
      cep,
      rua,
      numero,
      bairro,
      complemento,
    });

    return response
      .status(200)
      .json({ message: "Endereco atualizado", enderecoAtualizado: endereco });
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    const endereco = await DeletarEnderecosService.execute(id);

    return response
      .status(200)
      .json({ message: "Address deleted", enderecoDeletado: endereco });
  }
}
