const Joi = require("joi");
const { httpConstant } = require("../constant");

exports.userValidation = (req, res, next) => {
  const { body } = req;
  const validateUser = () => {
    const schema = Joi.object({
      userName: Joi.string().required(),
      age: Joi.number().required(),
      hobbies: Joi.array().items(Joi.string().trim().required()).required(),
    });
    return schema;
  };
  const { error } = validateUser().validate(body);
  if (error) {
    return res.status(httpConstant.BAD_REQUEST).json({
      statusCode: httpConstant.BAD_REQUEST,
      message: error.details[0].message.replace(/[^\w\s]/gi, ""),
    });
  } else {
    next();
  }
};
