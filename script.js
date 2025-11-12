/* ===========================================================
   ROSANI MACHADO CONSÓRCIOS - SCRIPT FUNCIONAL COMPLETO
   =========================================================== */

// Inicializa ao carregar página
document.addEventListener("DOMContentLoaded", () => {
  inicializarPage();
});

function inicializarPage() {
  // Preencher ano no rodapé
  const anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Sincronizar selects de plano
  const planType = document.getElementById('planType');
  if (planType) {
    planType.addEventListener('change', sincronizarPlano);
    sincronizarPlano.call(planType);
  }

  // Inicializar eventos
  const calcBtn = document.querySelector('[onclick="calcular()"]');
  if (calcBtn) calcBtn.addEventListener('click', calcular);

  const resetBtn = document.querySelector('[onclick="resetSim()"]');
  if (resetBtn) resetBtn.addEventListener('click', resetSim);

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', submitForm);
  }

  // Carregar dados salvos no localStorage
  carregarDadosSalvos();
}

/* ===========================================================
   SINCRONIZAR PLANO
   =========================================================== */
function sincronizarPlano() {
  const opt = this.selectedOptions[0];
  const valorCarta = document.getElementById('valorCarta');
  const prazo = document.getElementById('prazo');

  if (valorCarta && opt.dataset.price) {
    valorCarta.value = Number(opt.dataset.price);
  }

  if (prazo) {
    if (opt.dataset.min) prazo.min = opt.dataset.min;
    if (opt.dataset.max) prazo.max = opt.dataset.max;
    if (opt.dataset.min) prazo.value = Number(opt.dataset.min);
  }
}

/* ===========================================================
   PREENCHER SIMULADOR A PARTIR DOS PLANOS
   =========================================================== */
