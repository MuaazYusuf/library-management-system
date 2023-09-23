import Joi from "joi";
import {joiPagination} from "../../joi-pagination";

export default
    Joi.object().keys({
        ...joiPagination,
        name: Joi.string().optional().min(3).max(500),
        author: Joi.string().optional().min(3).max(500),
        isbn: Joi.string().optional().min(9).max(15)
    })
