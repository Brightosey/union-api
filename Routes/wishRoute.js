import express from "express";
import initknex from "knex";
import configuration from "../knexfile.js";
import { check, validationResult } from "express-validator";

const knex = initknex(configuration);
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const wishes = await knex("wishes")
      .select("id", "name", "message", "gif_url", "created_at")
      .orderBy("created_at", "desc");

    return res.status(200).json(wishes);
  } catch (error) {
    console.error("error fetching wishes", error);
    return res.status(500).json({ message: "error retrieving wishes" });
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, message, gif_url } = req.body;

    try {
      const [newWishId] = await knex("wishes").insert({
        name,
        message,
        gif_url,
        likes: 0,
      });

      const newWish = await knex("wishes")
        .select("id", "name", "gif_url", "likes", "created_at")
        .where({ id: newWishId })
        .first();

      return res.status(201).json(newWish);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error while saving wish" });
    }
  }
);

router.patch("/:id/like", async (req, res) => {
  const { id } = req.params;
  const { liked } = req.body;

  try {
    const existingWish = await knex("wishes").where({ id }).first();

    if (!existingWish) {
      return res.status(404).json({ message: "wish not found" });
    }

    const updatedLikes = liked
      ? existingWish.likes + 1
      : Math.max(existingWish.likes - 1, 0);

    await knex("wishes").where({ id }).update({ likes: updatedLikes });

    const updatedWish = await knex("wishes")
      .select("id", "name", "message", "gif_url", "likes", "created_at")
      .where({ id })
      .first();

    return res.status(200).json(updatedWish);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while updating likes" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const existingWish = await knex("wishes").where({ id }).first();

    if (!existingWish) {
      return res.status(404).json({ message: "wish not found" });
    }

    await knex("wishes").where({ id }).del();

    return res.status(200).json({ message: "wish deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while deleting wish" });
  }
});

export default router;
