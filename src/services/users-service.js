const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const ValidationError = require("../errors/validation-error");

const login = async (values) => {
  const user = await db.User.findOne({
    where: { username: values.username },
  });

  if (!user) {
    throw new ValidationError({ error: "Неверный логин или пароль" });
  }

  if (!(await bcrypt.compare(values.password, user.passwordHash))) {
    throw new ValidationError({ error: "Неверный логин или пароль" });
  }

  const accessToken = jwt.sign(
    { userId: user.id, role: "user" },
    process.env.SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );

  return {
    id: user.id,
    username: values.username,
    token: accessToken,
  };
};

const register = async (values) => {
  const user = await db.User.findOne({
    where: { username: values.username },
  });

  if (user) {
    throw new ValidationError({ error: "Пользователь уже существует" });
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  const newUser = await db.User.create({
    username: values.username,
    passwordHash: hashedPassword,
  });

  return {
    id: newUser.id,
    username: newUser.username,
  };
};

module.exports = {
  login,
  register,
};
