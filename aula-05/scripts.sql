DROP TABLE IF EXISTS alunas;

CREATE TABLE alunas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  idade INTEGER,
  username TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  email TEXT NOT NULL
);

SELECT * FROM alunas;

INSERT INTO alunas (name, username, senha, email) 
VALUES ('Carolina', 'carolina', 'carolina@123', 'carolina@email.com');

UPDATE alunas SET idade = 36 WHERE id = 10
