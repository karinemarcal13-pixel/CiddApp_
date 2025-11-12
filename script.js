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

  // Enviar para Rosani via WhatsApp
  enviarParaRosani(lead);

  // Mostrar toast
  mostrarToast('✓ Mensagem enviada com sucesso! Rosani entrará em contato em breve.');

  // Limpar formulário
  document.getElementById('contactForm').reset();
}

/* ===========================================================
   ENVIAR DADOS PARA ROSANI VIA WHATSAPP
   =========================================================== */
function enviarParaRosani(lead) {
  // Número de WhatsApp da Rosani (substituir pelo número real)
  const numeroRosani = '5543998721117'; // (43) 9 9872-1117 formato internacional
  
  // Formatar mensagem
  const tipoConsorcio = lead.interesse === 'auto' ? 'Automóvel' : 'Casa/Imóvel';
  const mensagemFormatada = `
📋 *NOVO CONTATO - ROSANI CONSÓRCIOS*

👤 *Nome:* ${lead.nome}
📱 *Telefone:* ${lead.telefone}
📧 *E-mail:* ${lead.email}
🏠 *Interesse:* ${tipoConsorcio}
💬 *Mensagem:* ${lead.mensagem || 'Sem mensagem adicional'}

⏰ *Data:* ${new Date(lead.createdAt).toLocaleString('pt-BR')}

_Clique no telefone ou e-mail acima para responder ao cliente_
  `.trim();

  // Codificar mensagem para URL
  const mensagemCodificada = encodeURIComponent(mensagemFormatada);
  
  // URL de WhatsApp Web
  const urlWhatsApp = `https://wa.me/${numeroRosani}?text=${mensagemCodificada}`;
  
  // Abrir WhatsApp em nova aba
  window.open(urlWhatsApp, '_blank');
  
  // Também registrar no console para debug
  console.log('Lead enviado para Rosani:', lead);
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

  // Verificar se é Rosani (senha simples para acessar admin)
  verificarAcessoAdmin();
}

/* ===========================================================
   PAINEL ADMIN - VERIFICAR ACESSO
   =========================================================== */
function verificarAcessoAdmin() {
  // Verifica se Rosani está logada (pode usar localStorage ou um prompt)
  const adminLogado = localStorage.getItem('rm_consorcios_admin_logado');
  
  // Para acessar, digitar "rosani2025" na URL (#admin)
  if (window.location.hash === '#admin-panel') {
    const senha = prompt('Digite a senha do painel admin:');
    if (senha === 'rosani2025') {
      localStorage.setItem('rm_consorcios_admin_logado', 'true');
      document.getElementById('admin').style.display = 'block';
      mostrarToast('✓ Painel admin desbloqueado!');
    } else {
      alert('Senha incorreta!');
    }
  } else if (adminLogado === 'true') {
    document.getElementById('admin').style.display = 'block';
  }
}

/* ===========================================================
   ABRIR PAINEL DE CONTATOS
   =========================================================== */
