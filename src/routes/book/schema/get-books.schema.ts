import Joi from "joi";

export default
    Joi.object().keys({
        pageSize: Joi.number().required().min(1),
        pageIndex: Joi.number().required().min(0),
        name: Joi.string().optional().min(3).max(500),
        author: Joi.string().optional().min(3).max(500),
        isbn: Joi.string().optional().min(9).max(15)
    })
