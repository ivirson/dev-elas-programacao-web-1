const express = require("express");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("database.db");

const app = express();
const port = 3000;

app.use(express.json())

// Redireciona para a rota /alunas
app.get('/', (req, res) => {
  res.redirect('/alunas')
});

// Lista todas as alunas cadastradas
app.get('/alunas', (req, res) => {
  db.all(`SELECT * FROM alunas`, (err, rows) => {
    if (err) {
      return res.json({ errorMessage: "Houve um erro ao consultar os dados." });
    }

    return res.json(rows)
  })
});

// Retorna apenas uma aluna através do id - /alunas/3fa48176-e014-11ec-9d64-0242ac120004
app.get('/alunas/:id', (req, res) => {
  const id = req.params.id;
  db.get(
    `SELECT * FROM alunas WHERE id = ?`,
    id,
    (err, row) => {
      if(err){
        return res.status(500).json({errorMessage: "Houve um erro ao consultar o dado."});
      }
      if(!row){
        return res.status(404).json({errorMessage: "Aluna não encontrada"});
      }
      return res.json(row)
    }
  );
});

// Cadastrar uma aluna
app.post('/alunas', (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    return res.status(402).json({ errormessage: "Aluna não enviada no corpo da requisição." });
  }

  const { name, idade, username, senha, email } = req.body;

  if (!name || !idade || !username || !senha || !email) {
    return res.status(400).json({ errormessage: "Alguns campos obrigatórios não foram enviados." })
  }

  db.run(
    `INSERT INTO alunas (name, idade, username, senha, email) 
     VALUES (?, ?, ?, ?, ?)`,
    [ name, idade, username, senha, email ],
    (err) => {
      if (err) {
        return res.status(500).json({
          errorMessage: "Erro ao salvar os dados.",
          err: err
        });
      }

      return res.status(201).json({ successMessage: "Aluna salva com sucesso" });
    }
  );
});

// Altera todo o objeto
app.put("/alunas/:id", (req, res) => {
  const idParam = req.params.id;

  const { name, email, senha, idade, username } = req.body;

  if (!name || !email || !senha || !idade || !username) {
    return res.status(402).json({ errormessage: "Alguns campos obrigatórios não foram enviados." });
  }

  db.get(
    `SELECT * FROM alunas WHERE id = ?`, idParam, (err, row) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Houve um erro ao consultar o dado." });
      }

      if (!row) {
        return res.status(404).json({ errormessage: "Aluna não encontrada." });
      }

      db.run(
        `UPDATE alunas SET name = ?, email = ?, senha = ?, idade = ?, username = ?
         WHERE id = ?`,
        [ name, email, senha, idade, username, idParam ],
        (err2) => {
          if (err2) {
            return res.status(500).json({ errorMessage: "Houve um erro ao consultar o dado." });
          }
    
          return res.status(204).send();
        }
      );
    }
  );
});

// Altera apenas as informaçoes passadas
app.patch("/alunas/:id", (req, res) => {
  const idParam = req.params.id;

  db.get(
    `SELECT * FROM alunas WHERE id = ?`, idParam, (err, row) => {
      if(err){
        return res.status(500).json({errorMessage: "Houve um erro ao consultar o dado."});
      }

      if (!row) {
        return res.status(404).json({ errormessage: "Aluna não encontrada." });
      }

      const userToUpdate = { ...row, ...req.body };
      const { name, email, senha, idade, username } = userToUpdate;

      db.run(
        `UPDATE alunas SET name = ?, email = ?, senha = ?, idade = ?, username = ?
         WHERE id = ?`,
        [ name, email, senha, idade, username, idParam ],
        (err2) => {
          if(err2){
            return res.status(500).json({errorMessage: "Houve um erro ao consultar o dado."});
          }
    
          return res.status(204).send()
        }
      );
    }
  )
});

// Exclui uma aluna através do id - /alunas/3fa48176-e014-11ec-9d64-0242ac120004
app.delete('/alunas/:id', (req, res) => {
  
});

// Disponibiliza o servidor, colocando-o em modo de escuta
app.listen(port, () => {
  console.log(`Server running at ${port}`)
})