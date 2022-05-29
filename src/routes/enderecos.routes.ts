import { Router } from "express";
import EnderecoController from "../controllers/Enderecos.controller";

const enderecoRouter = Router();

enderecoRouter.post("", EnderecoController.store);
enderecoRouter.get("", EnderecoController.index);
enderecoRouter.patch("/:id", EnderecoController.update);
enderecoRouter.delete("/:id", EnderecoController.delete);

export default enderecoRouter;
