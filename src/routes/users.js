const express = require("express");
const asyncHandler = require("express-async-handler");
const validate = require("../middlewares/validate-middleware");
const {
  loginScheme,
  registerScheme,
} = require("../validations/user-validations");
const { login, register } = require("../services/users-service");
const { verifyToken } = require("../middlewares/authenticate-middleware");

const router = express.Router();

router.post(
  "/login",
  validate(loginScheme),
  asyncHandler(async (req, res) => {
    const response = await login(req.body);

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    res.cookie("token", response.token, {
      httpOnly: false,
      sameSite: "none",
      secure: true,
      expires: expirationDate,
    });

    return res
      .status(200)
      .json({ id: response.id, username: response.username });
  })
);

router.post(
  "/register",
  validate(registerScheme),
  asyncHandler(async (req, res) => {
    const response = await register(req.body);

    return res.status(200).json(response);
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    res.clearCookie("token");

    return res.status(200).json();
  })
);

router.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    return res.status(200).json({ id: req.token.userId, status: "ok" });
  })
);

module.exports = router;
