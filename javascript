// =======================
// 🌆 CiddApp - Interatividade
// =======================

// Menu responsivo para mobile
const navToggle = document.createElement('button');
navToggle.innerText = '☰';
navToggle.id = 'menu-toggle';
document.querySelector('header .container').prepend(navToggle);

const navMenu = document.querySelector('nav ul');
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Scroll suave para links do menu
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Formulários: alert de sucesso
function handleFormSubmit(formId, message) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert(message);
    form.reset();
  });
}

// Aplicando para todos os formulários
handleFormSubmit('form-doacao', 'Doação enviada com sucesso!');
handleFormSubmit('form-reclamacao', 'Reclamação enviada com sucesso!');
handleFormSubmit('form-solicitacao', 'Solicitação médica enviada!');
handleFormSubmit('form-agendamento', 'Agendamento realizado com sucesso!');
handleFormSubmit('form-contato', 'Mensagem enviada com sucesso!');

// Mostrar/ocultar lista de eventos (opcional)
const verEventosBtn = document.getElementById('ver-eventos');
if (verEventosBtn) {
  verEventosBtn.addEventListener('click', () => {
    const lista = document.getElementById('lista-eventos');
    if (lista) {
      lista.hidden = !lista.hidden;
      verEventosBtn.setAttribute('aria-expanded', !lista.hidden);
    }
  });
}
