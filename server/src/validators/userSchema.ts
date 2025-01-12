import Joi from "joi";
import createHttpError from "http-errors";

export const registerSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(10)
    .error(createHttpError.BadRequest("Username entered is not correct.")),
  password: Joi.string()
    .min(5)
    .max(100)
    .error(createHttpError.BadRequest("Password entered is not correct.")),
  email: Joi.string()
    .email()
    .error(createHttpError.BadRequest("Email entered is not correct.")),
});
export const loginSchema = Joi.object({
  password: Joi.string()
    .min(5)
    .max(100)
    .error(createHttpError.BadRequest("Password entered is not correct.")),
  email: Joi.string()
    .email()
    .error(createHttpError.BadRequest("Email entered is not correct.")),
});
