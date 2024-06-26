const express = require("express");
const asyncHandler = require("express-async-handler");
const validate = require("../middlewares/validate-middleware");
const {
  loginScheme,
  registerScheme,
  refreshTokenScheme,
} = require("../validations/user-validations");
const { login, register, refreshTokens } = require("../services/users-service");
const {
  authenticate,
  authorize,
} = require("../middlewares/authenticate-middleware");

const router = express.Router();

router.post(
  "/login",
  validate(loginScheme),
  asyncHandler(async (req, res) => {
    const response = await login(req.body);

    return res.status(200).json(response);
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

router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    return res.status(200).json({ id: req.token.userId, status: "ok" });
  })
);

router.get(
  "/admin",
  authorize(["admin"]),
  asyncHandler(async (req, res) => {
    return res.status(200).json({ info: "it's admin" });
  })
);

router.post(
  "/refresh-token",
  validate(refreshTokenScheme),
  asyncHandler(async (req, res) => {
    const response = await refreshTokens(req.body.refreshToken);
    return res.status(200).json(response);
  })
);

module.exports = router;
