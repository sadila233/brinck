const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRgW0kXB3Pl8F8BxIaFfopm_FA7iomEpsQM8UxV4H25QCKjZSOn9vXxkxuLvndd27eH0sOBdf_JXnq-/pub?gid=0&single=true&output=csv';

const container = document.getElementById('cursos');
const timerEl = document.getElementById('timer');
let countdown = 30;

// Atualiza o contador na tela
function atualizarTimer() {
  countdown--;
  if (countdown <= 0) {
    carregarDados();
    countdown = 30;
  }
  timerEl.textContent = countdown;
}
setInterval(atualizarTimer, 1000);

// Função principal: carrega os dados do Google Sheets
async function carregarDados() {
  try {
    const resposta = await fetch(sheetURL);
    const texto = await resposta.text();
    const linhas = texto.trim().split('\n').map(l => l.split(','));

    const cabecalhos = linhas[0];
    const dados = linhas.slice(1);

    container.innerHTML = ''; // limpa os cursos antes de recarregar

    dados.forEach((linha) => {
      const curso = document.createElement('div');
      curso.className = 'bg-white rounded-xl shadow-md p-4 border border-gray-200';

      linha.forEach((valor, i) => {
        if (cabecalhos[i]) {
          const item = document.createElement('p');
          item.innerHTML = `<strong>${cabecalhos[i]}:</strong> ${valor}`;
          curso.appendChild(item);
        }
      });

      // Pega o nome do curso (assumido na primeira coluna)
      const nomeCurso = linha[1];

      // Cria botão para WhatsApp
      const botao = document.createElement('a');
      botao.href = `https://wa.me/5599999999999?text=Olá! Tenho interesse 
      no curso: ${encodeURIComponent(nomeCurso)}`;
      botao.target = '_blank';
      botao.className = 'mt-4 inline-block bg-pink-200 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600';
      botao.textContent = '📲 Comprar';

      curso.appendChild(botao);
      container.appendChild(curso);
    });

  } catch (erro) {
    console.error('Erro ao carregar os dados:', erro);
  }
}

// Carrega ao iniciar
carregarDados();