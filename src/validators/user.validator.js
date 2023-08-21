import HttpStatus from 'http-status-codes';
import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .regex(/^[A-Z]{1}[a-z]{2,}$/)
      .required(),
    lastName: Joi.string()
      .regex(/^[A-Z]{1}[a-z]{2,}$/)
      .required(),
    emailId: Joi.string()
      .email()
      .regex(
        /^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$/
      )
      .required(),
    passWord: Joi.string()
      .regex(/^[0-9A-Za-z]{7,}[@!#$%^&*]{1,}$/)
      .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    req.validatedBody = value;
    next();
  }
};
