const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const seconds = document.querySelector('.seconds');
const minutes = document.querySelector('.minutes');
const pontos = document.querySelector('.pontos');
const resultado = document.querySelector('.mensagem_resultado');
const divResultado = document.querySelector('.boxResultado');

const agentes = [
'ash',
'caveira',
'frost',
'iq',
'mozzie',
'nomad',
'pulse',
'sledge',
'twitch',
'vigil' , 
];


const criarElemento = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


// recebe as duas cartas que estão viradas
let firstCard = '';
let secondCard = '';
var time = '';

const checarFimDeJogo = () => {
    const cartasDesabilitadas = document.querySelectorAll('.disable-card');

    if(cartasDesabilitadas.length == 20){
        setTimeout(() => {
            clearInterval(this.loop);
            time = `${minutes.innerHTML}:${seconds.innerHTML}`;
            resultado.innerHTML = `Parabéns, ${sessionStorage.NOME_USUARIO}! Seu tempo foi: ${time} e seus pontos foram: ${pontos.innerHTML}`
            divResultado.style.display = "block"
            cadastrarPartida();
            //window.location = "/desempenho.html";
        }, 200)
    }
}


const checarCartas = () => {
    const firstAgent = firstCard.getAttribute('data-agente');
    const secondAgent = secondCard.getAttribute('data-agente');
    const pontuacao = Number(pontos.innerHTML);

    if(firstAgent == secondAgent){
        pontos.innerHTML = pontuacao + 10;
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checarFimDeJogo();
        
    } else {

      setTimeout(() => {

        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
        
        firstCard = '';
        secondCard = '';

      }, 500)
    }
}


const revelarCarta = ({ target }) => {
    
    // para previnir o bug de clicar em uma carta que já está virada.
    if(target.parentNode.className.includes('reveal-card')) {
        return;
    
    }

    if(firstCard == ''){
        
        /*Ao clicar na carta o meu target passa a ser a div front que está na frente,
        porém queremos atingir a carta por completa (card -> front -> back), para isso
        usamos a propriedade .parentNode que retorna o elemento pai da nossa target que é
        a div "card"*/ 
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    
    } else if (secondCard == ''){
        
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        
        checarCartas();
    }
}

const criarCarta = (agente) => {

    const card = criarElemento('div', 'card');
    const front = criarElemento('div', 'face front');
    const back = criarElemento('div', 'face back');

    front.style.backgroundImage = `url('assets/image/${agente}.png')`;

    //appendChild = acrescentar div filha
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelarCarta);
    /*setando um novo atributo de indentificação da cartas chamado:
    data-agente, esse atributo data-agente recebe um valor que no nosso caso
    é o nome de cada carta, para termos uma identificação única e
    tambem para fazer a coparação das cartas iguais ou diferentes. */
    card.setAttribute('data-agente', agente);

    return card;
}

const carregarJogo = () => {
    
    // cria uma constante que recebe 2x vezes o valor da minha array inicial.
    const duplicarAgentes = [ ...agentes, ...agentes ];
    
    /* Criando uma constante que recebe minha array de agentes com o método "sort"
    que orderna minha array e retorna o valor da mesma. */
    const embaralharAgentes = duplicarAgentes.sort( () => Math.random() - 0.5 );


    //percorre a lista agentes e cria uma carta para cada agente.
    embaralharAgentes.forEach((agente) => {
        
       const card = criarCarta(agente);
       grid.appendChild(card);
    });
}

const iniciarTempo = () => {
    this.loop = setInterval(() => {
        const tempoAtualSegundos = Number(seconds.innerHTML);
        const tempoAtualMinutos = Number(minutes.innerHTML);

        seconds.innerHTML = `${tempoAtualSegundos + 1}`;

        if(tempoAtualSegundos == 60){
            minutes.innerHTML = `${tempoAtualMinutos + 1}`
            seconds.innerHTML = 0;

        }

    }, 1000);

}

function cadastrarPartida(){
    var idUsuario = sessionStorage.ID_USUARIO;
    
    fetch(`/partida/cadastrarPartida/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/pontuacao.js
            pontuacaoServer: pontos.innerHTML,
            tempoServer: time
        })
            }).then(function (resposta) {
                console.log("Estou dentro do THEN do CadastrarPartida!");

                if (resposta.ok) {
                    console.log(`Dados da partida foram enviados!`);
                } else {
                    throw ("Houve um erro ao tentar enviar os dados da patida!");
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
}

function sumirResultado(){
    divResultado.style.display = "none"
}

window.onload = () => {
    //para capturar o nome do usuario no localStorage e exibir na span
    spanPlayer.innerHTML = sessionStorage.NOME_USUARIO; 
    iniciarTempo();
    carregarJogo();
    sumirResultado(); 
}






