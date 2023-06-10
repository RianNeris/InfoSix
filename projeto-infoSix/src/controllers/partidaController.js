var partidaModel = require("../models/partidaModel");

function cadastrarPartida(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idUsuario = req.params.idUsuario;
    var pontuacao = req.body.pontuacaoServer;
    var tempo = req.body.tempoServer;
    
    // Faça as validações dos valores
    if (pontuacao == undefined) {
        res.status(400).send("A pontuacao está undefined!");
    } else if (tempo == undefined) {
        res.status(400).send("O tempo está undefined!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        partidaModel.cadastrarPartida(pontuacao, tempo, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function receberPartidas(req, res) {
    var idUsuario = req.params.idUsuario;

    partidaModel.receberPartidas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarPartidas(req, res) {

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando pardidas`);

    partidaModel.atualizarPartidas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas partidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    cadastrarPartida,
    receberPartidas,
    atualizarPartidas
}