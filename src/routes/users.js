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
  verifyToken,
  asyncHandler(async (req, res) => {
    return res.status(200).json({ id: req.token.userId, status: "ok" });
  })
);

module.exports = router;
