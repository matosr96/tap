import { DataSource } from "typeorm";
import { TransactionSchema, UserSchema } from "@tap/entities";

export const db = new DataSource({
  type: "postgres",
  host: "ep-late-tree-a5txrbgx.us-east-2.aws.neon.tech", // host desde la URI
  port: 5432, // el puerto usual de PostgreSQL, puedes extraerlo de la URI si estuviera presente
  username: "tapdb_owner", // nombre de usuario desde la URI
  password: "vQG4B7IWqiDK", // contraseña desde la URI
  database: "tapdb", // nombre de la base de datos desde la URI
  synchronize: true,
  ssl: true, // dado que en la URI se especifica sslmode=require
  logging: false,
  entities: [UserSchema, TransactionSchema],
});
