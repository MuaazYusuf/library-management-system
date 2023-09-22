import Joi from "joi";
import { ShelfLocation } from "../../../data/enums";

export default
    Joi.object().keys({
        name: Joi.string().required().min(3).max(500),
        author: Joi.string().required().min(3).max(500),
        isbn: Joi.string().required().min(9).max(15),
        quantity: Joi.number().required().min(0).max(15),
        shelfLocation: Joi.string().valid(...Object.values(ShelfLocation))
    })
