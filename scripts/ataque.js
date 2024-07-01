import { trocar_tela, Personagem, caixa_coracoes } from './index.js';

const golpe_fraco = document.querySelector('.golpe-fraco')
const texto_acima = document.getElementById('texto')
const span_vida = document.getElementById('span-vida-inimigo')
let vida_inimigo_hp = parseFloat(span_vida.textContent)
let vida_inimigo_atual = 0
const coracoes_atuais = document.querySelector('.vida-hero-local')
let msg_usuario = document.querySelector('.msg-usuario')
let quem_joga = true
let first_atack = 0
let vitoria = false


function atacar_inicio() {
    const caixa = document.querySelector('.atacar_container')
    const hero_local = document.querySelector('.img-hero-local')
    const inimigo_local = document.querySelector('.img-inimigo-local')

    trocar_tela('.container_home', '.atacar_container')
    
    inimigo_local.src = '../imgs/personagens/level-1.png'
    caixa.style.display = 'flex'
    span_vida.innerHTML = '100'
    vida_inimigo_hp = 100
    msg_usuario.innerHTML = ''
    vida_inimigo_atual = 0
  
    
    if (Personagem[1] == 'guerreiro') {
        hero_local.src = '../imgs/personagens/guerreiro.png'
    } else if (Personagem[1] == 'arqueiro') {
        hero_local.src = '../imgs/personagens/arqueiro.png'
    } else if (Personagem[1] == 'lenhador') {
        hero_local.src = '../imgs/personagens/lenhador.png'
    } else {
        console.log('Deu erro!')
    }

    if (Personagem[2] == 'coracao-extra' && first_atack == 0) {
        const novo_elemento = document.createElement('img')
        const caixa_vida = document.querySelector('.vida-hero-local')

        novo_elemento.setAttribute('class', 'coracao-img coracao-ataque')
        novo_elemento.setAttribute('id', 'cora-6')
        novo_elemento.setAttribute('src', '../imgs/icones/coracao-extra.png')
        caixa_vida.appendChild(novo_elemento)
        first_atack = 1;
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
        golpe_fraco.style.display = 'none'
        vitoria = true
    }
   
}

function inimigo() {
    golpe_fraco.style.display = 'none'
    texto_acima.innerHTML = 'Vez do inimigo'
    setTimeout(() => {
    
        const dano_hero = roletar()
        if ((dano_hero%2 == 0) || (dano_hero%3 == 0)) {
            msg_usuario.innerHTML = 'Inimigo errou o ataque'
            jogador()
           
        } else {
            msg_usuario.innerHTML = 'Inimigo acertou o ataque'
            let tira_cora = tirar_coracao(caixa_coracoes)
            if (tira_cora == true) {
                jogador()
            }
            
        }
        

    }, 2000)
}

function abandonar() {
    if (vitoria) {
        
        trocar_tela('.atacar_container', '.container_home')
    } else {
        trocar_tela('.atacar_container', '.container_home')
        // colocar um alert mostrando quantas moedas ele perdeu
    }
    
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
        return true
    } else {
        console.log('Não há corações para remover.');
        
    }

   
    const coracoes_verificados = verificar_coracoes()
    if (coracoes_verificados == 0) {
        golpe_fraco.style.display = 'none'
        msg_usuario.innerHTML = 'Você perdeu!'
        return false
        // colocar um modo de aparecer na tela que morreu!
        // tirar o botão de atacar e abandonar partida
     
    } 

    
}

function verificar_coracoes() {
    let soma = 0
    let div_coracoes = document.querySelector('.vida-hero-local');
    if (div_coracoes) {
        let coracoes = div_coracoes.children;
        for (let cora of coracoes) {
            if (cora.id != 'coracao-cinza') {
                soma += 1
            }
        }
    } else {
        console.log('Elemento .vida-hero-local não encontrado');
    }

    return soma
}





export { abandonar, atacar_inicio, jogador, inimigo, roletar, golpe_fraco_btn, jogar, tirar_coracao, coracoes_atuais, verificar_coracoes }