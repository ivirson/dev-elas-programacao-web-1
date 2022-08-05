const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// Rotas
require("./app.routes")(app);

// Disponibiliza o servidor, colocando-o em modo de escuta
app.listen(port, () => {
  console.log(`Server running at ${port}`)
})