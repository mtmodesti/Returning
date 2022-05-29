import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 128 })
  nome: string;

  @Column({ type: "varchar", length: 11 })
  cpf: string;

  @Column({ type: "varchar", length: 128 })
  email: string;

  @Column({ type: "integer" })
  telefone: number;

  @Column({ type: "varchar", length: 128 })
  senha: string;

  @Column({ default: "false" })
  pendencia: boolean;
}
