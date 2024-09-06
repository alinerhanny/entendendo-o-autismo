// Seleciona o elemento HTML com o ID "resultados-pesquisa" para exibir os resultados.
let section = document.getElementById("resultados-pesquisa");
// Seleciona o campo de entrada onde o usuário digita a pesquisa.
let inputPesquisa = document.getElementById("campo-pesquisa");

// Função principal para realizar a pesquisa.
function pesquisar(pesquisa) {
  // Inicializa uma string vazia para armazenar os resultados formatados.
  let resultados = "";
  // Cria uma expressão regular para destacar as palavras encontradas na pesquisa,
  // utilizando flags "g" (global) e "i" (insensibilidade a maiúsculas e minúsculas).
  let regex = new RegExp(`(${pesquisa})`, "gi");

  // Filtra os dados, buscando por aqueles que contenham a palavra pesquisada no título.
  // A busca é feita em letras minúsculas para garantir a comparação correta.
  let dadosFiltrados = dados.filter(dado =>
    dado.titulo.toLowerCase().includes(pesquisa) ||
    dado.titulo.toLocaleLowerCase().includes(pesquisa)
  );

  // Se não houver resultados, exibe uma mensagem.
  if (dadosFiltrados.length === 0) {
    section.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  // Itera sobre os dados filtrados e constrói a HTML para cada resultado.
  for (let dado of dadosFiltrados) {
    // Destaca as palavras encontradas no título e na descrição usando a tag <mark>.
    let tituloDestacado = dado.titulo.replace(regex, "<mark>$1</mark>");
    let descricaoDestacado = dado.descricao.replace(regex, "<mark>$1</mark>");

    // Concatena a HTML de cada resultado na variável 'resultados'.
    resultados += `
      <div class="item-resultado">
        <h2>${tituloDestacado}</h2>
        <p class="descricao"> ${descricaoDestacado}</p>
        <a href="${dado.link}" target="_blank">Mais Informações</a>
      </div> 
    `;
  }

  // Atualiza o conteúdo da seção com os resultados formatados.
  section.innerHTML = resultados;
}

// Adiciona um ouvinte de eventos para o campo de pesquisa,
// acionando a função 'pesquisar' quando a tecla Enter é pressionada.
inputPesquisa.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    pesquisar();
  }
});

// Adiciona um ouvinte de eventos para o campo de pesquisa,
// acionando a função 'pesquisar' a cada digitação do usuário.
document.getElementById("campo-pesquisa").addEventListener("input", function(event){
  let pesquisa = event.target.value.toLowerCase();
  pesquisar(pesquisa);
});

// Adiciona um ouvinte de eventos para o documento inteiro,
// limpando a seção de resultados quando o usuário clica fora do campo de pesquisa ou da seção de resultados.
document.addEventListener("click", function(event) {
  if (!inputPesquisa.contains(event.target) && !section.contains(event.target)) {
    section.innerHTML = ""; 
  }
});