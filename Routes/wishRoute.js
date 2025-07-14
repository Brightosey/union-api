import express from "express";
import initknex from "knex";
import configuration from "../knexfile.js";

const knex = initknex(configuration);
const router = express.Router();