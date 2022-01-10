$("#gera-frase").on("click", geraFraseAleatoria)
$("#escolhe-frase").on("click", geraFraseEscolhida)

function geraFraseAleatoria(){
    $(".erro").hide()
    $(".spinner").show()

    $.get("http://localhost:3000/frases", function(data){
        var random = Math.floor(Math.random() * data.length)
        $(".paragrafo").text(data[random].texto)
        contaPalavrasParagrafo()
        atualizaTempoInicial(data[random].tempo)
    }).fail(function(){
        $(".erro").show()
        setTimeout(function(){
            $(".erro").hide()
        }, 3000)
    }).always(function(){
        $(".spinner").hide()
    })
}

function geraFraseEscolhida(){
    $(".erro").hide()
    $(".spinner").show()

    var idFrase = $("#id-frase").val()
    var dados={ id: idFrase }
    $.get("http://localhost:3000/frases", dados, function(data){ 
        $(".paragrafo").text(data.texto)
        contaPalavrasParagrafo()
        atualizaTempoInicial(data.tempo)
    }).fail(function(){
        $(".erro").show()
        setTimeout(function(){
            $(".erro").hide()
        }, 3000)
    }).always(function(){
        $(".spinner").hide()
    })
}
