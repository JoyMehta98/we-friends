import mongoose from "mongoose";
import app from "./app";
import { appConfig } from "config/app.config";
import { mongodbUrl } from "config/db.config";

(async () =>
  mongoose.connect(mongodbUrl).then(() => {
    console.log("Connected to MongoDB");
    app.listen(appConfig.port, () => {
      console.log(`Listening to port ${appConfig.port}`);
    });
  }))();
