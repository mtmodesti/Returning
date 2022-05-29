import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import CriarUsuarioService from "../../../services/usuario/criarUsuario.service";

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

  let teste = "";

  test("Deve ser capaz de inserir um novo usuário no database", async () => {
    const novoUsuario = new CriarUsuarioService();
    const usuario = await novoUsuario.execute({
      nome: "Fulano",
      cpf: "22656325492",
      email: "fulano@hotmail.com",
      telefone: 995632663,
      senha: "12345",
      pendencia: true,
    });
    teste = usuario.id;
    expect(usuario).toBeTruthy();
  });

  /* test("should not be able to create an existing user", async () => {
    const userData: usuario = {
      name: "Test Existing Name",
      email: "testexisting@test.com.br",
      username: "testexisting",
    };

    await CriarUsuarioService.execute(userData);

    await expect(CriarUsuarioService.execute(userData)).rejects.toEqual(
      new Error("User already exists!")
    );
  }); */
});
