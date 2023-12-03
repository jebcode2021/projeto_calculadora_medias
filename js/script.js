const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="img/aprovado.png" alt="Aprovado" width="30px">';
const imgReprovado = '<img src="img/reprovado.png" alt="Reprovado" width="30px">';
const atividades = [];
const notas = [];
const spanAprovado = "<span class='resultado aprovado'>Aprovado</span>";
const spanReprovado = "<span class='resultado reprovado'>Reprovado</span>";
const notaMinima = parseFloat(prompt('Qual a nota mínima para aprovação?'));

let linhas = '';

form.addEventListener('submit', function (e) {
    e.preventDefault();

    adicionarLinha();
    atualizarTabela();
    atualizarMediaFinal();
});

function adicionarLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    const mensagemJaInserida = `A atividade: ${inputNomeAtividade.value} já foi inserida, por favor insira outra atividade.`;

    if(atividades.includes(inputNomeAtividade.value)){
        const containerMensagem = document.querySelector('.error-message');
        containerMensagem.innerHTML = mensagemJaInserida
        containerMensagem.style.display = 'block';
    }else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
        let linha = "<tr>";
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += "</tr>";
    
        linhas += linha;
        
        const containerMensagem = document.querySelector('.error-message');
        containerMensagem.innerHTML = mensagemJaInserida
        containerMensagem.style.display = 'none';
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizarMediaFinal() {
    const mediaFinal = calcularMediaFinal();
    
    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calcularMediaFinal() {
    let soma = 0;

    for (let i = 0; i < notas.length; i++) {
        soma += notas[i];
    }

    return soma / notas.length;
}