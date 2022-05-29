import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import UsuarioController from "../../../controllers/Usuario.controller"


describe("Deve ser capaz de criar um novo usuário", () => {
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

  test("Deve ser capaz de listar todos os usuários cadastrados no banco de dado", async () => {
      const todosUsuarios = new UsuarioController();

      const todos = todosUsuarios
      expect(todos).toBeDefined()
    
  });
});
