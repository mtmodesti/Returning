
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import UsuarioController from "../../../controllers/Usuario.controller";
import AtualizarUsuarioService from "../../../services/usuario/atualizarUsuario.service";
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

  test("Deve ser capaz de atualizar um usuário no banco de dados", async () => {

     const novoUsuario = new CriarUsuarioService();
     const usuarioCriado = await novoUsuario.execute({
       nome: "Fulano",
       cpf: "22656325492",
       email: "fulano@hotmail.com",
       telefone: 995632663,
       senha: "12345",
       pendencia: true,
     });
     let idUsuário = usuarioCriado.id;


    const usuario = new AtualizarUsuarioService();
    const newUser = usuario.execute({
      id: idUsuário,
      cpf: "123456",
      email: "novoemail@email.com",
      nome: "Nome atualizado",
      pendencia: false,
      senha: "123456",
      telefone: 37142833,
    });
     

    expect(newUser).toBeTruthy();
  });
});
