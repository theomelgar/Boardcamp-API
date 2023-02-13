import { Router } from "express"
import { addRental, deleteRental, findRentals, finishRental } from "../controllers/rentals.controllers.js"
import { validateSchema } from "../middleware/validateSchemas.middleware.js"
import { rentalSchema } from "../schemas/rental.schema.js"

const rentalsRouter = Router()

rentalsRouter.get("/", findRentals)
rentalsRouter.post("/", validateSchema(rentalSchema), addRental)
rentalsRouter.post("/:id/return", finishRental)
rentalsRouter.delete("/:id", deleteRental)

export default rentalsRouter