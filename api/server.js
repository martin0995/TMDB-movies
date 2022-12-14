const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const models = require("./models/index");
const routes = require("./routes");
const db = require("./models/_db");
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api", routes);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto ${PORT}`)
  );
});
