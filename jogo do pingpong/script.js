//Elementos

var vbtIniciar;//Variavel para o botão.
var vbola;//Variavel para a bola.
var vcpu;//Variavel do elemento da cpu.
var vjogador;//Variavel do elemento do jogador.
var vPaineltxtPontos;//Variavel relacionada aos pontos que vão se mostrados dentro do campo pontos.

//Controle de animação

var game,frames;//Variavel para controla a animação para controle do request animation frame.

//Posições

var posBolaX,posBolaY;//Variaveis para controla a posição X da bola, Y também.

var posJogadorX,posJogadorY;//Variavel para controla posição X do jogador e variavel para controlar posição Y do jogador.

var posCpuX,posCpuY;//Variavel para controla posição X da cpu e variavel para controla posição Y da cpu.

//Direção de acordo com a tecla.

var dirJy;//Direção Y do jogador

//Posições iniciais

var posJogIniY=180;//Posição inicial Y do jogador.
var posCpuIniY=180;//Posição inicial Y da cpu.
var posBolaIniX=475;//Posição inicial X da bola.
var posBolaIniY=240;//Posição inicial Y da bola.

//Tamanhos

var campoX=0;//Posição X do campo.
var campoY=0;//Posição Y do campo.
var CampoW=960;//Largura do campo.
var campoH=500;//Altura do campo.
var barraW=20;//Largura da barra.
var barraH=140;//Altura da barra.
var bolaW=20;//Largura da bola.
var bolaH=20;//Altura da bola.

//Direção

var bolaX;//Direção X da bola.
var bolaY;//Direção Y da bola.
var cpuY=0;//Direção inicial de 0 da cpu.

//Velocidade

var velBola;//Velocidade da bola.
var velCpu;//Velocidade da barra da cpu.
var velJogador;//Velocidade da barra do jogador.

//Controle

var pontos=0;//Variavel ligada aos pontos.
var tecla;//Variavel para a tecla.Que vai armazena o código da tecla pressionada que nos vamos utilizar nos nossos eventos keyUp e KeyDown , se eu pressionei seta para cima ou seta para baixo para poder movimentar o jogador.
jogo=false;//Variavel responsavel por mostra se o jogo está rodando ou está parado.


function controlajog(){//Função responsavel pela movimentação e controle do jogador.
    if(jogo){//O jogo está rolando ou sejá está igual a true?
        posJogadorY+=velJogador*dirJy;//Relacionando a movimentação de nossa barra de jogador.
        if(((posJogadorY+barraH)>= campoH)||((posJogadorY)<= 0)){//Controlando para quando ele chega na margem de cima para não passa o quadrante ele é jogado para o contrario. DO mesmo jeito a de baixo.
            posJogadorY+=(velJogador*dirJy)*(-1);//QUando ele chega na margem ele coloca multiplicação por menos 1
        }
        vjogador.style.top=posJogadorY+"px";//COlocando ou associando a posiçã da nossa div com a movimentação e top(subida ou descida), no nosso campo.
    }
}

function controlacpu(){//Função de controlar cpu movimento da barra.Verifica a posição da bola em que direção está indo.
    if(jogo){
        if((posBolaX > (CampoW/2))&&(bolaX>0)){//Se a posição da bola for maior que a metade do campo e se ela estiver indo para a direita.
            //Movimentar CPU
            if(((posBolaY+(bolaH/2))>((posCpuY+(barraH/2)))+velCpu)){
                //Mover para baixo
                if((posCpuY+barraH)<= campoH){
                    posCpuY+=velCpu;
                }
            }else if((posBolaY + (bolaH/2)) < (posCpuY+(barraH/2))-velCpu){
                //Mover para cima
                if(posCpuY >=0 ){
                    posCpuY-=velCpu;
                }
            }
        }else{
            //Posicionar CPU no centro.
            if((posCpuY+(barraH/2)) < (campoH/2)){
                posCpuY+=velCpu;
            }else if ((posCpuY+(barraH/2)) > (campoH/2)){
                posCpuY-=velCpu;
            }
        }
        vcpu.style.top=posCpuY+"px";
    }

}

