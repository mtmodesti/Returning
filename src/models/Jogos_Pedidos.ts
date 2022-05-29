import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Jogo } from "./Jogos";
import { Pedido } from "./Pedidos";

@Entity("jogos_pedidos")
export class Jogo_Pedido {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  pedidoId: string;

  @Column()
  jogoId: string;

  @ManyToOne(() => Pedido, (pedido_id) => pedido_id.id, {
    eager: true,
  })
  @JoinColumn()
  pedido: Pedido;

  @ManyToOne(() => Jogo, (jogo_id) => jogo_id.id, {
    eager: true,
  })
  @JoinColumn()
  jogo: Jogo;
}
