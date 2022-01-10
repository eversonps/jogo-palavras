function adicionaPlacar(){
    var nome = $("#usuarios").val();
    
    var linha = criaLinha(nome, qtdPalavras);
    var corpoTabela = $(".corpo-tabela");
    corpoTabela.prepend(linha);
}

function criaLinha(nome, palavras){
    var linha = $("<tr>");
    var colunaNome = $("<td>").text(nome);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var botao = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    botao.append(icone);

    colunaRemover.append(botao);

    linha.append(colunaNome);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    linha.find(".botao-remover").click(removePlacar);
    return linha;
}

function removePlacar(event){
    event.preventDefault();
    var linhaPlacar = $(this).parent().parent()

    // fadeIn(), fadeOut(), fadeToggle()
    linhaPlacar.fadeOut(600)
    setInterval(function(){
        linhaPlacar.remove()
    }, 600)
}

function mostraTabela(){
    // hide(), show(), toggle()
    // slideUp(), slideDown(), slideToggle()

    $(".section-tabela").stop().slideToggle(600)
}

function sincronizaPlacar(){
    var pontuacoes = []
    var linhas = $("tbody>tr")

    linhas.each(function(){
        var nome = $(this).find("td:nth-child(1)").text()
        var palavras = $(this).find("td:nth-child(2)").text()

        var pontuacao = {
            nomeUser: nome,
            qtdPalavras: palavras            
        }

        pontuacoes.push(pontuacao);
    })

    var dados = {
        placar: pontuacoes
    }

    $.post("http://localhost:3000/placar", dados, function(){
        $("#sincroniza-placar").tooltipster("open").tooltipster("content", "Sucesso ao sincronizar!")
    }).fail(function(){
        $("#sincroniza-placar").tooltipster("open").tooltipster("content", "Erro ao sincronizar!")
    }).always(function(){
        setTimeout(function(){
            $("#sincroniza-placar").tooltipster("close")
        }, 2000)
    })
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            console.log(data)
            console.log($(this).nomeUser)
            var linha = criaLinha(this.nomeUser, this.qtdPalavras)
            $(".corpo-tabela").append(linha)
        })
    })
}

