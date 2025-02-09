# Tutorial: Configurando um Monorepo com Linting Automatizado no GitHub Actions

Este tutorial descreve o passo a passo para configurar um monorepo básico com linting automatizado usando ESLint e GitHub Actions. Ele foi criado durante o desenvolvimento do projeto **Trading Card Game Lab**.

---

## 1. Estrutura Inicial do Monorepo

### **1.1. Criar a Estrutura de Pastas**
Criamos a seguinte estrutura de pastas para organizar o projeto:

```
/trading-card-game-lab
  /backend          # Backend em Node.js
    src/            # Código do backend
    package.json    # Dependências do backend
  /shared-components # Componentes compartilhados via Module Federation
  /microfrontends   # Microfrontends (React, Angular, Vue)
    /react-app      # Frontend em React
    /angular-app    # Frontend em Angular
    /vue-app        # Frontend em Vue
  .github/
    /workflows       # Workflows do GitHub Actions
      lint.yml       # Workflow de linting
  README.md          # Documentação inicial
  PLANO_DE_ACAO.md   # Plano de ação
  TUTORIAL.md        # Este tutorial
```

Comandos usados:
```bash
mkdir backend shared-components microfrontends .github
mkdir microfrontends/react-app microfrontends/angular-app microfrontends/vue-app
mkdir .github/workflows
```

---

## 2. Configuração do Monorepo com npm

### **2.1. Criar o `package.json` Global**
Inicializamos o monorepo com um `package.json` global usando o comando:
```bash
npm init -y
```

Adicionamos suporte a **workspaces** para gerenciar subprojetos:
```json
"workspaces": [
  "backend",
  "shared-components",
  "microfrontends/react-app",
  "microfrontends/angular-app",
  "microfrontends/vue-app"
]
```

---

## 3. Configuração do `.gitignore`

### **3.1. Criar o `.gitignore`**
Adicionamos um arquivo `.gitignore` para evitar que arquivos desnecessários sejam enviados ao repositório.

Conteúdo do `.gitignore`:
```gitignore
# Ignorar dependências instaladas
node_modules/

# Ignorar logs e dados temporários
*.log
*.tmp
.temp/

# Ignorar arquivos de IDEs
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# Ignorar arquivos de build
/dist/
/build/

# Ignorar arquivos específicos do macOS
.DS_Store

# Ignorar arquivos específicos do Windows
Thumbs.db

# Ignorar arquivos de cache
.cache/
npm-debug.log*

# Ignorar arquivos de ambiente
.env
.env.local
```

---

## 4. Configuração do ESLint

### **4.1. Instalar Dependências**
Instalamos o ESLint e o Prettier como dependências de desenvolvimento:
```bash
npm install eslint prettier eslint-config-prettier --save-dev
```

### **4.2. Criar o `eslint.config.js`**
Configuramos o ESLint com o novo formato de configuração (`eslint.config.js`).

Conteúdo do `eslint.config.js`:
```javascript
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "error",
    },
  },
  prettier,
];
```

Adicionamos `"type": "module"` ao `package.json` para suporte a ES Modules:
```json
"type": "module"
```

---

## 5. Configuração do GitHub Actions

### **5.1. Criar o Workflow de Linting**
Adicionamos um workflow no GitHub Actions para executar o linting automaticamente.

Conteúdo do `.github/workflows/lint.yml`:
```yaml
name: Lint Code

on:
  push:
    branches:
      - master
      - feature/**
  pull_request:
    branches:
      - master

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run ESLint
        run: npm run lint
```
