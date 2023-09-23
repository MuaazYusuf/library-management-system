import Joi from "joi";

export default
    Joi.object().keys({
        name: Joi.string().required().min(3).max(500),
        email: Joi.string().required().email()
    })