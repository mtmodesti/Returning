import { Router } from "express";
import UsuarioController from "../controllers/Usuario.controller";
import usuarioInfoExiste from "../middlewares/usuarioInfoExiste.middlewares";

const usuarioRouter = Router();

usuarioRouter.post("", UsuarioController.store);
usuarioRouter.get("", UsuarioController.index);
usuarioRouter.patch("/:id", usuarioInfoExiste, UsuarioController.update);
usuarioRouter.delete("/:id", UsuarioController.delete);

export default usuarioRouter;
