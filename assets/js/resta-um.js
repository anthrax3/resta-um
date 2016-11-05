/*!
 * Script do Jogo Resta Um
 *
 * @author Diego Ribeiro []
 * @author Ramon Barros [contato@ramon-barros.com]
 * @date   2016-11-04
 * Copyright (c) 2016 Diego Ribeiro & Ramon Barros
 */
 
// ..000.. linha 1 -  1  2  3  4  5  6  7
// ..000.. linha 2 -  8  9 10 11 12 13 14
// 0000000 linha 3 - 15 16 17 18 19 20 21
// 000.000 linha 4 - 22 23 24 25 26 27 28
// 0000000 linha 5 - 29 30 31 32 33 34 35
// ..000.. linha 6 - 36 37 38 39 40 41 42
// ..000.. linha 7 - 43 44 45 46 47 48 49

/**
 * Recupera o id ou -1 referente a linha
 */
function posicao(posicoes, linha, id) {
    return posicoes[linha] && posicoes[linha].indexOf(id) != -1 ? id : -1;
}

/**
 * Recupera o elemento referente ao id
 */
function el(id) {
    return id > -1 || id < 50 ? document.getElementById(id) : null;
}

function play() {
     var x,
         // retorna todos os elementos com a classe ball
         balls = document.getElementsByClassName('ball'),
         // posições validas para movimento
         posicoes = [
                  [ 3, 4, 5],
                  [ 10,11,12],
             [15,16,17,18,19,20,21],
             [22,23,24,25,26,27,28],
             [29,30,31,32,33,34,35],
                  [38,39,40],
                  [45,46,47]
         ];;
     
     // percorre todos os elementos
     for (x = 0; x < balls.length; x++) {
         if (balls.hasOwnProperty(x)) {
             balls[x].onclick = function() {
               var id = parseInt(this.getAttribute('id')), // recupera o id do elemento clicado
                   linha = parseInt((id-1) / 7), // recupera a linha onde esta a bola
                   idEsquerda = id - 1, // id o elemento da esquerda
                   idDireita = id + 1, // id do elemento da direita
                   idCima = id - 7, // id do elemento de cima
                   idBaixo = id + 7, // id do elemento baixo
                   
                   // variaveis para armazenar o id dos elementos vazios
                   linhaVazio,
                   idEsquerdaVazio,
                   idDireitaVazio,
                   idCimaVazio,
                   idBaixoVazio;
                
                // quando é esquerda ou direita tem uma situação
                // o elemento a esquerda do 8 não pode ser o 7
                // por isto é necessário validar os ids da linha correspondente
                idEsquerda = posicao(posicoes, linha, idEsquerda);
                idDireita = posicao(posicoes, linha, idDireita);
                
                console.log(
                    'elemento:'+id,
                    'linha:'+linha,
                    'esquerda:'+idEsquerda,
                    'direita:'+idDireita,
                    'cima:'+idCima,
                    'baixo:'+idBaixo
                );
                
                // armazena e verifica os elementos que estão a esquerda, direita, cima e baixo
                // do elemento clicado não podendo ser vazio e o mesmo ser menor que 0 e maior que 49
                var elEsquerda = el(idEsquerda),
                    elDireita = el(idDireita),
                    elCima = el(idCima),
                    elBaixo = el(idBaixo),
                    
                    // variaveis para armazenar as posições vazias
                    elEsquerdaVazio,
                    elDireitaVazio,
                    elCimaVazio,
                    elBaixoVazio,
                    mover = [],
                    elRemove;
                    
                    // se existe um elemento proximo é possível pular
                    // agora verifica se existe um espaço vazio
                    if (elEsquerda && elEsquerda.classList.contains('ball')) {
                        console.log('esquerda');
                        idEsquerdaVazio = idEsquerda - 1; // id anterior do el. da esquerda
                        idEsquerdaVazio = posicao(posicoes, linha, idEsquerdaVazio); // posição valida do id
                        console.log(idEsquerdaVazio);
                        elEsquerdaVazio = el(idEsquerdaVazio); // el. vazio
                    }
                    if (elDireita && elDireita.classList.contains('ball')) {
                        console.log('direita');
                        idDireitaVazio = idDireita + 1;
                        idDireitaVazio = posicao(posicoes, linha, idDireitaVazio); 
                        console.log(idDireitaVazio);
                        elDireitaVazio = el(idDireitaVazio);
                    }
                    if (elCima && elCima.classList.contains('ball')) {
                        console.log('cima');
                        idCimaVazio = idCima - 7;
                        linhaVazio = parseInt((idCimaVazio-1) / 7); // linha do elemento vazio
                        idCimaVazio = posicao(posicoes, linhaVazio, idCimaVazio);
                        console.log(idCimaVazio);
                        elCimaVazio = el(idCimaVazio);
                    }
                    if (elBaixo && elBaixo.classList.contains('ball')) {
                        console.log('baixo');
                        idBaixoVazio = idBaixo + 7;
                        linhaVazio = parseInt((idBaixoVazio-1) / 7); // linha do elemento vazio
                        idBaixoVazio = posicao(posicoes, linhaVazio, idBaixoVazio);
                        console.log(idBaixoVazio);
                        elBaixoVazio = el(idBaixoVazio);
                    }
                    
                    //console.log(elEsquerdaVazio, elDireitaVazio, elCimaVazio, elBaixoVazio);
                    
                    // se o elemento não contem classe esta vazio
                    if (elEsquerdaVazio && elEsquerdaVazio.classList.length == 0) {
                        console.log(elEsquerdaVazio);
                        mover.push(elEsquerdaVazio); // adiciona no array para mover
                        elRemove = elEsquerda;
                    }
                    if (elDireitaVazio && elDireitaVazio.classList.length == 0) {
                        console.log(elDireitaVazio);
                        mover.push(elDireitaVazio);
                        elRemove = elDireita;
                    }
                    if (elCimaVazio && elCimaVazio.classList.length == 0) {
                        console.log(elCimaVazio);
                        mover.push(elCimaVazio);
                        elRemove = elCima;
                    }
                    if (elBaixoVazio && elBaixoVazio.classList.length == 0) {
                        console.log(elBaixoVazio);
                        mover.push(elBaixoVazio);
                        elRemove = elBaixo;
                    }
                    
                    // se existir somente um movimento
                    if (mover.length == 1) {
                        this.className = '';
                        mover[0].className = 'ball';
                        elRemove.className = '';
                        
                        play(); // executa novamento para os elementos vazios que passaram para ball
                        
                    // se existir mais de um movimento
                    } else if (mover.length > 1) {
                        for (var i in mover) {
                            mover[i].className += ' move';
                        }
                        
                        play(); // executa novamento para os elementos vazios que passaram para ball
                    }
            };
         }
     }
};

// Já esta movendo so elementos com uma posição livre
// Já esta adicionado a class move nos elementos com mais de uma posição livre
// Falta bloquear a ação de click em outros elementos quando tiver elementos com a class move
// Deve detectar o click no elemento move e mover o elemento para esta posição removendo a class
// dos outros campos move, removendo a class ball do elemento entre e adicionar a class ball 
// no elemento a ser movido

play();