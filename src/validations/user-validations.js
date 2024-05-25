const Joi = require("joi");

const loginScheme = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Имя пользователя обязательно для заполнения",
    "string.min":
      "Имя пользователя должно содержать не менее {#limit} символов",
    "string.empty": "Имя пользователя не может быть пустым",
  }),
  password: Joi.string().min(4).required().messages({
    "any.required": "Пароль обязателен для заполнения",
    "string.min": "Пароль должен содержать не менее {#limit} символов",
    "string.empty": "Пароль не может быть пустым",
  }),
});

const registerScheme = Joi.object({
  username: Joi.string().min(4).required().messages({
    "any.required": "Имя пользователя обязательно для заполнения",
    "string.min":
      "Имя пользователя должно содержать не менее {#limit} символов",
    "string.empty": "Имя пользователя не может быть пустым",
  }),
  password: Joi.string().min(4).required().messages({
    "any.required": "Пароль обязателен для заполнения",
    "string.min": "Пароль должен содержать не менее {#limit} символов",
    "string.empty": "Пароль не может быть пустым",
  }),
});

module.exports = {
  loginScheme,
  registerScheme,
};
