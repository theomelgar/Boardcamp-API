import { Router } from "express"
import { addGame, findGames } from "../controllers/games.controllers.js"
import { validateSchema } from "../middleware/validateSchemas.middleware.js"
import { addGameSchema } from "../schemas/games.schema.js"

const gamesRouter = Router()

gamesRouter.get("/", findGames)
gamesRouter.post("/", validateSchema(addGameSchema), addGame)

export default gamesRouter