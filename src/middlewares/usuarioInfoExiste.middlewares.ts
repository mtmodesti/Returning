import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../models/Usuarios";
import AppError from "../errors/AppError";
import { string } from "yup";

export default async function usuarioInfoExiste(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const req = request.body;

  const usuarioRepositorio = AppDataSource.getRepository(Usuario);

  if (req.email) {
    const email = req.email;
    const alrearyEmail = await usuarioRepositorio.findOne({ where: { email } });
    if (alrearyEmail) {
      throw new AppError(`Email já existe`, 406);
    }
  }

  if (req.nome) {
    const nome = req.nome;
    const alrearynome = await usuarioRepositorio.findOne({ where: { nome } });
    if (alrearynome) {
      throw new AppError(`Nome já existe`, 406);
    }
  }

  if (req.cpf) {
    const cpf = req.cpf;
    const alrearycpf = await usuarioRepositorio.findOne({ where: { cpf } });
    if (alrearycpf) {
      throw new AppError(`Cpf já existe`, 406);
    }
  }
  if (req.telefone) {
    const telefone = req.telefone;
    const alrearytelefone = await usuarioRepositorio.findOne({
      where: { telefone },
    });
    if (alrearytelefone) {
      throw new AppError(`Telefone já existe`, 406);
    }
  }

  return next();
}
