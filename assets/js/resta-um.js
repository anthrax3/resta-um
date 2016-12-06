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

function play(old, move) {
     var x, 
         y,
         // retorna todos os elementos com a classe ball
         balls = document.getElementsByClassName('ball'),
         resta = document.getElementById('resta'),
         // posições validas para movimento
         posicoes = [
                  [ 3, 4, 5],
                  [ 10,11,12],
             [15,16,17,18,19,20,21],
             [22,23,24,25,26,27,28],
             [29,30,31,32,33,34,35],
                  [38,39,40],
                  [45,46,47]
         ],
         old = old || null,
         move = move || [];
     
     resta.innerHTML = balls.length;
     if (balls.length == 1) {
         alert('Parabéns você ganhou!');
     } else {
         // percorre todos os elementos
         for (x = 0; x < balls.length; x++) {
             if (balls.hasOwnProperty(x)) {
                 balls[x].onclick = function() {
                    if (this.classList.contains('ball')) {
                       var id = parseInt(this.getAttribute('id'), 10), // recupera o id do elemento clicado
                           linha = parseInt((id-1) / 7, 10), // recupera a linha onde esta a bola
                           idEsquerda = id - 1, // id o elemento da esquerda
                           idDireita = id + 1, // id do elemento da direita
                           idCima = id - 7, // id do elemento de cima
                           idBaixo = id + 7, // id do elemento baixo
                           
                           // variaveis para armazenar o id dos elementos vazios
                           linhaVazio,
                           idEsquerdaVazio,
                           idDireitaVazio,
                           idCimaVazio,
                           idBaixoVazio,
                           mover = [];
                        
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
                                linhaVazio = parseInt((idCimaVazio-1) / 7, 10); // linha do elemento vazio
                                idCimaVazio = posicao(posicoes, linhaVazio, idCimaVazio);
                                console.log(idCimaVazio);
                                elCimaVazio = el(idCimaVazio);
                            }
                            if (elBaixo && elBaixo.classList.contains('ball')) {
                                console.log('baixo');
                                idBaixoVazio = idBaixo + 7;
                                linhaVazio = parseInt((idBaixoVazio-1) / 7, 10); // linha do elemento vazio
                                idBaixoVazio = posicao(posicoes, linhaVazio, idBaixoVazio);
                                console.log(idBaixoVazio);
                                elBaixoVazio = el(idBaixoVazio);
                            }
                            
                            //console.log(elEsquerdaVazio, elDireitaVazio, elCimaVazio, elBaixoVazio);
                            
                            // se o elemento não contem classe esta vazio
                            if (elEsquerdaVazio && elEsquerdaVazio.classList.length == 0) {
                                console.log(elEsquerdaVazio);
                                mover.push({ self: this, elVazio: elEsquerdaVazio, elRemove: elEsquerda }); // adiciona no array para mover
                            }
                            if (elDireitaVazio && elDireitaVazio.classList.length == 0) {
                                console.log(elDireitaVazio);
                                mover.push({ self: this, elVazio: elDireitaVazio, elRemove: elDireita });
                            }
                            if (elCimaVazio && elCimaVazio.classList.length == 0) {
                                console.log(elCimaVazio);
                                mover.push({ self: this, elVazio: elCimaVazio, elRemove: elCima });
                            }
                            if (elBaixoVazio && elBaixoVazio.classList.length == 0) {
                                console.log(elBaixoVazio);
                                mover.push({ self: this, elVazio: elBaixoVazio, elRemove: elBaixo });
                            }
                            
                            if (move.length == 0) {
                                mover = mover;
                            } else {
                                if (id == old) {
                                    for (var i in move) {
                                        move[i].elVazio.className = '';
                                    }
                                    old = null;
                                    move = [];
                                } else {
                                    mover = [];
                                }
                            }
                            // se existir somente um movimento
                            if (mover.length == 1) {
                                mover[0].self.className = '';
                                mover[0].elVazio.className = 'ball';
                                mover[0].elRemove.className = '';
                                play(); // executa novamento para os elementos vazios que passaram para ball
                                
                            // se existir mais de um movimento
                            } else if (mover.length > 1) {
                                for (var i in mover) {
                                    mover[i].elVazio.className += ' move';
                                }
                                
                                play(id, mover); // executa novamento para os elementos vazios que passaram para ball
                            }
                    }
                };
             }
         }
     }
     
     /**
      * Evento das bolas amarelas
      * quando clicado move para a direção correspondente
      */
     var movido = false;
     for (x = 0; x < move.length; x++) {
        if (move.hasOwnProperty(x)) {
            move[x].elVazio.onclick = function() {
                if (this.classList.contains('move')) {
                    var id = parseInt(this.getAttribute('id'), 10); // recupera o id do elemento clicado
                    for (y = 0; y < move.length; y++) {
                        if (move.hasOwnProperty(y)) {
                            if (move[y].elVazio.id == id) {
                                move[y].self.className = '';
                                move[y].elVazio.className = 'ball';
                                move[y].elRemove.className = '';
                                movido = true;
                            } else {
                                move[y].elVazio.className = '';
                            }
                        }
                    }
                    // reseta variável que controla os movimentos das bolas amarelas
                    if (movido) {
                        play([]);
                    }
                }
            }
         }
     }
};

var buttonPlay = document.getElementById('play');
buttonPlay.onclick = function() {
  play();  
};

var buttonReset = document.getElementById('reset');
buttonReset.onclick = function() {
    window.location.reload();
};