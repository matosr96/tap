import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserSchema extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: () => "now()" })
  createdAt: Date;

  @Column({ default: () => "now()" })
  updatedAt: Date;

  @Column()
  balance: number;
}
