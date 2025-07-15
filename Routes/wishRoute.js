import express from "express";
import initknex from "knex";
import configuration from "../knexfile.js";
import { check, validationResult } from "express-validator";

const knex = initknex(configuration);
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const wishes = await knex("wishes")
      .select("id", "name", "message", "gif_url", "created_at")
      .orderBy("created_at", "desc");

    res.status(200).json(wishes);
  } catch (error) {
    console.error("error fetching wishes", error);
    res.status(500).json({ message: "error retrieving wishes" });
  }
});

router.post(
  "/",
  [
    check("name").notEmpty().withMessage("name is required"),
    check("message").notEmpty().withMessage("message is required"),
    check("gif_url").notEmpty().withMessage("gif is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, message, gif_url } = req.body;

    try {
      const [newWishId] = await knex("wishes").insert({
        name,
        message,
        gif_url,
        likes: 0,
        created_at: new Date().toISOString(),
      });

      const [newWish] = await knex("wishes")
        .select("id", "name", "gif_url", "likes", "created_at")
        .first();

      return res.status(201).json(newWish);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error while saving wish" });
    }
  }
);

export default router;
