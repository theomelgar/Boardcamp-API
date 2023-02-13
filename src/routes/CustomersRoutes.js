import { Router } from "express"
import { addCustomer, findCustomerId, findCustomers, updateCustomer } from "../controllers/customers.controllers.js"
import { validateSchema } from "../middleware/validateSchemas.middleware.js"
import { customersSchema } from "../schemas/customers.schema.js"

const customersRouter = Router()

customersRouter.get("/customers", findCustomers)
customersRouter.get("/customers/:id", findCustomerId)
customersRouter.post("/customers", validateSchema(customersSchema), addCustomer)
customersRouter.put("/customers/:id", validateSchema(customersSchema), updateCustomer)


export default customersRouter