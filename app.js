
(function () {
  "use strict";
  const CFG = window.AF_CONFIG || {};
  const WA_NUMBER = CFG.whatsappNumber || "5511000000000";
  const WA_MSG = CFG.whatsappMessage || "Olá! Gostaria de uma cotação.";
  function waLink(msg) {
    const text = encodeURIComponent(msg || WA_MSG);
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }
  function track(name, params) {
    try {
      if (typeof window.gtag === "function") window.gtag("event", name, params || {});
      if (typeof window.fbq === "function") window.fbq("trackCustom", name, params || {});
    } catch (_) {}
  }
  /* ---------- Dados ---------- */
  const services = [
    { icon: "heart", name: "Saúde e Odontológico", desc: "Planos individuais, familiares e empresariais com as principais operadoras.", featured: true },
    { icon: "car", name: "Seguro Auto", desc: "Proteção completa para seu veículo com cobertura sob medida.", featured: true },
    { icon: "home", name: "Seguro Residencial", desc: "Sua casa protegida contra incêndio, roubo e danos elétricos.", featured: true },
    { icon: "briefcase", name: "Seguro Empresarial", desc: "Cobertura patrimonial e de responsabilidade civil para o seu negócio." },
    { icon: "shield", name: "Seguro Vida", desc: "Tranquilidade financeira para quem você ama, quando mais precisarem." },
    { icon: "plane", name: "Seguro Viagem", desc: "Viaje com assistência médica, bagagem e imprevistos cobertos." },
    { icon: "paw-print", name: "Seguro Pet", desc: "Consultas, exames e cirurgias para o seu melhor amigo." },
    { icon: "coins", name: "Consórcio", desc: "Uma alternativa planejada para conquistar bens sem juros." },
  ];
  const differentials = [
    { icon: "scale", title: "Comparação entre seguradoras", desc: "Analisamos várias opções para você não pagar mais do que deveria." },
    { icon: "handshake", title: "Atendimento humanizado", desc: "Escuta ativa, linguagem clara e orientação sem pressão." },
    { icon: "headphones", title: "Suporte em sinistro", desc: "Estamos ao seu lado no momento em que você mais precisa." },
    { icon: "sparkles", title: "Pós-venda ativo", desc: "Renovação, ajustes e revisões acompanhadas por quem conhece você." },
    { icon: "wallet", title: "Melhor custo-benefício", desc: "Foco no equilíbrio ideal entre cobertura, preço e serviço." },
    { icon: "clock", title: "Atendimento ágil", desc: "Resposta rápida no WhatsApp, sem burocracia desnecessária." },
  ];
  const steps = [
    "Você entra em contato pelo WhatsApp ou formulário.",
    "A corretora entende sua necessidade e seu perfil.",
    "Avaliamos as opções de seguro disponíveis.",
    "Você recebe uma cotação personalizada.",
    "Escolhemos juntos a melhor opção.",
    "A contratação é feita com orientação completa.",
    "Acompanhamos o pós-venda para ajustes e renovação.",
    "Em caso de sinistro, você tem suporte especializado.",
  ];
  const trustItems = [
    "Atendimento personalizado",
    "Consultoria pessoa física e jurídica",
    "Suporte em sinistros",
    "Comparação entre seguradoras",
    "Transparência na contratação",
    "Parcelamento facilitado",
  ];
  const faqs = [
    { q: "Qual seguro é mais barato?", a: "Depende do seu perfil e do tipo de cobertura desejada. Comparamos várias seguradoras para apresentar a opção com melhor custo-benefício para você." },
    { q: "Quanto tempo leva para receber uma cotação?", a: "Normalmente entregamos a cotação em poucas horas úteis após entender sua necessidade." },
    { q: "Posso parcelar o seguro?", a: "Sim. Oferecemos parcelamento facilitado conforme as condições de cada seguradora." },
    { q: "Como funciona em caso de sinistro?", a: "Você fala com a AF Corretora e nós orientamos toda a abertura e acompanhamos o processo junto à seguradora." },
    { q: "Posso cancelar o seguro?", a: "Sim. Todo seguro pode ser cancelado conforme as regras da apólice. Explicamos as condições antes da contratação." },
    { q: "A corretora compara seguradoras diferentes?", a: "Sim. Trabalhamos com múltiplas seguradoras e comparamos coberturas, preços e serviços." },
    { q: "Atendem pessoa física e empresa?", a: "Sim. Atendemos tanto clientes pessoa física quanto pessoa jurídica." },
    { q: "Atendem somente São Paulo?", a: "Nossa base é em São Paulo/SP e atendemos clientes de toda a região metropolitana." },
  ];
  /* ---------- Renderização ---------- */
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function renderServices() {
    const grid = document.getElementById("services-grid");
    services.forEach(s => {
      const card = el(`
        <article class="svc ${s.featured ? "featured" : ""}">
          <div class="svc-icon"><i data-lucide="${s.icon}"></i></div>
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <a href="${waLink("Olá! Gostaria de uma cotação de " + s.name + ".")}" target="_blank" rel="noopener">
            Cotar agora <i data-lucide="arrow-right"></i>
          </a>
        </article>
      `);
      card.querySelector("a").addEventListener("click", () => track("click_service_quote", { service: s.name }));
      grid.appendChild(card);
    });
  }
  function renderDifferentials() {
    const grid = document.getElementById("diff-grid");
    differentials.forEach(d => {
      grid.appendChild(el(`
        <div class="diff-item">
          <div class="di-icon"><i data-lucide="${d.icon}"></i></div>
          <h3>${d.title}</h3>
          <p>${d.desc}</p>
        </div>
      `));
    });
  }
  function renderSteps() {
    const grid = document.getElementById("steps-grid");
    steps.forEach((s, i) => {
      grid.appendChild(el(`
        <li>
          <span class="step-num">0${i + 1}</span>
          <p>${s}</p>
        </li>
      `));
    });
  }
  function renderTrust() {
    const grid = document.getElementById("trust-grid");
    trustItems.forEach(t => {
      grid.appendChild(el(`
        <div><i data-lucide="check-circle-2"></i><span>${t}</span></div>
      `));
    });
  }
  function renderFAQ() {
    const list = document.getElementById("faq-list");
    faqs.forEach(f => {
      list.appendChild(el(`
        <details class="faq-item">
          <summary>${f.q}<i data-lucide="chevron-down"></i></summary>
          <p>${f.a}</p>
        </details>
      `));
    });
  }
  function renderInsuranceOptions() {
    const sel = document.getElementById("insuranceType");
    services.forEach(s => {
      const o = document.createElement("option");
      o.value = s.name; o.textContent = s.name;
      sel.appendChild(o);
    });
    const other = document.createElement("option");
    other.value = "Outros"; other.textContent = "Outros";
    sel.appendChild(other);
  }
  /* ---------- WhatsApp links ---------- */
  function bindWhatsApp() {
    document.querySelectorAll("[data-wa]").forEach(a => {
      a.setAttribute("href", waLink());
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }
  /* ---------- Analytics data-track ---------- */
  function bindTrackers() {
    document.querySelectorAll("[data-track]").forEach(a => {
      a.addEventListener("click", () => track(a.getAttribute("data-track")));
    });
  }
  /* ---------- Form ---------- */
  function bindForm() {
    const form = document.getElementById("quote-form");
    const success = document.getElementById("form-success");
    const autoFields = document.getElementById("auto-fields");
    const sel = document.getElementById("insuranceType");
    sel.addEventListener("change", () => {
      if (sel.value === "Seguro Auto") autoFields.classList.remove("hidden");
      else autoFields.classList.add("hidden");
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      track("submit_quote_form", { insurance_type: data.insuranceType });
      if (CFG.formEndpoint) {
        try {
          await fetch(CFG.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        } catch (err) {
          console.error("Falha no envio do formulário", err);
        }
      }
      form.classList.add("hidden");
      success.classList.remove("hidden");
      window.lucide && window.lucide.createIcons();
    });
  }
  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    renderServices();
    renderDifferentials();
    renderSteps();
    renderTrust();
    renderFAQ();
    renderInsuranceOptions();
    bindWhatsApp();
    bindTrackers();
    bindForm();
    // Ícones lucide (carregado via <script defer>)
    const initIcons = () => window.lucide && window.lucide.createIcons();
    if (window.lucide) initIcons();
    else window.addEventListener("load", initIcons);
  });
})();