import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../models/Usuarios";
import AtualizarUsuarioService from "../services/usuario/atualizarUsuario.service";
import CriarUsuarioService from "../services/usuario/criarUsuario.service";
import DeletarUsuarioService from "../services/usuario/deletarUsuario.service";

export default class UsuarioController {
  static async store(request: Request, response: Response) {
    const { nome, cpf, email, telefone, senha, pendencia } = request.body;
    /*   const nodemailer = require("nodemailer"); */

    const usuario = await CriarUsuarioService.execute({
      nome,
      cpf,
      email,
      telefone,
      senha,
      pendencia,
    });
    /* 
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2b05ea152a00d5",
        pass: "1c50014392317c",
      },
    });

    let message = {
      from: "noreplay@rtng.com.br",
      to: `${email}`,
      subject: "Cadastro realizado com sucesso",
      text: "Sua nova melhor locadora agora a um clique",
      html: "<p>Olá. Obrigado por ser cadastrar na Returning</p>",
    };

    transport.sendMail(message, function (err: any) {
      if (err) {
        return response.status(400).json({
          erro: true,
          msg: "Erro durante o envio de e-mail",
        });
      }
    }); */

    return response.status(201).json(usuario);
  }

  static async index(request: Request, response: Response) {
    const usuariosRepositorio = AppDataSource.getRepository(Usuario);

    const usuarios = await usuariosRepositorio.find();

    return response.status(200).json(usuarios);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, cpf, email, telefone, senha, pendencia } = request.body;

    const usuario = await AtualizarUsuarioService.execute({
      id,
      nome,
      cpf,
      email,
      telefone,
      senha,
      pendencia,
    });

    return response
      .status(200)
      .json({ message: "Usuario atualizado", usuarioAtualizado: usuario });
  }
  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    const usuario = await DeletarUsuarioService.execute(id);

    return response.status(200).json({ message: "User deleted" });
  }
}
