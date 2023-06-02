import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/api", routes);

export default app;
