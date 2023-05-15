import { Router } from "express";
import { createRental, deleteRental, listRentals, returnRental } from "../controllers/RentalsController.js";
import { rentalValidation, returnRentalValidation, deleteRentalValidation } from "../middlewares/RentalMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/RentalSchema.js";

const rentalsRouter = Router()

rentalsRouter.get("/rentals",listRentals)
rentalsRouter.post("/rentals",validateSchema(rentalSchema),rentalValidation,createRental)
rentalsRouter.post("/rentals/:id/return",returnRentalValidation,returnRental)
rentalsRouter.delete("/rentals/:id",deleteRentalValidation,deleteRental)

export default rentalsRouter