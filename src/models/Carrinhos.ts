import { Entity, OneToOne, JoinColumn, OneToMany,PrimaryGeneratedColumn, Column } from "typeorm";
import { Usuario } from "./Usuarios";

@Entity("carrinhos")
export class Carrinho {
  @PrimaryGeneratedColumn("increment")
  readonly id: string;

  @Column()
  usuarioId: string

  @OneToOne(() => Usuario, (usuario) => usuario.id, {
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario[];
}
