import { MigrationInterface, QueryRunner } from "typeorm";

export class criarTabelas1653483601482 implements MigrationInterface {
  name = "criarTabelas1653483601482";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(128) NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(128) NOT NULL, "telefone" integer NOT NULL, "senha" character varying(128) NOT NULL, "pendencia" boolean NOT NULL DEFAULT 'false', CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "carrinhos" ("id" SERIAL NOT NULL, "usuarioId" uuid NOT NULL, CONSTRAINT "REL_ff45b69dce2f1ce3032c0a41f8" UNIQUE ("usuarioId"), CONSTRAINT "PK_8ed80828de93327d4601c21c30f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "carrinhoId" integer NOT NULL, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "consoles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(128) NOT NULL, "valor" numeric(8,2) NOT NULL, "dono" character varying(128) NOT NULL, "estado" character varying(128) NOT NULL, "observacao" character varying(256) NOT NULL, "disponivel" boolean NOT NULL, CONSTRAINT "PK_bde30fa4acf34faf40555da2332" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "consoles_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pedidoId" integer NOT NULL, "consoleId" uuid NOT NULL, CONSTRAINT "PK_be6f9f5eeda101604abc86e061b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "enderecos" ("id" SERIAL NOT NULL, "cidade" character varying(128) NOT NULL, "estado" character varying(2) NOT NULL, "cep" character varying(9) NOT NULL, "rua" character varying(50) NOT NULL, "numero" character varying(7) NOT NULL, "bairro" character varying(128) NOT NULL, "complemento" character varying(100), "usuarioId" uuid NOT NULL, CONSTRAINT "REL_3fda1857bc40b2c12b9562101a" UNIQUE ("usuarioId"), CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jogos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(128) NOT NULL, "descricao_jogo" character varying(256) NOT NULL, "valor" numeric(8,2) NOT NULL, "dono" character varying(128) NOT NULL, "estado" character varying(128) NOT NULL, "disponivel" boolean NOT NULL, CONSTRAINT "PK_7312a4a154694e761783f910223" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "jogos_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pedidoId" integer NOT NULL, "jogoId" uuid NOT NULL, CONSTRAINT "PK_4014c75b78e4db2b92873e866f9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "carrinhos" ADD CONSTRAINT "FK_ff45b69dce2f1ce3032c0a41f89" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD CONSTRAINT "FK_67b988fbaed54045427c28e7075" FOREIGN KEY ("carrinhoId") REFERENCES "carrinhos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "consoles_pedidos" ADD CONSTRAINT "FK_6444119288a664860769cc0e608" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "consoles_pedidos" ADD CONSTRAINT "FK_b607b2da3a457eb96147d0efe6a" FOREIGN KEY ("consoleId") REFERENCES "consoles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "enderecos" ADD CONSTRAINT "FK_3fda1857bc40b2c12b9562101ac" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jogos_pedidos" ADD CONSTRAINT "FK_0d84e7fa7797547043cc66c1a86" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "jogos_pedidos" ADD CONSTRAINT "FK_66f0e0ea1578c67606f2f1dd1c5" FOREIGN KEY ("jogoId") REFERENCES "jogos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jogos_pedidos" DROP CONSTRAINT "FK_66f0e0ea1578c67606f2f1dd1c5"`
    );
    await queryRunner.query(
      `ALTER TABLE "jogos_pedidos" DROP CONSTRAINT "FK_0d84e7fa7797547043cc66c1a86"`
    );
    await queryRunner.query(
      `ALTER TABLE "enderecos" DROP CONSTRAINT "FK_3fda1857bc40b2c12b9562101ac"`
    );
    await queryRunner.query(
      `ALTER TABLE "consoles_pedidos" DROP CONSTRAINT "FK_b607b2da3a457eb96147d0efe6a"`
    );
    await queryRunner.query(
      `ALTER TABLE "consoles_pedidos" DROP CONSTRAINT "FK_6444119288a664860769cc0e608"`
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" DROP CONSTRAINT "FK_67b988fbaed54045427c28e7075"`
    );
    await queryRunner.query(
      `ALTER TABLE "carrinhos" DROP CONSTRAINT "FK_ff45b69dce2f1ce3032c0a41f89"`
    );
    await queryRunner.query(`DROP TABLE "jogos_pedidos"`);
    await queryRunner.query(`DROP TABLE "jogos"`);
    await queryRunner.query(`DROP TABLE "enderecos"`);
    await queryRunner.query(`DROP TABLE "consoles_pedidos"`);
    await queryRunner.query(`DROP TABLE "consoles"`);
    await queryRunner.query(`DROP TABLE "pedidos"`);
    await queryRunner.query(`DROP TABLE "carrinhos"`);
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }
}
