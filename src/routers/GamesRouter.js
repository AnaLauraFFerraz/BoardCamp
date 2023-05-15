import { Router } from "express";
import { createGame, getGames } from "../controllers/GamesController.js";
import { gameValidation } from "../middlewares/GameMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/GameSchema.js";

const gamesRouter = Router()

gamesRouter.get("/games",getGames)
gamesRouter.post("/games",validateSchema(gameSchema),gameValidation,createGame)

export default gamesRouter