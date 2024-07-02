let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;

exibirMensagemInicial();

// Cria uma função que consegue acessar o tag e o texto do html
function exibirTextoNaTela(tag, texto) {

    // document = acessa o script html | querySelector acessa o tag especificado
    let campo = document.querySelector(tag);
    // innerHTML atribui um valor dentro da variável que está no HTML
    campo.innerHTML = texto;

    // Permite que o texto mostrado na tela seja falado: responsiveVoice(conteúdo a ser dito, língua, velocidade da fala)
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});

}

function verificarChute() {

    // .value resgata o valor inputado na tag input do html
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){

        exibirTextoNaTela('h1', 'Acertou!!');

        if (numeroTentativas == 1){
            exibirTextoNaTela('p', 'Você descobriu o número secreto em ' + numeroTentativas + ' tentativa!');
        }
        else{
            exibirTextoNaTela('p', 'Você descobriu o número secreto em ' + numeroTentativas + ' tentativas!');
        }

        // .getElementById acessa o id (o id especifica o botão que quer acessar) do botão e o .removeAttribute remove o atributo disabled para poder clicar o botão de reiniciar 
        document.getElementById('reiniciar').removeAttribute('disabled');
        
    } else{

        limparCampo();  

        numeroTentativas++;

        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor que: ' + chute);
        }
        else {
            exibirTextoNaTela('p', 'O número secreto é maior que: ' + chute);
        }
    }

}

function gerarNumeroAleatorio() {
    
    let numeroAleatorio = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    // .includes verifica se o conteúdo dentro do parênteses se encontra na lista determinada
    if (listaDeNumerosSorteados.includes(numeroAleatorio)){
        return gerarNumeroAleatorio();
    } else{
        // .push adiciona o conteúdo dentro do parênteses na lista determinada
        listaDeNumerosSorteados.push(numeroAleatorio);
        console.log(listaDeNumerosSorteados);
        return numeroAleatorio;
    }
    
}

function limparCampo(){

// pega o valor da inputado na tag input e atribui uma string vazia para apagar o campo na tela
    document.querySelector('input').value = '';

}

function exibirMensagemInicial(){

    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + numeroLimite);

}

function reiniciarJogo(){

    limparCampo();
    exibirMensagemInicial();

    // .setAttribute seta o atributo disabled de volta ao botão durante a jogatina do usuário
    document.getElementById('reiniciar').setAttribute('disabled', true);

    numeroSecreto = gerarNumeroAleatorio();
    numeroTentativas = 1;

}