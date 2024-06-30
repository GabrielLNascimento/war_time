import { trocar_tela, Personagem, caixa_coracoes } from './index.js';

const golpe_fraco = document.querySelector('.golpe-fraco')
const texto_acima = document.getElementById('texto')
const span_vida = document.getElementById('span-vida-inimigo')
const vida_inimigo_hp = parseFloat(span_vida.textContent)
let vida_inimigo_atual = 0
const coracoes_atuais = document.querySelector('.vida-hero-local')
let msg_usuario = document.querySelector('.msg-usuario')
let quem_joga = true


function atacar_inicio() {
    const caixa = document.querySelector('.atacar_container')
    const hero_local = document.querySelector('.img-hero-local')
    const inimigo_local = document.querySelector('.img-inimigo-local')

    trocar_tela('.container_home', '.atacar_container')
    inimigo_local.src = '../imgs/personagens/level-1.png'
    caixa.style.display = 'flex'

  
    
    if (Personagem[1] == 'guerreiro') {
        hero_local.src = '../imgs/personagens/guerreiro.png'
    } else if (Personagem[1] == 'arqueiro') {
        hero_local.src = '../imgs/personagens/arqueiro.png'
    } else if (Personagem[1] == 'lenhador') {
        hero_local.src = '../imgs/personagens/lenhador.png'
    } else {
        console.log('Deu erro!')
    }

    if (Personagem[2] == 'coracao-extra') {
        const novo_elemento = document.createElement('img')
        const caixa_vida = document.querySelector('.vida-hero-local')

        novo_elemento.setAttribute('class', 'coracao-img coracao-ataque')
        novo_elemento.setAttribute('id', 'cora-6')
        novo_elemento.setAttribute('src', '../imgs/icones/coracao-extra.png')
        caixa_vida.appendChild(novo_elemento)
    }
 
}

function jogar() {
    while (true) {
        atacar_inicio()
        
        if(quem_joga && vida_inimigo_hp > 0) {
            jogador()
        } 
        break
    }
}


function jogador() {
    golpe_fraco.style.display = 'block'
    texto_acima.innerHTML = 'Sua vez de Jogar'
}

function golpe_fraco_btn() {
    
    if(vida_inimigo_atual != 100) {

        
        const dano_ataque = roletar()
        if ((dano_ataque%2 == 0) || (dano_ataque%3 == 0)) {
            span_vida.innerHTML -= 10
            vida_inimigo_atual += 10
            
            msg_usuario.innerHTML = 'Voce acertou 10 de dano'
        } else {
            msg_usuario.innerHTML = 'Voce errou o ataque'
            inimigo()
        }
        
    } 

    if (parseFloat(span_vida.textContent) <= 0) {
        msg_usuario.innerHTML = 'Você venceu'
        texto_acima.innerHTML = ' '

        console.log(coracoes_atuais)
    }
   
}

function inimigo() {
    golpe_fraco.style.display = 'none'
    texto_acima.innerHTML = 'Vez do inimigo'
    setTimeout(() => {
    
        const dano_hero = roletar()
        if ((dano_hero%2 == 0) || (dano_hero%3 == 0)) {
            msg_usuario.innerHTML = 'Inimigo errou o ataque'
            tirar_coracao(caixa_coracoes)
            jogador()
           
        } else {
            msg_usuario.innerHTML = 'Inimigo acertou o ataque'
            tirar_coracao(caixa_coracoes)
            jogador()
        }
        

    }, 3000)
}

function abandonar() {
    trocar_tela('.atacar_container', '.container_home')

    // colocar um alert mostrando quantas moedas ele perdeu
}

function roletar() {
    let max = 100
    let min = 0
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroAleatorio
}

function tirar_coracao(caixa_coracoes) {
    let coracoes = document.querySelectorAll('.coracao-ataque');
    let coracoes_principal = document.querySelectorAll('.pagina-1')
    
    
    if (coracoes.length > 0) {
        let ultimoIndice = coracoes.length - 1;
        let ultimoIndice2 = coracoes_principal.length - 1;
        coracoes[ultimoIndice].remove();
        coracoes_principal[ultimoIndice2].remove();

       
        const novo_coracao = document.createElement('img');
        novo_coracao.setAttribute('src', '../imgs/icones/coracao-cinza.png');
        novo_coracao.setAttribute('class', 'coracao-img');
        novo_coracao.setAttribute('id', 'coracao-cinza')
        novo_coracao.setAttribute('alt', 'Coração Extra');
        caixa_coracoes.appendChild(novo_coracao);
        
        const novo_coracao2 = document.createElement('img');
        novo_coracao2.setAttribute('src', '../imgs/icones/coracao-cinza.png');
        novo_coracao2.setAttribute('class', 'coracao-img');
        novo_coracao2.setAttribute('id', 'coracao-cinza')
        novo_coracao2.setAttribute('alt', 'Coração Extra');
        coracoes_atuais.appendChild(novo_coracao2);
        console.log('coracao adicionado')
    } else {
        console.log('Não há corações para remover.');
    }
}






export { abandonar, atacar_inicio, jogador, inimigo, roletar, golpe_fraco_btn, jogar, tirar_coracao, coracoes_atuais }