import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { Carrinho } from "./Carrinhos";

@Entity("pedidos")
export class Pedido {
  @PrimaryGeneratedColumn("increment")
  readonly id: string;

  @Column({ type: "varchar"})
  carrinhoId: string;

  @ManyToOne(() => Carrinho, (carrinho) => carrinho.id, {
    eager: true,
  })
  @JoinColumn()
  carrinho: Carrinho[];
}
