import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app"
import request from "supertest"

describe("Deve ser capaz de criar um novo console", () => {
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

  test("Deve ser capaz de inserir um novo jogo no database", async () => {
   
      const nome = "Fulano1"
      const descricao_jogo = "Bom demais1"
      const valor = 256
      const dono = "Joã1o"
      const estado = "Excelente1"
      const observacao = "Quero mais1"
      const disponivel = true
      
      const novoJogo = {nome,
        valor,
        descricao_jogo,
        dono,
        estado,
        disponivel}
      const response= await request(app).post("/jogos").send(novoJogo)

      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining({
          nome,
          valor,
          descricao_jogo,
          dono,
          estado,
          disponivel
      }))
    
  });
});