import Joi from "joi";
import { joiPagination } from "../../joi-pagination";

export default
    Joi.object().keys({
        ...joiPagination
    })