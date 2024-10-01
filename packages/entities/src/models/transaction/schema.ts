import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactions")
export class TransactionSchema extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  senderId: string;

  @Column()
  recipientId: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: string;

  @Column({ default: () => "now()" })
  createdAt: Date;
}
