import { Usuario } from "./../../models/Usuarios";
import { Jogo } from "./../../models/Jogos";
import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { Pedido } from "../../models/Pedidos";
import { Jogo_Pedido } from "../../models/Jogos_Pedidos";
import jwt from "jsonwebtoken";
import { AluguelJogo } from "../../interfaces/Aluguel";

export default class CriarAluguelJogo {
  static async execute({ jogo_id, token }: AluguelJogo): Promise<Pedido> {
    const pedidoRepositorio = AppDataSource.getRepository(Pedido);

    const jogoPedidoRepositorio = AppDataSource.getRepository(Jogo_Pedido);

    const jogoRepositorio = AppDataSource.getRepository(Jogo);

    if (!token) {
      throw new AppError("Token não encontrado");
    }

    const jogos = await jogoRepositorio.findBy({
      id: In(jogo_id),
    });

    if (jogos.length !== jogo_id.length) {
      throw new AppError("Lista invalida com esse id");
    }

    const { usuarioCarrinho }: any = jwt.decode(token);

    jogos.forEach((jogo) => {
      if (jogo.disponivel === false) {
        throw new AppError(`Existem produtos indisponíveis. Reveja seu pedido`);
      }
    }); 

    const pedido = pedidoRepositorio.create({ carrinhoId: usuarioCarrinho });

    await pedidoRepositorio.save(pedido);

    jogo_id.forEach(async (jogoId) => {
      const jogoPedido = jogoPedidoRepositorio.create({
        pedido: pedido,
        jogoId,
      });

      await jogoPedidoRepositorio.save(jogoPedido);
    });
    return pedido;
  }
}
