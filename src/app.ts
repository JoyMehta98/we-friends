import express, { Express } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import routes from "./routes";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use("/api", routes);

const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

export default server;
