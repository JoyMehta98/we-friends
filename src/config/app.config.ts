import { config } from "dotenv";

config();

export const appConfig = {
  mongodbUrl: process.env.MONGODB_URL ?? "mongod://localhost:27017/we-friends",
  port: Number(process.env.PORT) ?? 3001,
  jwtSecret: process.env.JWT_SECRET ?? "",
};
