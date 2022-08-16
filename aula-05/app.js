require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3");
const jwt = require("jsonwebtoken");

const db = new sqlite3.Database("database.db");

const app = express();
const port = 3000;

app.use(express.json());

// Middleware
const checkToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      errorMessage: "Houve um erro ao tentar autenticar na aplicação",
    });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).json({ errorMessage: "Token inválido!", error });
  }
};

// Middleware
const checkTokenCookie = (req, res, next) => {
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).json({
      errorMessage: "Houve um erro ao tentar autenticar na aplicação",
    });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).json({ errorMessage: "Token inválido!", error });
  }
};

// Login
app.post("/login", (req, res) => {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res
      .status(404)
      .json({ errorMessage: "Usuário e senha são campos obrigatórios" });
  }

  db.get("SELECT * FROM alunas WHERE username = ?", username, (err, aluna) => {
    if (err) {
      return res
        .status(500)
        .json({ errorMessage: "Houve um erro ao consultar os dados" });
    }

    if (!aluna) {
      return res.status(404).json({ errorMessage: "Usuário não encontrado" });
    }

    if (aluna.senha !== senha) {
      return res.status(401).json({ errorMessage: "Senha incorreta" });
    }

    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: aluna.id,
        name: aluna.name,
      },
      secret
    );

    res.cookie("user_token", token);

    return res
      .status(200)
      .json({ successMessage: "Usuário autenticado com sucesso", token });
  });
});

// Redireciona para a rota /alunas
app.get("/", (req, res) => {
  res.redirect("/alunas");
});

// Lista todas as alunas cadastradas
app.get("/alunas", checkToken, (req, res) => {
  db.all(`SELECT * FROM alunas`, (err, rows) => {
    if (err) {
      return res.json({ errorMessage: "Houve um erro ao consultar os dados." });
    }

    return res.json(rows);
  });
});

// Retorna apenas uma aluna através do id - /alunas/3fa48176-e014-11ec-9d64-0242ac120004
app.get("/alunas/:id", checkTokenCookie, (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM alunas WHERE id = ?`, id, (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ errorMessage: "Houve um erro ao consultar o dado." });
    }
    if (!row) {
      return res.status(404).json({ errorMessage: "Aluna não encontrada" });
    }
    return res.json(row);
  });
});

// Cadastrar uma aluna
app.post("/alunas", (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    return res
      .status(402)
      .json({ errormessage: "Aluna não enviada no corpo da requisição." });
  }

  const { name, idade, username, senha, email } = req.body;

  if (!name || !idade || !username || !senha || !email) {
    return res
      .status(400)
      .json({ errormessage: "Alguns campos obrigatórios não foram enviados." });
  }

  db.run(
    `INSERT INTO alunas (name, idade, username, senha, email) 
     VALUES (?, ?, ?, ?, ?)`,
    [name, idade, username, senha, email],
    (err) => {
      if (err) {
        return res.status(500).json({
          errorMessage: "Erro ao salvar os dados.",
          err: err,
        });
      }

      return res
        .status(201)
        .json({ successMessage: "Aluna salva com sucesso" });
    }
  );
});

// Altera todo o objeto
app.put("/alunas/:id", (req, res) => {
  const idParam = req.params.id;

  const { name, email, senha, idade, username } = req.body;

  if (!name || !email || !senha || !idade || !username) {
    return res
      .status(402)
      .json({ errormessage: "Alguns campos obrigatórios não foram enviados." });
  }

  db.get(`SELECT * FROM alunas WHERE id = ?`, idParam, (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ errorMessage: "Houve um erro ao consultar o dado." });
    }

    if (!row) {
      return res.status(404).json({ errormessage: "Aluna não encontrada." });
    }

    db.run(
      `UPDATE alunas SET name = ?, email = ?, senha = ?, idade = ?, username = ?
         WHERE id = ?`,
      [name, email, senha, idade, username, idParam],
      (err2) => {
        if (err2) {
          return res
            .status(500)
            .json({ errorMessage: "Houve um erro ao consultar o dado." });
        }

        return res.status(204).send();
      }
    );
  });
});

// Altera apenas as informaçoes passadas
app.patch("/alunas/:id", (req, res) => {
  const idParam = req.params.id;

  db.get(`SELECT * FROM alunas WHERE id = ?`, idParam, (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ errorMessage: "Houve um erro ao consultar o dado." });
    }

    if (!row) {
      return res.status(404).json({ errormessage: "Aluna não encontrada." });
    }

    const userToUpdate = { ...row, ...req.body };
    const { name, email, senha, idade, username } = userToUpdate;

    db.run(
      `UPDATE alunas SET name = ?, email = ?, senha = ?, idade = ?, username = ?
         WHERE id = ?`,
      [name, email, senha, idade, username, idParam],
      (err2) => {
        if (err2) {
          return res
            .status(500)
            .json({ errorMessage: "Houve um erro ao consultar o dado." });
        }

        return res.status(204).send();
      }
    );
  });
});

// Exclui uma aluna através do id - /alunas/3fa48176-e014-11ec-9d64-0242ac120004
app.delete("/alunas/:id", (req, res) => {});

// Disponibiliza o servidor, colocando-o em modo de escuta
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
