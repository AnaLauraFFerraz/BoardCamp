import { Router } from "express";
import { createCustomer, getCustomerById, getCustomers, updateCustomer } from "../controllers/CustomersController.js";
import { customerValidation, customerIdValidation } from "../middlewares/CustomerMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/CustomerSchema.js";

const customersRouter = Router()

customersRouter.get("/customers",getCustomers)
customersRouter.get("/customers/:id",getCustomerById)
customersRouter.post("/customers",validateSchema(customerSchema),customerValidation,createCustomer)
customersRouter.put("/customers/:id",validateSchema(customerSchema),customerIdValidation,updateCustomer)

export default customersRouter