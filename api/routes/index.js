const express = require("express");
const router = express.Router();
const usersRouter = require("./user");
const favoritosRouter = require("./favorito");


router.use("/user", usersRouter);
router.use("/favoritos", favoritosRouter);

module.exports = router;
