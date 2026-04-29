// Gerenciamento de Telas
const regScreen = document.getElementById('registration-screen');
const transScreen = document.getElementById('transition-screen');
const appContent = document.getElementById('app-content');

// Inputs e Textos
const userInput = document.getElementById('user-input');
const btnRegister = document.getElementById('btn-register');
const prosperityMsg = document.getElementById('prosperity-message');
const accountNameEl = document.getElementById('account-name');
const initialsEl = document.getElementById('user-initials');

// Variáveis de Saldo
let balance = 0.00;
let gained = 0;
const balanceEl = document.getElementById('balance');
const gainEl = document.getElementById('gain');

function formatBRL(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Evento de Clique para Cadastro
btnRegister.addEventListener('click', () => {
  const name = userInput.value.trim();

  if (name.length > 0) {
    // 1. Configura os dados do usuário para o banco
    accountNameEl.textContent = name;
    const names = name.split(' ');
    initialsEl.textContent = names.length > 1 
      ? (names[0][0] + names[names.length - 1][0]).toUpperCase() 
      : names[0][0].toUpperCase();

    // 2. Mostra a Tela de Transição com a frase
    prosperityMsg.textContent = `${name}, visualize a sua prosperidade`;
    regScreen.classList.add('hidden');
    transScreen.classList.remove('hidden');

    // 3. Timer de 3 segundos antes de abrir o banco
    setTimeout(() => {
      transScreen.classList.add('hidden');
      appContent.classList.remove('hidden');
      
      // Inicializa ícones e começa o contador
      lucide.createIcons();
      startBankCounter();
    }, 3000);

  } else {
    alert("Por favor, digite seu nome.");
  }
});

// Função que faz o dinheiro subir
function startBankCounter() {
  setInterval(() => {
    const add = 1.00;
    balance += add;
    gained += add;
    balanceEl.textContent = formatBRL(balance);
    gainEl.textContent = `+${formatBRL(gained)} desde que você abriu`;
  }, 1000);
}