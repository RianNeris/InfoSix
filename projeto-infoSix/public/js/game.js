const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');

const timer = document.querySelector('.timer');

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

const checarFimDeJogo = () => {
    const cartasDesabilitadas = document.querySelectorAll('.disable-card');

    if(cartasDesabilitadas.length == 20){
        setTimeout(() => {
            clearInterval(this.loop);
            alert(`Parabéns, ${sessionStorage.NOME_USUARIO}! Seu tempo foi: ${timer.innerHTML}`)
            //window.location = "/desempenho.html";
        }, 200)
    }
}

const checarCartas = () => {
    const firstAgent = firstCard.getAttribute('data-agente');
    const secondAgent = secondCard.getAttribute('data-agente');

    if(firstAgent == secondAgent){

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
        const tempoAtual = Number(timer.innerHTML);
        const min = 0;

        timer.innerHTML = `${tempoAtual + 1}`;

               
        if(tempoAtual == 60){
            min++
            tempoAtual = 0;

            timer.innerHTML = `${min} : ${tempoAtual}`

        }

    }, 1000);

}

window.onload = () => {
    //para capturar o nome do usuario no localStorage e exibir na span
    spanPlayer.innerHTML = sessionStorage.NOME_USUARIO;    
    iniciarTempo();
    carregarJogo();
}






