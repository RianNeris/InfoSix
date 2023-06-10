/*
Processo de retorno 
*--------------------------------------------------------------------------------------*
|    1. Model - Retorna a resolução da query do banco de dados.                        |
|    2. Controller - Recebe o return do Model e verifica se deu tudo certo ou não.     |
|    De acordo com o resultado ele define o erro que vai ser retornado ou se vai ser   |
|    retornado o valor que veio de model (Normalmente as tuplas que a query            |
|    modificou/inseriu/selecionou).                                                    |
|    3. Routes - Este só repassa a informação. É como se ela passasse direto por ele.  |
|    Uma vez o res sendo usado no controller; a resposta (res) já é enviada através    |
|    do router também.                                                                 |
|    4. Fetch - A função fetch executa seu trecho "then()", onde a resposta (res)      |
|    é recebida e tradada da forma que o usuário quiser.                               |
*--------------------------------------------------------------------------------------*
*/


var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarPartida(pontuacao, tempo, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarPartida():", pontuacao, tempo, idUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO partida (pontuacao, tempo, fkUsuario) VALUES (${pontuacao}, '${tempo}',${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function receberPartidas(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function receberPartidas():", idUsuario);
    var instrucao = `
        SELECT * FROM partida WHERE fkUsuario = ${idUsuario};
     `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarPartidas(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarPartidas():", idUsuario);
    var instrucao = `
        SELECT idPartida, pontuacao FROM partida WHERE fkUsuario = ${idUsuario};
     `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarPartida,
    receberPartidas,
    atualizarPartidas
};