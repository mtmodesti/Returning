import { Usuario } from "../models/Usuarios";

export interface Request {
  email: string;
  senha: string;
}

export interface Response {
  token: string;
  usuario: Usuario;
}
