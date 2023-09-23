import Joi from "joi"

export const joiPagination = {
    pageSize: Joi.number().required().min(1),
    pageIndex: Joi.number().required().min(0)
  };