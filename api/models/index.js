const Users = require("./Users");
const Favoritos = require("./Favoritos");

Favoritos.belongsTo(Users);
Users.hasMany(Favoritos);

module.exports = { Users, Favoritos };
