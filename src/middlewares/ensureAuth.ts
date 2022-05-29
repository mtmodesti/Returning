import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppError";

export default function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Está faltando o JWT", 401);
  }

  try {
    const [, token] = authHeader.split(" ");

    const secret = process.env.SECRET_KEY || "default";

    const decoded = verify(token, secret);

    const { sub } = decoded;

    // request.body = {
    //   id: sub as string,
    // };

    return next();
  } catch (err) {
    throw new AppError("Token inválido");
  }
}
