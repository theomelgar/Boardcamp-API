import { Router } from "express"
import { findRentals } from "../controllers/rentals.controllers.js"
import { validateSchema } from "../middleware/validateSchemas.middleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", findRentals)
rentalsRouter.post("/rentals", validateSchema(addRentalschema), addGame)

export default rentalsRouter