const express = require("express");
const path = require("path")

const app = express();
const port = 3000;

// Define o template utilizado
app.set("view engine", "ejs");
// Defineo caminho ende estarão as views
app.set("views", path.join(__dirname, "views"));

// Define uma pasta que disponibilizará os arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.get("/", (req, res) => {
  res.render("index", {
    title: "Página inicial",
    links: [
      { href: "/sobre", label: "Sobre a empresa"},
      { href: "/contato", label: "Fale conosco"}
    ]
  });
});

app.get("/sobre", (req, res) => {
  res.render("sobre", {
    title: "Sobre nós",
    links: [
      { href: "/", label: "Página inicial"},
      { href: "/contato", label: "Fale conosco"}
    ]
  });
});

app.get("/contato", (req, res) => {
  res.render("contato", {
    title: "Contato",
    links: [
      { href: "/", label: "Página inicial"},
      { href: "/sobre", label: "Sobre a empresa"}
    ]
  });
});

// Disponibiliza o servidor, colocando-o em modo de escuta
app.listen(port, () => {
  console.log(`Server running at ${port}`)
})