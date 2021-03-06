import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import AppError from "./errors/AppError";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.get("", (req, res) => res.send("Página inicial returning"));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

export default app;
