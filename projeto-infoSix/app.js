process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/index", indexRouter);
app.use("/usuarios", usuarioRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando :) Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});

/*Processo para Implementar funcionalidade na API

Criar funções e exportá-las no final do arquivo (fetch, routes, controller, model)

Crie funções com nomes pensados no objetivo que você precisa atingir, dessa forma você não se perde no meio do caminho.
Tente sempre copiar ou imitar o código que já funciona e só adaptar ao seu propósito (Ctrl+C - Ctrl+V e um pouco de criatividade).
Tenha em mente que oque vai ser retornado de Model vai ser uma vetor ( [] ) com as tuplas dentro em forma de JSON separadas por virgulas (as famosas posições). 
por exemplo um retorno cheio de tuplas seria algo como [ {nome: "yan1"} , {nome: "yan2"},{nome: "yan3"},{nome: "yan4"},{nome: "yan5"}] e para acessar o valor yan3 
é preciso fazer [2].nome e supondo que variavel se chame row. seria assim: row[2].nome ("yan3"). Num sistema de login, o certo é retornar uma tupla só, ou 
seja row[0] != undefined. Se a posição 0 não tiver valor quer dizer que os dados informados não bateram com nenhuma tupla da tabela, e se houver mais posições que 1 (row.length > 1) 
quer dizer que há masi de um registro com aquela informação (mesmo email e senha pra mais de um cadastro).
Tenha certeza que seu fetch está puxando o endereço certo e que as configurações estejam definidas corretamente, no caso a configuração é o segundo parâmetro da função, vou deixar aqui de exemplo:

Este é para o método POST (Aquele em que você informa algum dado ao servidor)
{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               **aqui vai seu json***
            })
        }

Este é para o método GET (Aquele onde você só solicita dados do servidor, NÃO PODE ter body)
{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }

É PRIMORDIAL/ESSENCIAL/DEVIDO/OBRIGATÓRIO que seu router esteja defindo para o método certo, para post: router.post(a,b) e para get: router.get(a,b)*/
