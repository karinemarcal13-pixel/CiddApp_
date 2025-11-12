/* ===========================================================
   ROSANI MACHADO CONSÓRCIOS - SCRIPT INTERATIVO
   =========================================================== */

// Espera o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
  iniciarSimulador();
  iniciarFormulario();
  animacoesScroll();
});

/* ===========================================================
   SIMULADOR DE CONSÓRCIO
   =========================================================== */
function iniciarSimulador() {
  const form = document.getElementById("simulador-form");
  const resultado = document.getElementById("resultado");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const tipo = form.querySelector("#tipo").value;
    const valor = parseFloat(form.querySelector("#valor").value);
    const parcelas = parseInt(form.querySelector("#parcelas").value);

    if (!valor || !parcelas || parcelas <= 0) {
      resultado.innerHTML = `<p style="color: red;">Preencha os valores corretamente!</p>`;
      return;
    }

    // Taxa de administração simulada (em %)
    const taxa = tipo === "auto" ? 0.12 : 0.10;
    const valorFinal = valor + valor * taxa;
    const valorParcela = valorFinal / parcelas;

    resultado.innerHTML = `
      <h4>Resultado da Simulação</h4>
      <p><strong>Tipo de Consórcio:</strong> ${tipo === "auto" ? "Automóveis" : "Imóveis"}</p>
      <p><strong>Valor Total:</strong> R$ ${valorFinal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
      <p><strong>Parcelas:</strong> ${parcelas}x de <strong>R$ ${valorParcela.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong></p>
      <p style="font-size: 0.9rem; color: #6b7280;">
        *Valores simulados, sujeitos a variação conforme plano e administradora.
      </p>
    `;
  });
}

/* ===========================================================
   FORMULÁRIO DE CONTATO
   =========================================================== */
function iniciarFormulario() {
  const form = document.getElementById("contato-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = {
      nome: form.querySelector("#nome").value.trim(),
      email: form.querySelector("#email").value.trim(),
      mensagem: form.querySelector("#mensagem").value.trim(),
    };

    if (!dados.nome || !dados.email || !dados.mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Aqui você pode integrar com um backend real (ex: via fetch)
    mostrarToast("Mensagem enviada com sucesso! 💌");
    form.reset();
  });
}

/* ===========================================================
   TOAST DE MENSAGEM ENVIADA
   =========================================================== */
function mostrarToast(texto) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.classList.add("toast");
    document.body.appendChild(toast);
  }

  toast.textContent = texto;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.opacity = "1";
  }, 50);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => (toast.style.display = "none"), 400);
  }, 3000);
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
