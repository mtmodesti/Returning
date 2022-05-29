import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";
import CriarUsuarioService from "../../services/usuario/criarUsuario.service";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new user", async () => {
    const cpf = "123456";
    const email = "novoemail@email.com";
    const nome = "Nome atualizado";
    const pendencia = false;
    const senha = "123456";
    const telefone = 37142833;

    const usuarioInfo = { cpf, email, nome, pendencia, senha, telefone };

    const response = await request(app).post("/usuarios").send(usuarioInfo);

    expect(response.statusCode).toEqual(201);
    /* expect(response.body).toEqual(
      expect.objectContaining({
        id: "id",
        cpf,
        email,
        nome,
        pendencia,
        senha,
        telefone,
      })
    ); */
  });

  /* test("Should be able to return a list of all registered users", async () => {
    const response = await request(app).get("/usuarios");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  }); */
});