function fillSimulator(type, price, min, max) {
  const planType = document.getElementById('planType');
  const valorCarta = document.getElementById('valorCarta');
  const prazo = document.getElementById('prazo');

  // Encontrar e selecionar opção correspondente
  for (let i = 0; i < planType.options.length; i++) {
    if (planType.options[i].value === type) {
      planType.selectedIndex = i;
      planType.dispatchEvent(new Event('change'));
      break;
    }
  }

  if (valorCarta) valorCarta.value = price;
  if (prazo) {
    prazo.value = min;
    prazo.min = min;
    prazo.max = max;
  }

  // Scroll suave até o simulador
  const simulador = document.getElementById('simulador');
  if (simulador) {
    setTimeout(() => {
      simulador.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

/* ===========================================================
   CALCULAR PARCELAS
   =========================================================== */
function calcular() {
  const valorCarta = document.getElementById('valorCarta');
  const entrada = document.getElementById('entrada');
  const prazo = document.getElementById('prazo');
  const taxa = document.getElementById('taxa');
  const planType = document.getElementById('planType');
  const resultado = document.getElementById('resultado');

  if (!valorCarta || !entrada || !prazo || !taxa || !resultado) return;

  const V = Number(valorCarta.value) || 0;
  const E = Number(entrada.value) || 0;
  let N = Number(prazo.value) || 1;
  const taxaPerc = Number(taxa.value) || 0;

  // Validar prazo com limites do plano selecionado
  const sel = planType.selectedOptions[0];
  const min = Number(sel.dataset.min) || 1;
  const max = Number(sel.dataset.max) || 1000;

  if (N < min) N = min;
  if (N > max) N = max;
  prazo.value = N;

  // Calcular taxa administrativa
  const taxaAdm = (taxaPerc / 100) * V;

  // Saldo a financiar
  const saldo = Math.max(0, V - E) + taxaAdm;
  const parcela = saldo / N;

  // Formatar resultado
  const parcelaFormatada = parcela.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const taxaAdmFormatada = taxaAdm.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const valorCartaFormatado = V.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const entradaFormatada = E.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const saldoFormatado = saldo.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  resultado.innerHTML = `
    <div><strong>Plano:</strong> ${sel.textContent}</div>
    <div style="margin-top:8px"><strong>Valor da carta:</strong> ${valorCartaFormatado}</div>
    <div><strong>Entrada / Lance:</strong> ${entradaFormatada}</div>
    <div><strong>Taxa administrativa (${taxaPerc}% do valor):</strong> ${taxaAdmFormatada}</div>
    <div style="margin-top:12px;padding:12px;background:#f0f7ff;border-radius:8px;border-left:4px solid #0f62fe">
      <strong style="font-size:18px">Parcelas:</strong> <span style="font-size:20px;color:#0f62fe">${N}x ${parcelaFormatada}</span>
    </div>
    <div class="muted" style="margin-top:10px">
      <strong>Total a financiar:</strong> ${saldoFormatado}
    </div>
    <p class="muted" style="margin-top:8px;font-size:13px">
      ✓ Valores simulados. Para proposta real com lances e fundo de reserva, contate a Rosani.
    </p>
  `;

  // Salvar última simulação
  const ultimaSim = {
    tipo: sel.value,
    valor: V,
    entrada: E,
    prazo: N,
    taxa: taxaPerc,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('rm_consorcios_ultima_sim', JSON.stringify(ultimaSim));
}

/* ===========================================================
   RESETAR SIMULADOR
   =========================================================== */
function resetSim() {
  const planType = document.getElementById('planType');
  const valorCarta = document.getElementById('valorCarta');
  const entrada = document.getElementById('entrada');
  const prazo = document.getElementById('prazo');
  const taxa = document.getElementById('taxa');
  const resultado = document.getElementById('resultado');

  if (planType && planType.selectedOptions[0]) {
    const opt = planType.selectedOptions[0];
    if (valorCarta) valorCarta.value = opt.dataset.price || 0;
    if (prazo) prazo.value = opt.dataset.min || 1;
  }
  if (entrada) entrada.value = 0;
  if (taxa) taxa.value = 12;

  if (resultado) {
    resultado.innerHTML = '<p class="muted">Preencha os dados à esquerda e clique em <strong>Calcular</strong>.</p>';
  }
}

/* ===========================================================
   ENVIAR FORMULÁRIO DE CONTATO
   =========================================================== */
function submitForm(e) {
  e.preventDefault();

  const nome = document.getElementById('nome')?.value.trim();
  const telefone = document.getElementById('telefone')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const interesse = document.getElementById('interesse')?.value;
  const mensagem = document.getElementById('mensagem')?.value.trim();

  if (!nome || !telefone || !email || !interesse) {
    alert('Preencha nome, telefone, e-mail e selecione o tipo de consórcio.');
    return;
  }

  // Validar email
  if (!email.includes('@')) {
    alert('E-mail inválido.');
    return;
  }

  // Criar objeto com dados
  const lead = {
    id: 'lead_' + Date.now(),
    nome,
    telefone,
    email,
    interesse,
    mensagem,
    createdAt: new Date().toISOString()
  };

  // Salvar no localStorage
  const key = 'rm_consorcios_leads_v1';
  const leads = JSON.parse(localStorage.getItem(key) || '[]');
  leads.push(lead);
  localStorage.setItem(key, JSON.stringify(leads));

  // Salvar também contato atual
  localStorage.setItem('rm_consorcios_contato_atual', JSON.stringify({
    nome,
    email,
    telefone
  }));

  // Mostrar toast
  mostrarToast('✓ Mensagem enviada com sucesso! Rosani entrará em contato em breve.');

  // Limpar formulário
  document.getElementById('contactForm').reset();
}

/* ===========================================================
   MOSTRAR NOTIFICAÇÃO (TOAST)
   =========================================================== */
function mostrarToast(texto) {
  let toast = document.getElementById('toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = texto;
  toast.style.display = 'block';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 400);
  }, 4000);
}

/* ===========================================================
   CARREGAR DADOS SALVOS
   =========================================================== */
function carregarDadosSalvos() {
  // Tentar popular o formulário com contato anterior
  const contatoSalvo = localStorage.getItem('rm_consorcios_contato_atual');
  if (contatoSalvo) {
    try {
      const dados = JSON.parse(contatoSalvo);
      const nomeEl = document.getElementById('nome');
      const emailEl = document.getElementById('email');
      const teleEl = document.getElementById('telefone');

      if (nomeEl) nomeEl.value = dados.nome || '';
      if (emailEl) emailEl.value = dados.email || '';
      if (teleEl) teleEl.value = dados.telefone || '';
    } catch (e) {
      console.log('Erro ao carregar dados salvos');
    }
  }

  // Tentar popular simulador com última simulação
  const ultimaSim = localStorage.getItem('rm_consorcios_ultima_sim');
  if (ultimaSim) {
    try {
      const sim = JSON.parse(ultimaSim);
      const planType = document.getElementById('planType');
      const valorCarta = document.getElementById('valorCarta');
      const entrada = document.getElementById('entrada');
      const prazo = document.getElementById('prazo');
      const taxa = document.getElementById('taxa');

      if (planType) {
        for (let i = 0; i < planType.options.length; i++) {
          if (planType.options[i].value === sim.tipo) {
            planType.selectedIndex = i;
            planType.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
      if (valorCarta) valorCarta.value = sim.valor || 50000;
      if (entrada) entrada.value = sim.entrada || 0;
      if (prazo) prazo.value = sim.prazo || 60;
      if (taxa) taxa.value = sim.taxa || 12;
    } catch (e) {
      console.log('Erro ao carregar simulação anterior');
    }
  }
}

/* ===========================================================
   ANIMAÇÕES SUAVES AO ROLAR
   =========================================================== */
function animacoesScroll() {
  const elementos = document.querySelectorAll(".card, .hero, .plan");

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("animado");
        }
      });
    },
    { threshold: 0.2 }
  );

  elementos.forEach((el) => {
    el.classList.add("oculto");
    observador.observe(el);
  });
}

// Animações CSS auxiliares
const estiloAnimacao = document.createElement("style");
estiloAnimacao.innerHTML = `
  .oculto {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .animado {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(estiloAnimacao);
