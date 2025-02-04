const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const db_url = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db_url).then((con) => {
  console.log("Database connected!");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Linstening on Port : localhost:${port}`);
});
