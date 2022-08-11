DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL UNIQUE,
	image TEXT NOT NULL
);

INSERT INTO categories (name, image) VALUES ('Tecnologia', 'tech.jpg');
INSERT INTO categories (name, image) VALUES ('Beleza', 'beleza.jpg');
INSERT INTO categories (name, image) VALUES ('Automóveis', 'auto.jpg');

DROP TABLE IF EXISTS products;

CREATE TABLE products (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL UNIQUE,
  image TEXT NOT NULL,
	price REAL NOT NULL,
	categoryId INTEGER NOT NULL,
	stars INTEGER DEFAULT 1
);

INSERT INTO products (name, image, price, categoryId, stars) 
VALUES ('Iphone 13 Pro Max', 'iphone13promax.jpg', 9299.00, 1, 5);

INSERT INTO products (name, image, price, categoryId, stars) 
VALUES ('Tapete Jeep Renegade', 'tapete.jpg', 789.00, 3, 2);

INSERT INTO products (name, image, price, categoryId, stars) 
VALUES ('Multimidia Jeep Renegade', 'multimidia.jpg', 899.00, 3, 3);

INSERT INTO products (name, image, price, categoryId, stars) 
VALUES ('Redmi 12', 'redmi12.jpg', 2400.00, 1, 4);

INSERT INTO products (name, image, price, categoryId, stars) 
VALUES ('Kit O Boticário', 'kitbeleza.jpg', 455.00, 2, 3);


SELECT * FROM categories;
SELECT * FROM products;

SELECT * FROM products WHERE categoryId = 3;

DELETE FROM products WHERE id = 6;