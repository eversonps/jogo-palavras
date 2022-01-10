var texto = $(".texto").val();
var tempoInicial = $("#qtsegundos").text();
var paragrafo = $(".paragrafo").text();
var qtdPalavras = texto.split(/\S+/).length - 1;
var corBorda;

function contaPalavrasParagrafo(){
    paragrafo = $(".paragrafo").text();
    qtdPalavrasP = paragrafo.split(" ").length;
    var qtdPalavrasS = $("#qtpalavras");
    qtdPalavrasS.text(qtdPalavrasP);
}

function contaPalavrasCaracteres(){
    texto = $(".texto").val();
    var contPalavras = $("#contpalavras");
    var contCaracteres = $("#contcaracteres");

    qtdPalavras = texto.split(/\S+/).length - 1;
    var qtdCaracteres = texto.replace(/\s+/g,'').length;

    contPalavras.text(qtdPalavras);
    contCaracteres.text(qtdCaracteres);
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo
    $("#qtsegundos").text(tempoInicial)
}

function inicializaCronometro(){
    var cronometro = setInterval(function(){
        texto = $(".texto").val();
        var qtdSegundos = $("#qtsegundos").text();
        qtdSegundos--;
        $("#qtsegundos").text(qtdSegundos);
        if(qtdSegundos < 1){
            console.log("menor q 0")
            finalizaJogo();
            clearInterval(cronometro);
        }
    }, 1000)   
}

function finalizaJogo(){
    $(".texto").addClass("campo-desativado");
    $(".texto").attr("disabled", true);
    $("#reinicia-jogo").attr("disabled", false);
    if(corBorda == "verde"){
        adicionaPlacar();
        $(".section-tabela").slideDown(600)
        scrollPlacar();
    }
}

function scrollPlacar(){
    var posicaoPlacar = $(".section-tabela").offset().top
    console.log(posicaoPlacar+"px")
     
    $("html").animate(
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000)
}

function reinicializaJogo(){
    $(".texto").val("");
    $(".texto").attr("disabled", false);
    $("#contpalavras").text("0");
    $("#contcaracteres").text("0");
    $("#qtsegundos").text(tempoInicial);
    $(".texto").one("focus", inicializaCronometro);
    $(".texto").removeClass("campo-desativado");
    $(".texto").removeClass("campo-errado");
    $(".texto").removeClass("campo-correto");
    $("#reinicia-jogo").attr("disabled", true);
}

function verificaCampo(){
    texto = $(".texto").val();
    // var comparavel = paragrafo.substring(0, texto.length);

    if(paragrafo.startsWith(texto)){
        $(".texto").addClass("campo-correto");
        $(".texto").removeClass("campo-errado");
        corBorda = "verde";
    }
    else{
        $(".texto").addClass("campo-errado");
        $(".texto").removeClass("campo-correto");
        corBorda = "vermelho";
    }
}

$(document).ready(function(){
    atualizaPlacar();
    contaPalavrasParagrafo();
    $(".texto").on("input", contaPalavrasCaracteres);
    $(".texto").on("input", verificaCampo);
    $(".texto").one("focus", inicializaCronometro);
    $("#reinicia-jogo").click(reinicializaJogo);
    $(".botao-remover").click(removePlacar);
    $("#mostra-placar").on("click", mostraTabela)
    $("#sincroniza-placar").on("click", sincronizaPlacar)
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    $("#sincroniza-placar").tooltipster({
        trigger: "custom"
    });
});

