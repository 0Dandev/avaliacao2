# 🎓 Estudo de Caso: Sistema de Gestão de Alunos (Web & Mobile)

Este repositório contém a solução completa para a Avaliação 2, implementando uma aplicação fullstack (Frontend Web e Mobile) para consumo de API, rotas dinâmicas e testes automatizados.

## 🔗 Deploy (Aplicação Web)

Acesse a aplicação rodando em produção na Vercel:
👉 **[https://avaliacao2-henna.vercel.app]**

---

## 🚀 Tecnologias Utilizadas

O projeto foi estruturado como um monorepo contendo duas aplicações distintas:

### 💻 Web (`/web`)
* **Core:** React, Vite
* **Estilização:** React Bootstrap + CSS Customizado (Tema Futurista/Glassmorphism)
* **Rotas:** React Router DOM
* **HTTP:** Axios (com configuração de Proxy para CORS)
* **Testes:** Vitest + React Testing Library

### 📱 Mobile (`/mobile`)
* **Core:** React Native, Expo
* **Roteamento:** Expo Router (File-based routing)
* **HTTP:** Axios

---

## ✨ Funcionalidades Implementadas

### Aplicação Web
- [x] **Listagem de Alunos:** Consumo de API REST com feedback de carregamento.
- [x] **Detalhes do Aluno:** Rota dinâmica (`/aluno/:id`) exibindo dados específicos.
- [x] **Cadastro (Bônus):** Formulário para adicionar novos alunos (POST).
- [x] **Exclusão (Bônus):** Funcionalidade para remover alunos (DELETE).
- [x] **Design Premium:** Interface com tema escuro, efeitos de neon suave e glassmorphism.
- [x] **Testes Automatizados:** Teste unitário verificando a renderização da Home.

### Aplicação Mobile
- [x] **Lista Mobile:** FlatList otimizada consumindo a mesma API.
- [x] **Navegação Stack:** Transição fluida entre Lista e Detalhes.
- [x] **Tratamento de Erros:** Exibição amigável em caso de falha na rede.

---

## 🛠️ Como Rodar Localmente

Pré-requisitos: Node.js instalado.

### 1. Clonar o repositório
```bash
git clone [https://github.com/0Dandev/avaliacao2.git](https://github.com/0Dandev/avaliacao2.git)
cd avaliacao2

 2. Rodar a Aplicação Web
    cd web
    npm install
    npm run dev

 3. Rodar a Aplicação Mobile
    cd mobile
    npm install
    npx expo start

Testes Automatizados (Web)
cd web
npm test

Estrutura de Pastas

AVALIACAO02/
├── web/                # Projeto React + Vite
│   ├── src/
│   │   ├── pages/      # Home, DetalhesAluno, NovoAluno
│   │   ├── index.css   # Estilização Global (Tema Neon)
│   │   └── ...
│   ├── vercel.json     # Configuração de Proxy para Produção
│   └── ...
│
├── mobile/             # Projeto React Native + Expo
│   ├── app/            # Rotas do Expo Router (index, [id])
│   └── ...
│
└── README.md           # Documentação do Projeto

Notas de Desenvolvimento

Proxy Reverso: Foi configurado um arquivo vercel.json na pasta web para lidar com problemas de CORS ao consumir a API proweb.leoproti.com.br em produção.

Design System: O CSS utiliza variáveis globais para facilitar a manutenção do tema escuro e dos efeitos de transparência.

Desenvolvido por Dannylo Stevan Rodrigues Dias
