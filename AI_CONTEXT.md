# AI_CONTEXT

## Visão geral do projeto
Este repositório é um site estático de convite de aniversário, com tema jurássico e foco em uma experiência visual comemorativa para uma festa infantil. O projeto é estruturado como uma landing page single-page, com conteúdo estático em HTML, estilos customizados e interatividade via JavaScript.

## Objetivo principal
Apresentar um convite digital para a festa do Théo, com:
- destaque para a data, local e detalhes da festa;
- uma galeria de fotos e vídeos;
- uma barra de mesversários interativa;
- um player de áudio/rádio com overlay de volume;
- um formulário de confirmação de presença integrado a uma API externa (SheetDB).

## Arquitetura atual
### 1. Estrutura de arquivos
- index.html: estrutura principal da página.
- css/styles.css: estilos customizados adicionais para ajustes de layout, animações e compatibilidade mobile.
- js/config.js: configuração do Tailwind, incluindo cores, tipografia e raios de borda.
- js/main.js: lógica principal da aplicação, incluindo:
  - inicialização do DOM;
  - comportamento da barra de mesversários;
  - controle de áudio e overlay de volume;
  - renderização da galeria Swiper;
  - envio do formulário de RSVP.
- assets/: pasta de mídia.
  - assets/audio/: arquivos de áudio e trilhas.
  - assets/img/: imagens, avatar, fotos de mesversários e galeria de momentos.

### 2. Padrão de frontend
- O projeto é totalmente frontend e não utiliza bundler, framework ou backend.
- A renderização é feita diretamente no navegador.
- O HTML é servido como página estática.

### 3. Estilo e UI
- A interface usa Tailwind CSS via CDN.
- Os estilos globais e ajustes específicos são definidos em CSS customizado.
- Há uso de componentes visuais como cards, botões, seções e layout responsivo para mobile-first.

### 4. Interatividade
A lógica em JavaScript responde a vários elementos da página:
- clique nos segmentos da barra de mesversários para exibir detalhes por mês;
- reprodução de áudio com play/pause/avançar/voltar;
- overlay inicial para permitir interação do usuário antes do áudio;
- rotação automática da galeria com Swiper;
- envio de confirmação de presença para uma API externa.

## Fluxo de funcionamento
1. O usuário abre o arquivo index.html no navegador.
2. O HTML monta a estrutura principal do convite.
3. O JavaScript inicializa os componentes interativos após o carregamento do DOM.
4. O conteúdo multimídia é carregado a partir da pasta assets.
5. O formulário de RSVP envia dados para a API do SheetDB, e o resultado é persistido localmente em localStorage.

## Dependências externas
- Tailwind CSS via CDN.
- Swiper.js via CDN.
- Google Fonts.
- Material Symbols via Google Fonts.
- SheetDB para o formulário de confirmação.

## Observações importantes
- O projeto parece ser voltado para um ambiente estático simples, sem build system.
- Há tratamento específico para iOS no script e no CSS, indicando preocupação com desempenho e compatibilidade mobile.
- O projeto depende de arquivos de mídia presentes em assets/ para renderizar corretamente a experiência completa.

## Pontos de atenção para manutenção
- Para alterar conteúdo textual da festa, o ponto principal é index.html.
- Para ajustar o visual, revisar css/styles.css e o bloco de configuração do Tailwind em js/config.js.
- Para mudar regras de comportamento, revisar js/main.js.
- Para adicionar ou trocar mídia, usar os diretórios em assets/img e assets/audio.