function abrirPainelAdmin() {
  const key = 'rm_consorcios_leads_v1';
  const leads = JSON.parse(localStorage.getItem(key) || '[]');
  
  if (leads.length === 0) {
    document.getElementById('adminLista').innerHTML = '<p class="muted">Nenhum contato recebido ainda.</p>';
    return;
  }

  let html = `<p class="small" style="margin-bottom:12px"><strong>${leads.length} contato(s)</strong> no total</p>`;
  
  leads.forEach((lead, index) => {
    const data = new Date(lead.createdAt).toLocaleString('pt-BR');
    const tipo = lead.interesse === 'auto' ? '🚗 Automóvel' : '🏠 Casa/Imóvel';
    const statusAtual = localStorage.getItem(`rm_lead_${lead.id}_respondido`) ? '✅ Respondido' : '⏳ Novo';
    
    html += `
      <div class="card" style="margin-bottom:12px;padding:12px;background:#f9fafb;border-left:4px solid #0f62fe">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">
          <div>
            <strong>${lead.nome}</strong>
            <span style="margin-left:8px;font-size:12px;background:#0f62fe;color:white;padding:2px 6px;border-radius:4px">${statusAtual}</span>
          </div>
          <span class="small muted">${data}</span>
        </div>
        
        <div style="font-size:14px;margin-bottom:8px">
          <p style="margin:4px 0"><strong>📱:</strong> ${lead.telefone}</p>
          <p style="margin:4px 0"><strong>📧:</strong> ${lead.email}</p>
          <p style="margin:4px 0"><strong>🎯:</strong> ${tipo}</p>
          ${lead.mensagem ? `<p style="margin:4px 0"><strong>💬:</strong> ${lead.mensagem}</p>` : ''}
        </div>
        
        <div style="display:flex;gap:8px">
          <button onclick="abrirWhatsApp('${lead.telefone}')" style="padding:6px 10px;font-size:12px;border-radius:6px;background:#25d366;color:white;border:none;cursor:pointer">WhatsApp</button>
          <button onclick="copiarEmail('${lead.email}')" style="padding:6px 10px;font-size:12px;border-radius:6px;border:1px solid #e6e9ef;cursor:pointer">Copiar E-mail</button>
          <button onclick="marcarComoRespondido('${lead.id}')" style="padding:6px 10px;font-size:12px;border-radius:6px;border:1px solid #e6e9ef;cursor:pointer">Marcar como Respondido</button>
        </div>
      </div>
    `;
  });
  
  document.getElementById('adminLista').innerHTML = html;
}

/* ===========================================================
   ABRIR WHATSAPP COM TELEFONE
   =========================================================== */
function abrirWhatsApp(telefone) {
  // Limpar telefone e formatar
  const teleformatado = telefone.replace(/\D/g, '');
  const url = `https://wa.me/55${teleformatado}`;
  window.open(url, '_blank');
}

/* ===========================================================
   COPIAR E-MAIL PARA CLIPBOARD
   =========================================================== */
function copiarEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    mostrarToast('✓ E-mail copiado!');
  });
}

/* ===========================================================
   MARCAR COMO RESPONDIDO
   =========================================================== */
function marcarComoRespondido(leadId) {
  localStorage.setItem(`rm_lead_${leadId}_respondido`, 'true');
  mostrarToast('✓ Contato marcado como respondido!');
  abrirPainelAdmin(); // Recarregar lista
}

/* ===========================================================
   EXPORTAR CONTATOS PARA CSV
   =========================================================== */
function exportarCSV() {
  const key = 'rm_consorcios_leads_v1';
  const leads = JSON.parse(localStorage.getItem(key) || '[]');
  
  if (leads.length === 0) {
    alert('Nenhum contato para exportar.');
    return;
  }

  // Cabeçalho CSV
  let csv = 'Data,Nome,Telefone,E-mail,Tipo,Mensagem\n';
  
  // Dados
  leads.forEach(lead => {
    const data = new Date(lead.createdAt).toLocaleString('pt-BR');
    const tipo = lead.interesse === 'auto' ? 'Automóvel' : 'Casa/Imóvel';
    csv += `"${data}","${lead.nome}","${lead.telefone}","${lead.email}","${tipo}","${(lead.mensagem || '').replace(/"/g, '""')}"\n`;
  });

  // Criar blob e download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `rosani_contatos_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  mostrarToast('✓ Contatos exportados com sucesso!');
}

/* ===========================================================
   LIMPAR TODOS OS DADOS
   =========================================================== */
function limparTodosOsDados() {
  if (confirm('⚠️ Tem certeza? Isso vai deletar TODOS os contatos salvos!')) {
    localStorage.removeItem('rm_consorcios_leads_v1');
    localStorage.removeItem('rm_consorcios_contato_atual');
    localStorage.removeItem('rm_consorcios_ultima_sim');
    mostrarToast('✓ Dados deletados com sucesso!');
    abrirPainelAdmin();
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
