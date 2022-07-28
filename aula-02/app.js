const express = require('express');
const app = express();
const alunos = require('./alunos.json')

const port = 8081;

app.use(express.json());

// Lista todas as alunas cadastradas
app.get('/alunos', function(req, res){
  // res.type('application/json');
  res.json(alunos);
});

// Retorna apenas uma aluna através do id - /alunos/3fa48176-e014-11ec-9d64-0242ac120004
app.get('/alunos/:id', (req, res) => {
  const id = req.params.id;

  const aluna = alunos.find(aluno => aluno.uuid === id);

  if (!aluna) {
    return res.status(404).json({ errormessage: "Aluna não encontrada." });
  }

  res.json(aluna);
});

// Cadastrar uma aluna
app.post('/alunos', (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    return res.status(404).json({ errormessage: "Aluna não enviada no corpo da requisição." });
  }

  const novaAluna = req.body;

  if (!novaAluna.idade || !novaAluna.username) {
    return res.status(400).json({ errormessage: "Alguns campos obrigatórios não foram enviados." })
  }

  alunos.push(novaAluna);
  res.json(novaAluna)
});

// Exclui uma aluna através do id - /alunos/3fa48176-e014-11ec-9d64-0242ac120004
app.delete('/alunos/:id', (req, res) => {
  const id = req.params.id;

  const index = alunos.findIndex(aluno => aluno.uuid === id);

  if (index === -1) {
    return res.status(404).json({ errormessage: "Aluna não encontrada." });
  }

  alunos.splice(index, 1);

  res.status(200);
  res.json({ successMessage: "Aluna excluída com sucesso!" });
});

app.listen(port, () => {
    console.log(`Server running is ${port}`)
});