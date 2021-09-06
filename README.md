[![Netlify Status](https://api.netlify.com/api/v1/badges/59c7250f-f817-44c9-9a82-8d2199ce5d8a/deploy-status)](https://app.netlify.com/sites/vtt-beerholders/deploys)

A Virtual Tabletop for the final assignment of Web Development at CEFET-MG.

**Note:** Currently the `/public/vtt-tmp` has all the html/css base/"design". Those files are accessible in the deployed app, [see an example here](https://vtt-beerholders.netlify.app/vtt-tmp/assets/compendium/compendium.html).

## Extras

- Gestão de usuários:
  1. [ ] (4%) Receber e-mail ao se cadastrar
  1. [ ] (3%) Fluxo de "esqueci minha senha"
  1. [ ] (5%) Integração com autenticação por 3ºs
  1. [ ] (3-7%) Possibilidade de alterar dados do perfil
  1. [ ] (5%) Autenticação de 2 fatores
- Engenharia de Software:
  1. [ ] (1-10%) Testes automatizados
  1. [x] (2-6%) Processo de _build_ para _assets_ do _front-end_:
     - [x] Minimizar arquivos CSS e JS
     - [x] Eliminação de código morto JS
     - [ ] Otimização de imagens
     - [x] Pré-processamento de CSS e JS
  1. [x] (5%) Integração contínua durante o desenvolvimento (_build_ + teste + _deploy_) -> Branch preview por PR no Frontend com proxy no Backend (esse tem deploy só na main) para otimização de custos 💰
  1. [x] (5%) Uso de _containers_ (eg Docker) para isolar ambientes e torná-los facilmente reprodutíveis
  1. [x] (5%) Descrição histórias de usuário [Parcial 😅]
     - [x] (+5%) Uso de _pull requests_ (PRs) para cada história
       - [x] (+5%) _Code review_ de todos os PRs
- Integração:
  1. [x] (5-10%) APIs de terceiros para fornecer dados do usuário (eg, biblioteca de jogos no Steam, músicas do usuário no Spotify)
  1. [ ] (3-7%) APIs "cosméticas" (eg, previsão do tempo para fazer algum efeitinho)
  1. [ ] (6%) APIs de serviço de hospedagem (eg, da AWS para armazenar fotos enviadas por usuários)
- Inteligência:
  1. [ ] (5-13%) Alguma inteligência além de um CRUD. Exemplos:
     - Algoritmos de recuperação da informação
     - Algoritmos de aprendizado de máquina
     - Algoritmos de alocação de recursos/tarefas, _match-making_, problema da mochila, determinação de caminhos...
     - Algoritmos de computação gráfica _off-line_ (eg, _ray tracing_)
- _Back-end_:
  1. [ ] (4%) Agendamento de funções do _back-end_ para executar de tempos em tempos (eg, processar o ataque do reino de um jogador a outro)
  1. [ ] (5-9%) Uso de uma fila para execução de tarefas com duração maior
  1. [ ] (6%) Propagação de atualização do _back-end_ para o _front-end_ (eg, usando Web Sockets diretamente ou alguns bancos NoSQL reativos)
  1. [x] (3%) Camada de dados RESTful
  1. [ ] (6%) Camada de dados GraphQL
  1. [ ] (5%) _Upload_ de arquivos
- _Front-end_:
  1. [ ] (7%) Todas as páginas _responsive_
  1. [ ] (3%) Modo escuro
  1. [x] (2-5%) Animações, transições e efeitos visuais diversos (onde fizer sentido)
     - [ ] (2%) Modo com menos animações
  1. [ ] (2%) Modo de impressão (se fizer sentido)
  1. [x] (5%) Organização em componentes
  1. [ ] (3-10%) Uso de APIs do HTML5 (vide seminário)
  1. [x] (2-10%) Interatividade para melhorar a experiência de uso (eg, a [Ovelhita][ovelhas] na página das ovelhas)

## Getting Started

### Connecting with the Backend

#### Option 1: With backend running locally

Checkout to the [api-vtt](https://github.com/beerholders/api-vtt) and execute the local devloop setup. The app will run with the default url `http://localhost:3001/api`.

Then run the development server:

```bash
npm run dev
```

#### Option 2: With an external backend

Our auto-deployed backend server: `https://api-vtt.herokuapp.com`

Run the development server specifying the backend url:

```bash
BACKEND_URL=https://api-vtt.herokuapp.com npm run dev
```

#### Done!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Folder structure

#### `/pages`

Application pages, note that it follows [Next.js route definition](https://nextjs.org/docs/basic-features/pages).

#### `/components`

General shared components to be used in the pages.

#### `/public`

General assets mounted from the `/` route, e.g.: images.

Currently the `/public/vtt-tmp` has the html/css base to the application. Those will gradually be migrated to React routes.

#### `/styles`

Application styles

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Netlify

This application is automatically deployed to Netlify. You can preview it [here](https://vtt-beerholders.netlify.app/)
