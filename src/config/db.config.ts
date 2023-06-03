import { config } from "dotenv";

config();

const dbConfig = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DATABASE_NAME,
};

export const mongodbUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
