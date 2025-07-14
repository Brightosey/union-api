import express from "express";
import "dotenv/config";
import cors from "cors";
import initknex from "knex";
import configuration from "./knexfile.js";
import wishRoute from "./Routes/wishRoute.js";

const app = express();
const knex = initknex(configuration);
const { PORT, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("api/wishes", wishRoute);

app.get ("/", (_req, res) => res.send("Welcome to the union api"));

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
