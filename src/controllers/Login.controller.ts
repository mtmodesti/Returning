import { Request, Response } from "express";
import { AutenticacaoService } from "../services/Login/loginUsuario.service";


export default class LoginController {
  static async store(request: Request, response: Response) {
    const { email, senha } = request.body;


    const usuarioAutenticado = await AutenticacaoService.execute({
      email,
      senha,
    });

    return response.json(usuarioAutenticado);
  }
}
