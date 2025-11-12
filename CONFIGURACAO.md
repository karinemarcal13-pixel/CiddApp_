# ⚙️ CONFIGURAÇÃO - Receber Contatos dos Clientes

## 📱 Como Configurar para Receber no WhatsApp

### Passo 1: Adicione seu Número de WhatsApp

Abra o arquivo `script.js` e procure pela função `enviarParaRosani()`:

```javascript
// Número de WhatsApp da Rosani (substituir pelo número real)
const numeroRosani = '5511999999999'; // (11) 9 9999-9999 formato internacional
```

**Substitua `5511999999999` pelo seu número** no formato internacional:
- Exemplo: Se seu número é `(11) 9 9999-9999`, use `5511999999999`
- Formato: `55` + DDD (sem parênteses) + número (sem hífen)

### Passo 2: Como Funciona

Quando um cliente preenche o formulário:
1. ✅ Os dados são salvos no navegador dele (localStorage)
2. ✅ Uma mensagem é aberta no WhatsApp Web automaticamente
3. ✅ Você recebe a mensagem formatada com todos os dados

### Exemplo de Mensagem Recebida

```
📋 NOVO CONTATO - ROSANI CONSÓRCIOS

👤 Nome: João Silva
📱 Telefone: (11) 9 8765-4321
📧 E-mail: joao@email.com
🏠 Interesse: Automóvel
💬 Mensagem: Gostaria de saber mais sobre financiamento de carro novo

⏰ Data: 12/11/2025 14:30:00
```

---

## 📧 Alternativa: Receber por E-mail (Opcional)

Se preferir também receber por e-mail, você pode configurar um serviço gratuito:

### Opção 1: FormSubmit (Recomendado - Fácil)

1. Visite: https://formsubmit.co
2. Insira seu e-mail
3. Siga as instruções para integrar no formulário

### Opção 2: EmailJS (Com JavaScript)

1. Crie conta em: https://www.emailjs.com
2. Copie suas credenciais (Service ID, Template ID, User ID)
3. Integre no `script.js`

---

## 📊 Acompanhar Contatos Salvos

### No Navegador do Cliente

Os dados são salvos automaticamente no localStorage. Para visualizar:

1. Abra o DevTools (F12 ou Ctrl+Shift+I)
2. Vá para "Application" > "Local Storage"
3. Procure por `rm_consorcios_leads_v1`

### JSON dos Contatos

Os contatos são salvos neste formato:

```json
[
  {
    "id": "lead_1731428400000",
    "nome": "João Silva",
    "telefone": "(11) 9 8765-4321",
    "email": "joao@email.com",
    "interesse": "auto",
    "mensagem": "Interessado em um carro novo",
    "createdAt": "2025-11-12T14:30:00.000Z"
  }
]
```

---

## ✅ Checklist de Configuração

- [ ] Atualizei meu número de WhatsApp em `script.js`
- [ ] Testei enviando um contato
- [ ] Recebi a mensagem no WhatsApp
- [ ] Configurei e-mail (opcional)

---

## 🎯 Próximas Etapas

1. **Painel de Admin** - Criar área para ver todos os contatos
2. **Backup Automático** - Exportar leads em CSV
3. **Notificações** - Receber avisos quando novo contato chegar
4. **Integração CRM** - Conectar com ferramentas de gestão

---

## 📞 Seu Contato Atual

**Número de WhatsApp:** (11) 9 9999-9999  
**E-mail:** rosani@consorcios.com

Você pode atualizar estes dados também em `index.html` na seção "Atendimento rápido".

---

**Desenvolvido para facilitar seu atendimento! 🚀**
