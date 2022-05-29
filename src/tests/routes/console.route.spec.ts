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

  test("Deve ser capaz de inserir um novo console no database", async () => {
   
      const nome = "Fulano"
      const valor = 25
      const dono = "João"
      const estado = "Excelente"
      const observacao = "Quero mais"
      const disponivel = true
      
      const novoConsole = {nome,valor,dono,estado,observacao,disponivel}
      const response= await request(app).post("/consoles").send(novoConsole)

      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining({
          nome,
          valor,
          dono,
          estado,
          observacao,
          disponivel
      }))
    
  });
});

// test("Este teste deve ser capaz de listar os consoles",async()=>{
//     const response = await request(app).get("/consoles").send()

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("map")
// });

// test("Deve ser capaz de deletar um  console no database", async () => {
   
//   const response= await request(app).delete("/consoles/1").send()

//   expect(response.status).toBe(200)
//   expect(response.body).toEqual({messagem:"Console deletado"})


// });


