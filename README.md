# 🎯 Rosani Machado Consórcios - App Funcional

Aplicação web moderna e responsiva para apresentação e simulação de consórcios de automóveis e imóveis.

## ✨ Funcionalidades Implementadas

### 1. **Simulador de Parcelas** 🧮
- Selecione o tipo de consórcio (Automóveis ou Casas)
- Customize o valor da carta, entrada e taxa administrativa
- Cálculo automático de parcelas em tempo real
- Validação de prazos conforme plano selecionado
- Formatação de moeda em português brasileiro
- Salvamento da última simulação no localStorage

### 2. **Formulário de Contato** 📝
- Coleta de informações: nome, telefone, e-mail e tipo de interesse
- Validação de campos obrigatórios
- Validação de formato de e-mail
- Salvamento automático de dados no localStorage
- Notificação visual (toast) ao enviar com sucesso
- Pré-preenchimento com dados salvos anteriormente

### 3. **Sistema de Notificações** 🔔
- Toast notifications que aparecem no canto inferior direito
- Desaparecem automaticamente após 4 segundos
- Animação suave de entrada e saída
- Design moderno e responsivo

### 4. **Interface Responsiva** 📱
- Compatível com desktop, tablet e mobile
- Design adaptativo que se ajusta a qualquer tamanho de tela
- Menu de navegação fluido
- Botões e inputs otimizados para toque

### 5. **Persistência de Dados** 💾
- localStorage para salvar:
  - Última simulação realizada
  - Dados de contato atuais
  - Histórico de leads (contatos)
- Dados recuperados automaticamente ao carregar a página

### 6. **Design Premium** 🎨
- Gradientes modernos
- Sombras sutis
- Animações suaves
- Paleta de cores profissional
- Tipografia clara e legível
- Ícones e indicadores visuais

## 🚀 Como Usar

### Simulador
1. Selecione o tipo de consórcio (Automóveis ou Casas)
2. Ajuste o valor da carta, entrada e taxa administrativa
3. Defina o número de parcelas
4. Clique em "Calcular"
5. Veja o resultado detalhado no painel direito

### Contato
1. Preencha seu nome, telefone e e-mail
2. Selecione o tipo de consórcio que tem interesse
3. Adicione uma mensagem (opcional)
4. Clique em "Enviar mensagem"
5. Receba confirmação visual

### Planos Rápidos
- Clique nos botões "Simular este plano" para pré-preencer o simulador com valores sugeridos

## 📊 Estrutura de Dados

### Lead (Contato)
```javascript
{
  id: "lead_timestamp",
  nome: "string",
  telefone: "string",
  email: "string",
  interesse: "auto|casa",
  mensagem: "string",
  createdAt: "ISO timestamp"
}
```

### Simulação
```javascript
{
  tipo: "auto|casa",
  valor: number,
  entrada: number,
  prazo: number,
  taxa: number,
  timestamp: "ISO timestamp"
}
```

## 🔧 Funcionalidades Técnicas

### LocalStorage Keys
- `rm_consorcios_leads_v1` - Array de todos os leads/contatos
- `rm_consorcios_contato_atual` - Dados do último contato
- `rm_consorcios_ultima_sim` - Última simulação realizada

### JavaScript Functions

#### `inicializarPage()`
Inicializa todos os event listeners e carrega dados salvos

#### `calcular()`
Calcula as parcelas baseado nos valores inseridos
- Valida prazos conforme plano
- Aplica taxa de administração
- Formata resultado para moeda brasileira

#### `fillSimulator(type, price, min, max)`
Pré-preenche o simulador com valores dos planos

#### `submitForm(e)`
Processa envio do formulário de contato
- Valida campos obrigatórios
- Salva no localStorage
- Mostra notificação

#### `mostrarToast(texto)`
Exibe notificação visual temporária

#### `carregarDadosSalvos()`
Recupera dados anteriores do localStorage

## 📱 Responsividade

- **Desktop**: Layout completo com 2 colunas no simulador
- **Tablet**: Grid adaptativo, navegação compacta
- **Mobile**: Layout em coluna única, botões em tela cheia

## 🎨 Cores e Tema

- **Primária**: #0f62fe (Azul corporativo)
- **Primária Escura**: #0043ce (Azul escuro)
- **Secundária**: #edf3ff (Azul muito claro)
- **Texto**: #1f2937 (Cinza escuro)
- **Muted**: #6b7280 (Cinza médio)

## 📝 Notas Importantes

- Todos os valores de simulação são **ilustrativos**
- Taxa de administração é aplicada sobre o valor total
- Prazos válidos variam conforme o plano:
  - Automóveis: 60-120 meses
  - Casas: 120-180 meses
- Para propostas reais, entre em contato com Rosani

## 🔒 Privacidade

- Dados salvos apenas no navegador do usuário
- Nenhuma informação é enviada para servidores
- Usuário pode limpar dados do navegador a qualquer momento
- Para integração real, adicionar backend de autenticação e segurança

## 📦 Arquivos

- `index.html` - Estrutura HTML completa
- `style.css` - Estilos e responsividade
- `script.js` - Lógica interativa e funcionalidades

## 🎯 Próximos Passos (Sugestões)

1. Integrar com backend para salvar leads
2. Adicionar integração com WhatsApp
3. Implementar autenticação para painel de admin
4. Adicionar análise de dados dos leads
5. Sistema de e-mail automático
6. Mais opções de customização de planos
7. Gráficos de evolução de pagamento
8. PDF de proposta para download

---

**Desenvolvido com ❤️ para Rosani Machado - Consórcios**
