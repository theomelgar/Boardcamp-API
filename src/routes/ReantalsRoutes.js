import { Router } from "express"
import { addRental, findRentals } from "../controllers/rentals.controllers.js"
import { validateSchema } from "../middleware/validateSchemas.middleware.js"
import { rentalSchema } from "../schemas/rental.schema.js"

const rentalsRouter = Router()

rentalsRouter.get("/", findRentals)
rentalsRouter.post("/", validateSchema(rentalSchema), addRental)

export default rentalsRouter