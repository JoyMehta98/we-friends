import mongoose from "mongoose";
import app from "./app";
import { appConfig } from "config/app.config";

(async () =>
  mongoose.connect(appConfig.mongodbUrl).then(() => {
    console.log("Connected to MongoDB");
    app.listen(appConfig.port, () => {
      console.log(`Listening to port ${appConfig.port}`);
    });
  }))();
