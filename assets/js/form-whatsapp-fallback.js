/**
 * AF Corretora — Correção MVP do formulário
 * Objetivo: evitar perda de lead.
 * Ao enviar o formulário, abre o WhatsApp com os dados preenchidos.
 */

(function () {
  "use strict";

  const CONFIG = window.AF_CONFIG || {};

  function onlyNumbers(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function getWhatsappNumber() {
    const number = onlyNumbers(CONFIG.whatsappNumber);

    if (!number) {
      console.error("[AF Corretora] WhatsApp não configurado no config.js");
      return "";
    }

    return number;
  }

  function getFieldValue(form, names) {
    for (const name of names) {
      const field = form.querySelector(`[name="${name}"], #${name}`);

      if (field) {
        if (field.type === "checkbox") {
          return field.checked ? "Sim" : "Não";
        }

        return String(field.value || "").trim();
      }
    }

    return "";
  }

  function buildMessage(form) {
    const nome = getFieldValue(form, ["name", "nome", "fullName"]);
    const whatsapp = getFieldValue(form, ["whatsapp", "phone", "telefone"]);
    const email = getFieldValue(form, ["email"]);
    const cidade = getFieldValue(form, ["city", "cidade"]);
    const estado = getFieldValue(form, ["state", "estado"]);
    const solucao = getFieldValue(form, ["solution", "insuranceType", "seguro", "solucao"]);
    const veiculo = getFieldValue(form, ["vehicle", "veiculo"]);
    const modelo = getFieldValue(form, ["model", "modelo"]);
    const ano = getFieldValue(form, ["yearVehicle", "ano", "anoVeiculo"]);
    const cep = getFieldValue(form, ["cep"]);
    const observacoes = getFieldValue(form, ["notes", "observacoes", "message", "mensagem"]);

    const linhas = [
      "Olá! Gostaria de solicitar uma cotação pela landing page da AF Corretora.",
      "",
      `Nome: ${nome}`,
      `WhatsApp: ${whatsapp}`,
      email ? `E-mail: ${email}` : "",
      `Cidade: ${cidade}`,
      `Estado: ${estado}`,
      `Solução desejada: ${solucao}`,
      "",
      veiculo || modelo || ano || cep ? "Dados do veículo:" : "",
      veiculo ? `Veículo: ${veiculo}` : "",
      modelo ? `Modelo: ${modelo}` : "",
      ano ? `Ano: ${ano}` : "",
      cep ? `CEP de pernoite: ${cep}` : "",
      "",
      observacoes ? `Observações: ${observacoes}` : "",
      "",
      "Aguardo o retorno. Obrigado(a)."
    ];

    return linhas.filter(Boolean).join("\n");
  }

  function showSuccess(form) {
    const success =
      document.getElementById("form-success") ||
      document.querySelector(".form-success") ||
      document.querySelector(".success");

    if (success) {
      success.classList.remove("hidden");
    }

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar solicitação";
    }
  }

  function bindFormFallback() {
    const form =
      document.getElementById("quote-form") ||
      document.getElementById("cotacao-form") ||
      document.querySelector("#cotacao form") ||
      document.querySelector("form");

    if (!form) {
      console.warn("[AF Corretora] Formulário não encontrado.");
      return;
    }

    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (!form.reportValidity()) {
          return;
        }

        const whatsappNumber = getWhatsappNumber();

        if (!whatsappNumber) {
          alert("WhatsApp da corretora não está configurado. Verifique o arquivo config.js.");
          return;
        }

        const message = buildMessage(form);
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank", "noopener,noreferrer");

        showSuccess(form);
      },
      true
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindFormFallback);
  } else {
    bindFormFallback();
  }
})();