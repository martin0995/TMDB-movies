const Sequelize = require("sequelize");
const db = require("./_db");

class Favoritos extends Sequelize.Model {}

Favoritos.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    movie: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "favorito",
  }
);

module.exports = Favoritos;
