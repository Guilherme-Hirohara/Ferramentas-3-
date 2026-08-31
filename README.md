# 🛠️ Ferramentas 3 — Repositório de Utilitários Ionic & Angular

Bem-vindo ao **Ferramentas 3**! Este repositório é uma coleção centralizada de ferramentas, utilitários e aplicações mobile/web desenvolvidas utilizando **Ionic Framework** e **Angular**.

O objetivo deste projeto é fornecer uma suíte versátil de utilitários funcionais, componentes reutilizáveis e soluções de software focados em produtividade e facilidade do dia a dia.

---

## 🚀 Tecnologias Utilizadas

Este ecossistema utiliza as seguintes tecnologias modernas de desenvolvimento web e mobile:

* **[Ionic Framework](https://ionicframework.com/)**: UI toolkit para construção de experiências nativas e web de alto desempenho.
* **[Angular](https://angular.dev/)**: Framework de aplicação web para gerenciamento de componentes, rotas, serviços e estados.
* **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática e recursos avançados de JavaScript.
* **[Capacitor](https://capacitorjs.com/)**: Runtime nativo para execução cross-platform em Android e iOS.
* **RxJS**: Programação reativa para manipulação de eventos e fluxos assíncronos.
* **SASS / SCSS**: Estilização modular e temas personalizados.

---

## 📂 Estrutura do Repositório

```text
ferramentas-3/
├── src/
│   ├── app/
│   │   ├── components/  # Componentes reutilizáveis de interface
│   │   ├── pages/       # Telas e páginas das ferramentas
│   │   ├── services/    # Serviços, integrações e lógica de negócios
│   │   ├── guards/      # Guardas de rotas e segurança
│   │   └── models/      # Interfaces e definições de dados
│   ├── assets/          # Imagens, ícones e arquivos estáticos
│   └── theme/           # Variáveis de estilo globais e temas do Ionic
├── capacitor.config.ts  # Configurações do Capacitor para mobile
├── ionic.config.json    # Configurações do Ionic CLI
└── package.json         # Dependências do projeto e scripts
```

---

## ⚙️ Pré-requisitos

Antes de clonar e executar a aplicação, certifique-se de ter instalado em sua máquina:

* **Node.js**: Versão LTS recomendada (18.x ou superior)
* **npm** ou **yarn**: Gerenciador de pacotes
* **Ionic CLI**: Instalado globalmente

```bash
npm install -g @ionic/cli
```

---

## 🔧 Como Executar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ferramentas-3.git
   ```

2. **Acessar a pasta do repositório:**
   ```bash
   cd ferramentas-3
   ```

3. **Instalar as dependências:**
   ```bash
   npm install
   ```

4. **Executar o servidor de desenvolvimento:**
   ```bash
   ionic serve
   ```
   A aplicação estará acessível no navegador através do endereço `http://localhost:8100/`.

---

## 🧪 Testes e Qualidade

Para rodar os testes unitários do projeto:

```bash
npm run test
```
