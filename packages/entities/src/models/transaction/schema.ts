import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactions")
export class TransactionSchema extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") // Usar UUID si deseas un identificador único más robusto
  id: string;

  @Column()
  senderId: string; // Id del remitente

  @Column()
  recipientId: string; // Id del destinatario

  @Column("decimal", { precision: 10, scale: 2 }) // Usar decimal para representar montos de dinero
  amount: number;

  @Column()
  type: string; // Tipo de transacción, e.g. "transfer"

  @Column({ default: () => "now()" })
  createdAt: Date;
}