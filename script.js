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
let lastMilestone = 0; 
const balanceEl = document.getElementById('balance');
const gainEl = document.getElementById('gain');

function formatBRL(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function showNotification(text) {
  notifMessage.textContent = text;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 4000);
}

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

// Função atualizada para marcos de 1 milhão
function startBankCounter() {
  setInterval(() => {
    const add = 1000.00; // Mantém o ganho de 1000 por segundo
    balance += add;
    gained += add;
    
    balanceEl.textContent = formatBRL(balance);
    gainEl.textContent = `+${formatBRL(gained)} desde que você abriu`;

    // Verifica se atingiu um novo marco de R$ 1.000.000,00
    if (balance - lastMilestone >= 1000000) {
      lastMilestone += 1000000;
      showNotification(`Parabéns! Você fez mais um milhão!`);
    }
    
  }, 1000);
}