/**
 * AF Corretora — Configurações públicas
 *
 * Este arquivo pode ser publicado no GitHub.
 * Não adicione senhas, tokens ou chaves privadas.
 */
window.AF_CONFIG = Object.freeze({
  // WhatsApp oficial — formato internacional, somente números.
  whatsappNumber: "5511974816598",

  // Mensagem padrão utilizada nos links de contato.
  whatsappMessage:
    "Olá! Encontrei a AF Corretora pelo site e gostaria de solicitar uma cotação.",

  /**
   * Endpoint responsável por receber o formulário.
   *
   * Enquanto a API e o banco não estiverem configurados,
   * mantenha este valor vazio.
   */
  formEndpoint: "",

  // Identificador do Google Analytics, quando configurado.
  gaMeasurementId: "",

  // Identificador do Meta Pixel, quando configurado.
  metaPixelId: "",
});