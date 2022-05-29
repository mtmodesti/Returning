import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";

describe("Deve ser capaz de criar um novo endereço", () => {
  let conexaoDb: any = DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conexaoDb = res))
      .catch((err) => {
        console.error("Error during data source initialization");
      });
  });

  afterAll(async () => {
    await conexaoDb.destroy();
  });

  test("Deve ser capaz de inserir um novo endereço no database", async () => {
    const cidade = "Fulano1";
    const estado = "mg";
    const cep = "3212312332";
    const rua = "joao sa";
    const numero = "545";
    const bairro = "Excelente1";
    const complemento = "Quero mais1";
    const usuarioId = "jheujgjesgbjsbegsebg";

    const novoEndereco = {
      cidade,
      estado,
      cep,
      rua,
      numero,
      bairro,
      complemento,
      usuarioId,
    };
    const response = await request(app).post("/enderecos").send(novoEndereco);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        cidade,
        estado,
        cep,
        rua,
        numero,
        bairro,
        complemento,
        usuarioId,
      })
    );
  });
});
