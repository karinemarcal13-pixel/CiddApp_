# ⚡ CONFIGURAÇÃO RÁPIDA - Seu Número no Sistema

## 🎯 O que fazer AGORA:

### 1️⃣ Abra o arquivo `script.js`

Procure pela função `enviarParaRosani()` e encontre esta linha:

```javascript
const numeroRosani = '5511999999999'; // (11) 9 9999-9999 formato internacional
```

### 2️⃣ Substitua pelo seu número

**Seu número:** `(11) 9 9999-9999` (EXEMPLO)

**Como converter para formato internacional:**
- Remova os parênteses: `11 9 9999-9999`
- Remova os hífens: `11 99999999`
- Adicione `55` (código Brasil) no início: `5511999999999`

**Exemplos:**
- (11) 9 8765-4321 → `5511987654321`
- (21) 9 9876-5432 → `5521998765432`
- (85) 9 8888-8888 → `5585988888888`

### 3️⃣ Pronto! ✅

Agora quando um cliente enviar uma mensagem, você receberá no WhatsApp automaticamente!

---

## 📊 Como acompanhar os clientes

### Opção 1: Painel Admin
1. Acesse: `http://seu-site.com/#admin-panel`
2. Senha: `rosani2025`
3. Veja todos os contatos
4. Clique em "WhatsApp" para contactar

### Opção 2: Direto do WhatsApp
- Os clientes mandam mensagem para você automaticamente
- Responda normalmente no WhatsApp

### Opção 3: Exportar para Excel
- Acesse o painel admin
- Clique em "Exportar CSV"
- Abra em Excel/Google Sheets

---

## 🔐 Mude a senha do admin (Recomendado!)

Procure no `script.js` por:

```javascript
if (senha === 'rosani2025') {
```

Substitua `rosani2025` pela sua senha preferida.

---

## ✅ Checklist Final

- [ ] Adicionei meu número de WhatsApp em `script.js`
- [ ] Testei enviando um contato de teste
- [ ] Recebi a mensagem no WhatsApp
- [ ] Acessei o painel admin com `#admin-panel`
- [ ] Mudei a senha padrão (opcional)
- [ ] Cliquei no botão WhatsApp no painel admin
- [ ] Exportei dados em CSV

---

## 🆘 Testando

### Teste 1: Simular um contato
1. Preencha o formulário de contato com seus dados
2. Clique em "Enviar mensagem"
3. Deve abrir WhatsApp Web automaticamente
4. Veja os dados do cliente formatados

### Teste 2: Acessar painel admin
1. Acesse `http://seu-site-local.com/#admin-panel`
2. Digite a senha
3. Você verá o contato que acabou de enviar
4. Clique em "WhatsApp" para testar

---

## 📞 Teste com Seu Próprio Número

Você pode testar com seu próprio número de WhatsApp:

1. Preencha o formulário com seus dados reais
2. Envie para si mesmo
3. Confirme que a mensagem chega correta
4. Valide o formato

---

## 🚀 Próximo Passo

Depois de configurado, compartilhe o link do site com seus clientes!

Exemplo: `https://seu-dominio.com`

Eles vão preencher o formulário, enviar, e você receberá direto no WhatsApp! 📱

---

**Qualquer dúvida, consulte o arquivo `CONFIGURACAO.md` para mais detalhes!**
