import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import app from "./app.js";
import { connectDB } from "./db/index.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("App not able to interact with DB!!!");
      throw err;
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log(`App running at URL : http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB Connection Failed , ${err}`);
  });
