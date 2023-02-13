import { Router } from "express"
import { addCustomer, findCustomerId, findCustomers, updateCustomer } from "../controllers/customers.controllers.js"
import { validateSchema } from "../middleware/validateSchemas.middleware.js"
import { customersSchema } from "../schemas/customers.schema.js"

const customersRouter = Router()

customersRouter.get("/", findCustomers)
customersRouter.get("/:id", findCustomerId)
customersRouter.post("/", validateSchema(customersSchema), addCustomer)
customersRouter.put("/:id", validateSchema(customersSchema), updateCustomer)


export default customersRouter