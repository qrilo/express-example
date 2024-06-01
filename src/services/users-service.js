const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const ValidationError = require("../errors/validation-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const NotFoundError = require("../errors/not-found-error");

const login = async (values) => {
  const user = await db.User.findOne({
    where: { username: values.username },
  });

  if (!user) {
    throw new ValidationError({ error: "Пользователь не найден" });
  }

  if (!(await bcrypt.compare(values.password, user.passwordHash))) {
    throw new ValidationError({ error: "Неверный логин или пароль" });
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  return {
    id: user.id,
    username: values.username,
    token: accessToken,
    refreshToken: refreshToken,
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

const generateTokens = async (user) => {
  const newRefreshToken = await db.RefreshToken.create({ userId: user.id });

  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username, id: newRefreshToken.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

const refreshTokens = async (oldRefreshToken) => {
  try {
    const decoded = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await db.User.findByPk(decoded.userId);

    if (!user) {
      throw new NotFoundError({ error: "User not found" });
    }

    const token = await db.RefreshToken.findByPk(decoded.id);

    if (!token) {
      throw new NotFoundError({ error: "Refresh token not found" });
    }

    await token.destroy();

    const { accessToken, refreshToken } = await generateTokens(user);

    return { token: accessToken, refreshToken: refreshToken };
  } catch (error) {
    throw new UnauthorizedError({ error: "Invalid refresh token" });
  }
};

module.exports = {
  login,
  register,
  refreshTokens,
};
