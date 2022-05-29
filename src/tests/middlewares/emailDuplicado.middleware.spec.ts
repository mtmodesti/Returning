import { Request, Response, NextFunction } from "express";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Usuario } from "../../models/Usuarios";
import usuarioInfoExiste from "../../middlewares/usuarioInfoExiste.middlewares";

describe("Verifica se alguma informação já existe no banco de dados", () => {
  let mockRequest: Partial<Request> = {};
  let mockResponse: Partial<Response> = { json: jest.fn() };
  let mockNextFuncion = jest.fn() as NextFunction;

  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const userRepository = AppDataSource.getRepository(Usuario);

    const user = userRepository.create({
      cpf: "123456",
      email: "novoemail@email.com",
      nome: "Fulano",
      pendencia: false,
      senha: "123456",
      telefone: 37142833,
    });

    await userRepository.save(user);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deverá retornar um erro para email duplicado", async () => {
    const expectedResponse = { error: "Email já existe" };

    mockRequest = {
      body: {
        cpf: "24563265642",
        email: "novoemail@email.com",
        nome: "Nome atualizado",
        pendencia: false,
        senha: "123456789",
        telefone: 33589957,
      },
    };

    await usuarioInfoExiste(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFuncion
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  test("Deverá retornar um erro para CPF duplicado", async () => {
    const expectedResponse = { error: "CPF já existe" };

    mockRequest = {
      body: {
        cpf: "123456",
        email: "novoemail1@email.com",
        nome: "Deltrano",
        pendencia: false,
        senha: "123456789",
        telefone: 33589957,
      },
    };

    await usuarioInfoExiste(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFuncion
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  test("Deverá retornar um erro para nome duplicado", async () => {
    const expectedResponse = { error: "Nome já existe" };

    mockRequest = {
      body: {
        cpf: "24563265642",
        email: "novoemail1@email.com",
        nome: "Fulano",
        pendencia: false,
        senha: "123456789",
        telefone: 33589957,
      },
    };

    await usuarioInfoExiste(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFuncion
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });

  test("Deverá retornar um erro para telefone duplicado", async () => {
    const expectedResponse = { error: "Telefone já existe" };

    mockRequest = {
      body: {
        cpf: "24563265642",
        email: "novoemail1@email.com",
        nome: "Deltrano",
        pendencia: false,
        senha: "123456789",
        telefone: 37142833,
      },
    };

    await usuarioInfoExiste(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFuncion
    );

    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  });
});
