import { Router } from "express";
import alugarRouter from "./alugar.routes";
import consoleRouter from "./console.routes";
import enderecoRouter from "./enderecos.routes";
import jogoRouter from "./jogos.routes";
import usuarioRouter from "./usuario.routes";
import loginRouter from "./login.routes";
import devolverRouter from "./devolver.routes";
import ensureAuth from "../middlewares/ensureAuth";
import finalizarPedidoRouter from "./finalizarPedido.routes";

const routes = Router();

routes.use("/consoles", ensureAuth, consoleRouter);
routes.use("/jogos", ensureAuth, jogoRouter);
routes.use("/usuarios", usuarioRouter);
routes.use("/enderecos", enderecoRouter);
routes.use("/alugar", ensureAuth, alugarRouter);
routes.use("/login", loginRouter);
routes.use("/devolver", ensureAuth, devolverRouter);
routes.use("/finalizar", ensureAuth, finalizarPedidoRouter);

export default routes;
