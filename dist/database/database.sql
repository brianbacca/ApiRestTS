CREATE DATABASE firstApiTS;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(40),
  email TEXT 
);

INSERT INTO users (name,email)
VALUES('brian', 'brianbn05@gmail.com'), 
      ('lucas', 'lucas@gmail.com')
