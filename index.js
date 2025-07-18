import express from "express";
import "dotenv/config";
import cors from "cors";
import wishRoute from "./Routes/wishRoute.js";

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/wishes", wishRoute);

app.get("/", (_req, res) => res.send("Welcome to the union api"));

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
