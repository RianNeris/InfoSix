var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

//Recebendo os dados do game e direcionando para a função cadastrar de partidaController.js
router.post("/cadastrarPartida/:idUsuario", function (req, res) {
    partidaController.cadastrarPartida(req, res);
});

router.get("/receberPartidas/:idUsuario", function (req, res) {
    partidaController.receberPartidas(req, res);
});

router.get("/atualizarPartidas/:idUsuario", function (req, res) {
    partidaController.atualizarPartidas(req, res);
});

module.exports = router;