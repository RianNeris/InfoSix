CREATE DATABASE infoSix;
USE infoSix;

CREATE TABLE usuario (
  idUsuario int PRIMARY KEY AUTO_INCREMENT,
  nome varchar(50),
  email varchar(50),
  senha varchar(50)
);

INSERT INTO usuario VALUES 
('Rian Neris','rian@gmail.com','12345678');


CREATE TABLE partida (
idPartida INT PRIMARY KEY auto_increment,
pontuacao INT,
tempo VARCHAR(45),
fkUsuario INT,
constraint fk_partida_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario));

INSERT INTO partida VALUES 
(null,35,'2:10',1),
(null,45,'1:80',1),
(null,55,'1:60',1),
(null,85,'1:10',1),
(null,95,'00:50',1);

SHOW TABLES;

SELECT * FROM usuario;
SELECT * FROM partida;

SELECT * FROM partida WHERE fkUsuario = 1;

SELECT MAX(pontuacao) FROM partida WHERE fkUsuario = 2;

SELECT COUNT(idPartida) FROM partida WHERE fkUsuario = 2;