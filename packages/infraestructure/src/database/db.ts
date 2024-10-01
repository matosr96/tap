import { DataSource } from "typeorm";
import { TransactionSchema, UserSchema } from "@tap/entities";
import dotenv from "dotenv";

dotenv.config();

const { HOST, PORT, USERNAME, PASSWORD, DATABASE } = process.env;

export const db = new DataSource({
  type: "postgres",
  host: HOST,
  port: 5432,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  ssl: true,
  logging: false,
  entities: [UserSchema, TransactionSchema],
});
