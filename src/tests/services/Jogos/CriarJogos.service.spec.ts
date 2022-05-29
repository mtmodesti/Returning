import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import CriarJogosService from "../../../services/Jogos/CriarJogos.service";

describe("Deve ser capaz de criar um novo jogo", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during data source initialization");
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve ser capaz de inserir um novo jogo no database", async () => {
    const novoJogo = new CriarJogosService();
    const jogo = await novoJogo.execute({
      nome: "Jogo de teste",
      valor: 10,
      descricao_jogo: "Jogo de aventura",
      dono: "returning",
      estado: "bom estado",
      disponivel: true,
    });

    expect(jogo).toBeTruthy();
  });
});
