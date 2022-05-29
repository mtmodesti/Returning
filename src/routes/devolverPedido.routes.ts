import { Router } from "express";
import DevolverProdutos from "../controllers/DevolverPedido.controller";

const devolverRouter = Router()

devolverRouter.post("", DevolverProdutos.store);

export default devolverRouter;