const http = require("http");
const fs = require("fs");

const port = 3000;
const hostname = "127.0.0.1"; // localhost

const content = fs.readFileSync("./index.html");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // res.setHeader("Content-Type", "text/html");

  // Retornando um conteúdo html, utilizando res.write
  // res.end("<h1>Hello world!</h1>")

  // Retornando um conteúdo html, utilizando res.write
  // res.write(`
  //   <h1>Hello World!</h1>
  //   <h2>Página de teste</h2>
  //   <br>
  //   <p>Um parágrafo</p>
  // `);
  // res.end();

  res.end(content);
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`);
})