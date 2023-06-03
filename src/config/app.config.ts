import { config } from "dotenv";

config();

export const appConfig = {
  port: Number(process.env.PORT) ?? 3001,
  jwtSecret: process.env.JWT_SECRET ?? "",
};
