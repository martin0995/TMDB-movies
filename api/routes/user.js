const express = require("express");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth.js");
const User = require("../models/Users");
const router = express.Router();

// Registrar un usuario nuevo:
router.post("/signup", (req, res) => {
  User.create(req.body).then((user) => {
    res.status(201).send(user);
  });
});

// Iniciar sesion con un usuario ya existente:
router.post("/login", (req, res) => {
  const { userName, password } = req.body;

  User.findOne({ where: { userName } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        userName: user.userName,
        email: user.email,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

// Trae todos los usuarios registrados:
router.get("/all", (req, res, next) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((error) => console.error(error));
});

// Don´t modify this route, keep it at the bottom.
router.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;
