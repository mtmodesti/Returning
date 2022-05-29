import JogosController from "../controllers/Jogos.controller";

import { Router } from "express";

const jogoRouter = Router();

jogoRouter.post("", JogosController.store);
jogoRouter.get("", JogosController.index);
jogoRouter.get("/:id", JogosController.show);
jogoRouter.patch("/:id", JogosController.update);
jogoRouter.delete("/:id", JogosController.delete);

export default jogoRouter;
