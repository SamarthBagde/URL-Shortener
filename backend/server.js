import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const db_url = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db_url)
  .then((con) => {
    console.log("Database connected successfully.");
  })
  .catch((e) => {
    console.log("Error while connecting to db", e.name, e.message);
  });

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Linstening on Port : localhost:${port}`);
});
