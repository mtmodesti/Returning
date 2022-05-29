import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { Pedido } from "../../models/Pedidos";
import { Console_Pedido } from "../../models/Consoles_Pedidos";
import { Console } from "../../models/Consoles";
import jwt from "jsonwebtoken";
import { AluguelConsole } from "../../interfaces/Aluguel";

export default class CriarAluguelConsole {
  static async execute({ console_id, token }: AluguelConsole): Promise<Pedido> {
    const pedidoRepositorio = AppDataSource.getRepository(Pedido);
    const consolePedidoRepositorio =
      AppDataSource.getRepository(Console_Pedido);

    const consoleRepositorio = AppDataSource.getRepository(Console);

    if (!token) {
      throw new AppError("Token não encontrado");
    }

    const { usuarioCarrinho }: any = jwt.decode(token);

    const consoles = await consoleRepositorio.findBy({
      id: In(console_id),
    });


    if (consoles.length !== console_id.length) {
      throw new AppError("Lista invalida com esse id");
    }

    consoles.forEach(console => {
      if (console.disponivel === false) {
      throw new AppError(`Existem produtos indisponíveis. Reveja seu pedido`);
      
    }
  })    



    const pedido = pedidoRepositorio.create({ carrinhoId: usuarioCarrinho });

    await pedidoRepositorio.save(pedido);

    console_id.forEach(async (consoleId) => {
      const consolePedido = consolePedidoRepositorio.create({
        pedido: pedido,
        consoleId,
      });

      await consolePedidoRepositorio.save(consolePedido);
    });

    return pedido;
  }
}
