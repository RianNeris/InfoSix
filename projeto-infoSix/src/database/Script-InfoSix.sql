CREATE DATABASE infoSix;
USE infoSix;

CREATE TABLE usuario (
  idUsuario int PRIMARY KEY AUTO_INCREMENT,
  nome varchar(50),
  email varchar(50),
  senha varchar(50)
);

CREATE TABLE partida (
idPartida INT PRIMARY KEY auto_increment,
pontuacao INT,
tempo VARCHAR(45),
fkUsuario INT,
constraint fk_partida_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario (id));

SHOW TABLES;

SELECT * FROM usuario;
SELECT * FROM partida;

SELECT * FROM partida WHERE fkUsuario = 1;

SELECT MAX(pontuacao) FROM partida WHERE fkUsuario = 2;

SELECT COUNT(idPartida) FROM partida WHERE fkUsuario = 2;