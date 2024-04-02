var url = 'http://127.0.0.1:5000/api/empregados';

function buscarDados() {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados');
        }
        return response.json();
    })
    .then(data => {
        preencherTabela(data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
function preencherTabela(dados) {
    var tabela = document.getElementById('tabela-dados');
    tabela.innerHTML = '';
    dados.forEach(function(item) {
        var row = tabela.insertRow();
        row.innerHTML = '<td>' + item.cargo + '</td>' +
                        '<td>' + item.cpf + '</td>' +
                        '<td>' + item.data_admissao + '</td>' +
                        '<td>' + item.nome + '</td>';
    });
}
window.onload = buscarDados;