function controlaBola(){
    //Movimentação da bola

    posBolaX+=velBola*bolaX;
    posBolaY+=velBola*bolaY;

    //COlissão com jogador.
    if(
        (posBolaX <= posJogadorX+barraW)&&
        ((posBolaY+bolaH >= posJogadorY)&&(posBolaY<= posJogadorY+barraH))
        ){
        bolaY=(((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/16);
        bolaX*=-1;
    }
    //Colissão com CPU.
    if(
        (posBolaX >= posCpuX-barraW)&&
        ((posBolaY+bolaH >= posCpuY)&&(posBolaY<= posCpuY+barraH))
        ){
        bolaY=(((posBolaY+(bolaH/2))-(posCpuY+(barraH/2)))/16);
        bolaX*=-1;
    }

    //Limites superior e inferior.Serve para não deixa a bola sair nem para cima nem para baixo.

    if((posBolaY >= 480)||(posBolaY <= 0)){//Controle da questão do retorno da bola nos cantos superiores e inferiores.
        bolaY*=-1;
    }

    //Saiu da tela(fez ponto) pela direita e pela esquerda.
    if(posBolaX >= (CampoW-bolaW)){
        velBola=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        pontos++;
        vPaineltxtPontos.value=pontos;
        jogo=false;
        vjogador.style.top=posJogadorY+"px";
        vcpu.style.top=posCpuY+"px";
    }else if(posBolaX <= 0){
        velBola=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        pontos--;
        vPaineltxtPontos.value=pontos;
        jogo=false;
        vjogador.style.top=posJogadorY+"px";
        vcpu.style.top=posCpuY+"px";
    }
    vbola.style.top=posBolaY+"px";
    vbola.style.left=posBolaX+"px";
}

function teclaDw(){//Função relacionada a tecla de descida(Down), para mover.Comparo os códigos das teclas pressionadas ele execulta uma animação.
    tecla=event.keyCode;//Aramazenando a tecla pressionada.
    if(tecla==38){//Cima , O eixo Y é invertido para subir você subtrai valores.
        dirJy=-1;
    }else if(tecla==40){//Baixo.
        dirJy=+1;
    }

}

function teclaUp(){//Função relacionada para quando ele para de segurar a tecla, parar a animação.
    tecla=event.keyCode;//Aramazenando a tecla pressionada.
    if(tecla==38){//Cima , deslocamento zerado , nem para cima nem para baixo está parado.
        dirJy=0;
    }else if(tecla==40){//Baixo.
        dirJy=0;
    }

}



function game(){//Função responsavel por controla as animações do nosso jogo.
    if(jogo){//Se o jogo estiver rolando(se estiver true), ele vai receber as funções de controle do game.Essa função vai ser chamada repetidamente , nela vai ter os controles do jogador , da bola e da cpu.
        controlajog();
        controlaBola();
        controlacpu();

    }
    frames=requestAnimationFrame(game);//Associando nossa variavel frames para a função requestAnimationFrame.
}


function iniciaJogo(){//Iniciar o game.Associada ao evento de click iniciar.
    if(!jogo){//Se nosso jogo for false , ele vai ativar essa rotina.
    velBola=8;
    velCpu=8;
    velJogador=8
    cancelAnimationFrame(frames);//Cancelando a animação para não chamar mais de uma vez , execultando uma em cima da outra.
    jogo=true;//Colocando nossa variavel jogo para iniciar o jogo inicialmente aqui.
    dirJy=0;//Posição inicializando
    posBolaX=posBolaIniX;//Posição X da nossa bola definida para posição inicial da nossa bola X.
    bolaX=0;
    bolaY=0;//Direção da bola em y.
    if((Math.random()*10)<5){//Colocando de maneira aleatoria a questão do nosso random para meio que selecionar  a area da movimentação da nossa bola.
        bolaX=-1;
    }else{
        bolaX=1;
    }
    posBolaY=posBolaIniY;//Posição Y da nossa bola definida para posição inicial Y da nossa bola.
    posJogadorY=posJogIniY;//Posição X do nosso jogador definida para posJogIniY. Lembrando que só precisaremos da posição Y dessas posições porque nossa barra só se move para cima e para baixo.
    posJogadorX=10;
    posCpuX=930;
    posCpuY=posCpuIniY;//Posição Y da nossa cpu definida para posição inicial da nossa cpu Y.
    game();//Realizando a chamada do nosso controle de animação.
    }
} 

function inicializa(){//Função responsavel por inicializar nossas variaveis.Adiocionar os eventos.
  

    vbtIniciar=document.getElementById("btIniciar");//Atribuindo a variavel vbtIniciar para nosso botaão iniciar.
    vbtIniciar.addEventListener("click",iniciaJogo);//Evento de click para iniciar o jogo quando clickar.
    vjogador=document.getElementById("dvJogador");//Associando nossa variavel com a div dvJogador, barra do jogador.
    vcpu=document.getElementById("dvCpu");//Associando nossa variavel com a dvCpu , barra do cpu.
    vbola=document.getElementById("dvBola");//Associando nossa variavel com a dvBola , a bola do nosso game.
    vPaineltxtPontos=document.getElementById("txtPontos");//Associando nossa variavel com  a div txtPontos , resposanvel por mostra quantos pontos o jogador tem.
    document.addEventListener("keydown",teclaDw);//Colocando a chamada de nossas teclas aqui , ou sejá para quando eu tiver uma tecla pressionada eu acionar o disparador do evento keydown, quando a tecla for pressionada eu chamo a teclaDw.
    document.addEventListener("keyup",teclaUp);//Colocando a chamada de nossas teclas aqui , ou sejá para quando eu não tiver a tecla pressionada eu chamo a minha teclaUp.
    velBola=8;//Velocidade da nossa bola.
    velCpu=8;//Velocidade da nossa Cpu.
    velJogador=8//Velocidade do nosso jogador.
}

window.addEventListener("load",inicializa);