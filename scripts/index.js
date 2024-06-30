import { jogar } from "./ataque.js";
import { abandonar } from "./ataque.js"
import { golpe_fraco_btn } from "./ataque.js";



const Personagem = []
let caixa_coracoes = document.querySelector('.coracoes-hero')

// window.onbeforeunload = function(event) {
//     event.preventDefault();
//     // Mensagem personalizada não funciona em todos os navegadores
//     // Alguns navegadores mostrarão uma mensagem padrão
//     event.returnValue = 'Tem certeza de que deseja recarregar a página?';

// };

function adicionar() {
    const radios = document.querySelectorAll('input[name="g-class"]');
    const atributo = document.querySelectorAll('input[name="atributos-pers"]')
    const Name = document.querySelector('input[id="name"]')
    
    
    Personagem.push(Name.value)
    for (const radio of radios) {
        if (radio.checked) {
            Personagem.push(radio.value)
            break;
        }
    }

    for(const atr of atributo) {
        if (atr.checked) {
            Personagem.push(atr.value)
            break
        }
    }
    console.log(Personagem)

    trocar_tela('.form-newgame', '.home')
    primeira_fase()

}

function primeira_fase() {
    const imagem_hero = document.querySelector('#img-hero')
    const atributo_hero = document.querySelector('#atr-hero')
     

    document.querySelector('.nome-value').innerHTML = Personagem[0]

    if (Personagem[1] == 'guerreiro') {
        imagem_hero.src = '../imgs/personagens/guerreiro.png'
    } else if (Personagem[1] == 'arqueiro') {
        imagem_hero.src = '../imgs/personagens/arqueiro.png'
    } else if (Personagem[1] == 'lenhador') {
        imagem_hero.src = '../imgs/personagens/lenhador.png'
    } else {
        console.log('Deu erro!')
    }

    if (Personagem[2] == 'coracao-extra') {
        atributo_hero.src = '../imgs/icones/coracao.png'
        const novo_elemento = document.createElement('img')
        novo_elemento.setAttribute('src', '../imgs/icones/coracao-extra.png')
        novo_elemento.setAttribute('class', 'coracao-img pagina-1')
        caixa_coracoes.appendChild(novo_elemento)

    } else if (Personagem[2] == 'sorte') {
        atributo_hero.src = '../imgs/icones/sorte.png'
    } else if (Personagem[2] == 'acerto-critico') {
        atributo_hero.src = '../imgs/icones/espada.png'
    } else {
        console.log('Deu erro')
    }
}

function atacar() {
    jogar()
}

function abandonar_partida() {
    abandonar()
}

function trocar1(srcImg) {
    document.getElementById('displayedImage1').src = srcImg
}

function trocar2(srcImg) {
    document.getElementById('displayedImage2').src = srcImg
}

function trocar_tela(sumir, aparecer) {
    const caixa1 = document.querySelector(sumir)
    const caixa2 = document.querySelector(aparecer)

    caixa1.style.display = 'none'
    caixa2.style.display = 'block'
}

function golpe_f() {
    golpe_fraco_btn()
}


window.adicionar = adicionar;
window.trocar1 = trocar1;
window.trocar2 = trocar2;
window.atacar = atacar;
window.abandonar_partida = abandonar_partida;
window.golpe_f = golpe_f

export { Personagem, trocar_tela, caixa_coracoes };
