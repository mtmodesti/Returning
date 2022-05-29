import { Router } from "express";
import AlugarConsoleController from "../controllers/AlugarConsole.controller";
import AlugarJogoController from "../controllers/AlugarJogo.controller";

const alugarRouter = Router();

/* ROTAS DE CONSOLES */

alugarRouter.post("/consoles", AlugarConsoleController.store);
alugarRouter.get("/consoles", AlugarConsoleController.index);

/* ROTAS DE JOGOS */

alugarRouter.post("/jogos", AlugarJogoController.store);
alugarRouter.get("/jogos", AlugarJogoController.index);

export default alugarRouter;
