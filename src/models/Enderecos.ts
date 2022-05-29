import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuarios";

@Entity("enderecos")
export class Endereco {
  @PrimaryGeneratedColumn("increment")
  readonly id: string;

  @Column({ type: "varchar", length: 128 })
  cidade: string;

  @Column({ type: "varchar", length: 2 })
  estado: string;

  @Column({ type: "varchar", length: 9 })
  cep: string;

  @Column({ type: "varchar", length: 50 })
  rua: string;

  @Column({ type: "varchar", length: 7 })
  numero: string;

  @Column({ type: "varchar", length: 128 })
  bairro: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  complemento: string;

  @Column()
  usuarioId: string

  @OneToOne(() => Usuario, (usuario) => usuario.id, {
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario;
}
