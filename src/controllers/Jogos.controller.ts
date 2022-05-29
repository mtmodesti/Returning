import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Jogo } from "../models/Jogos";
import AtualizarJogoService from "../services/Jogos/AtualizarJogo.service";
import BuscarJogoService from "../services/Jogos/BuscarJogo.service";
import CriarJogosService from "../services/Jogos/CriarJogos.service";
import DeletarJogoService from "../services/Jogos/DeletarJogo.service";
 
export default class JogosController {
  static async store(request: Request, response: Response) {
    const { nome, valor, descricao_jogo, dono, estado, disponivel } =
      request.body;

      console.log(request.body)
    
    const jogo = await CriarJogosService.execute({
      nome,
      valor,
      descricao_jogo,
      dono,
      estado,
      disponivel,
    });
    return response.status(201).json(jogo);
  }
  static async index(request: Request, response: Response) {
    const jogoRepositorio = AppDataSource.getRepository(Jogo);

    const jogos = await jogoRepositorio.find();

    return response.json(jogos);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    const jogo = await BuscarJogoService.execute(id);

    return response.status(200).json(jogo);
  }
  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, valor, dono, estado, descricao_jogo, disponivel } =
      request.body;

    const jogo = await AtualizarJogoService.execute({
      id,
      nome,
      valor,
      dono,
      estado,
      descricao_jogo,
      disponivel,
    });

    return response
      .status(200)
      .json({ message: "Jogo atualizado", jogoAtualizado: jogo });
  }
  static async delete(request: Request, response: Response) {
    const { id } = request.body;
    const deletarJogo = await DeletarJogoService.execute(id);

    return response
      .status(200)
      .json({ message: "Jogo deletado", jogoDeletado: deletarJogo });
  }
}

