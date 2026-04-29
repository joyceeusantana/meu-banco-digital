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

// Elementos da Notificação
const notification = document.getElementById('notification');
const notifMessage = document.getElementById('notif-message');

// Variáveis de Saldo
let balance = 0.00;
let gained = 0;
let lastMilestone = 0; // Rastreia o último marco de 1000 reais
const balanceEl = document.getElementById('balance');
const gainEl = document.getElementById('gain');

function formatBRL(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Função para exibir a notificação personalizada
function showNotification(text) {
  notifMessage.textContent = text;
  notification.classList.add('show');

  // Remove a notificação após 4 segundos
  setTimeout(() => {
    notification.classList.remove('show');
  }, 4000);
}

// Evento de Clique para Cadastro
btnRegister.addEventListener('click', () => {
  const name = userInput.value.trim();

  if (name.length > 0) {
    accountNameEl.textContent = name;
    const names = name.split(' ');
    initialsEl.textContent = names.length > 1 
      ? (names[0][0] + names[names.length - 1][0]).toUpperCase() 
      : names[0][0].toUpperCase();

    prosperityMsg.textContent = `${name}, visualize a sua prosperidade`;
    regScreen.classList.add('hidden');
    transScreen.classList.remove('hidden');

    setTimeout(() => {
      transScreen.classList.add('hidden');
      appContent.classList.remove('hidden');
      
      lucide.createIcons();
      startBankCounter();
    }, 3000);

  } else {
    alert("Por favor, digite seu nome.");
  }
});

// Função que faz o dinheiro subir e verifica marcos de 1000 reais
function startBankCounter() {
  setInterval(() => {
    const add = 1.00;
    balance += add;
    gained += add;
    
    balanceEl.textContent = formatBRL(balance);
    gainEl.textContent = `+${formatBRL(gained)} desde que você abriu`;

    // Verifica se atingiu um novo marco de R$ 1000,00
    if (balance - lastMilestone >= 1000) {
      lastMilestone += 1000;
      showNotification(`Parabéns! Você fez + ${formatBRL(1000)}`);
    }
    
  }, 1000);
}