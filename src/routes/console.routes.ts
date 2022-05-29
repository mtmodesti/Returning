import { Router } from "express";
import ConsoleController from "../controllers/Consoles.controller";
const consoleRouter = Router();

consoleRouter.post("", ConsoleController.store);
consoleRouter.get("", ConsoleController.index);
consoleRouter.get("/:id", ConsoleController.show);
consoleRouter.patch("/:id", ConsoleController.update);
consoleRouter.delete("/:id", ConsoleController.delete);

export default consoleRouter;
