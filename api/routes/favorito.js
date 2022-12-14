const express = require("express");
const User = require("../models/Users");
const Favorito = require("../models/Favoritos");
const router = express.Router();

// MUESTRO LAS PELICULAS FAVORITAS:
router.get("/movies/:userName", (req, res, next) => {
  const userName = req.params.userName;

  User.findOne({
    where: { userName },
  })
    .then((user) => {
      const userId = user.dataValues.id;
      Favorito.findAll({
        where: { movie: true, userId },
      }).then((favoritos) => res.status(200).send(favoritos));
    })

    .catch(next);
});

// MUESTRO LOS SERIES FAVORITAS:
router.get("/series/:userName", (req, res, next) => {
  const userName = req.params.userName;

  User.findOne({
    where: { userName },
  })
    .then((user) => {
      const userId = user.dataValues.id;
      Favorito.findAll({
        where: { movie: false, userId },
      }).then((favoritos) => res.status(200).send(favoritos));
    })

    .catch(next);
});

// AGREGO UNA PELI/SERIE A FAVORITOS:
router.post("/", (req, res, next) => {
  const { user, title, imgUrl, movie } = req.body;

  User.findOne({
    where: { userName: user },
  })
    .then((user) => {
      const userId = user.dataValues.id; // este es el id del usuario. Por alguna razon no me toma el maagic method
      const nuevo = { title, imgUrl, movie, userId };

      Favorito.create(nuevo).then((favorito) => res.send(favorito));
    })
    .catch((error) => {
      console.error(error);
    });
});

// ELIMINO UNA PELI/SERIE DE FAVORITOS:
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Favorito.destroy({
    where: { id },
  });
});

// MUESTRO TODOS LOS FAVORITOS DE UN USUARIO EN PARTICULAR:
router.get("/:name", (req, res, next) => {
  const name = req.params.name;

  User.findOne({
    where: { userName: name },
  }).then((user) => {
    const userId = user.dataValues.id;
    console.log(userId);

    Favorito.findAll({
      where: { userId },
    })
      .then((favoritos) => res.send(favoritos))
      .catch((err) => console.error(err));
  });
});

module.exports = router;
