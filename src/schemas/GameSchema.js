import joi from "joi";

export const gameSchema = joi.object({
    name: joi.string().not(null).required(),
    image: joi.string().uri(),
    stockTotal: joi.number().greater(0).required(),
    pricePerDay: joi.number().greater(0).required(),
});