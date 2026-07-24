# AI Context — Dinos Party 🦖

Contexto permanente para agentes de IA. Baseado exclusivamente no código existente.

---

## 1. Nome e Objetivo

- **Nome:** Dinos Party ("O 1º Rugido do Théo")
- **Objetivo:** Página web de convite interativo para festa de aniversário de 1 ano. Inclui timeline de fotos dos 12 meses, galeria de momentos, player de música temático, detalhes do evento, formulário RSVP e sugestões de presentes.
- **Público:** Familiares e amigos convidados.
- **Tema:** Dinossauros / selva pré-histórica, paleta de verdes e tons terrosos.

---

## 2. Tecnologias e Dependências

### Stack principal
- **HTML5 puro** — sem frameworks JS (React, Vue, Angular)
- **Tailwind CSS v3** (CDN, plugins `forms` + `container-queries`) — framework CSS utilitário
- **CSS customizado** em `css/styles.css`
- **JavaScript vanilla (ES6+)** — toda a lógica em `js/main.js`

### Dependências externas (CDNs, requerem internet)
| Recurso | Origem | Finalidade |
|---|---|---|
| Tailwind CSS | `cdn.tailwindcss.com` | Estilização |
| Swiper.js 11 | `cdn.jsdelivr.net/npm/swiper@11` | Carrossel touch |
| Google Fonts | `fonts.googleapis.com` | Fontes Plus Jakarta Sans + Be Vietnam Pro |
| Material Symbols | `fonts.googleapis.com` | Ícones |

### Serviços externos (requerem internet)
| Serviço | Uso |
|---|---|
| **SheetDB.io** | API REST que persiste RSVPs em Google Sheets (POST apenas) |
| **Google Maps Embed** | Mapa do local da festa |
| **Google Calendar** | Link para criar evento no calendário |
| **Amazon Wishlist** | Link para lista de presentes |

### Assets locais
- **Áudio:** `assets/audio/music.mp3` (música principal). Playlist referencia 5 faixas em `assets/audio/radio/` — estes arquivos **não existem atualmente**.
- **Imagens:** Avatar (`avatar.png`), ilustrações (`dino1.png`, `dino2.png`), fotos mensais (`mesversario/1.jpg` a `12.jpg` — atualmente apenas 1-10 existem), galeria de momentos (`moments/` — ~130+ arquivos entre .jpg, .jpeg, .png, .mp4).

---

## 3. Estrutura de Diretórios

```
/home/ubuntu/projetos/dinos-party/
├── index.html              ← Ponto de entrada único
├── AI_CONTEXT.md           ← Este documento
├── .gitignore              ← Ignora .agent, .gemini, .DS_Store, Thumbs.db, *.log
├── README.md               ← Apenas o título (sem conteúdo útil)
│
├── assets/
│   ├── audio/              ← Músicas da playlist
│   │   ├── music.mp3
│   │   └── radio/          ← Faixas adicionais (não criadas)
│   └── img/
│       ├── avatar.png      ← Avatar principal
│       ├── dino1.png       ← Ilustração decorativa
│       ├── dino2.png       ← Ilustração decorativa
│       ├── mesversario/    ← Fotos mensais (1.jpg a N.jpg)
│       │   └── readme.txt  ← Instruções de nomenclatura
│       └── moments/        ← Galeria de fotos e vídeos
│
├── css/
│   └── styles.css          ← Estilos customizados
│
└── js/
    ├── config.js           ← Configuração de tema Tailwind (runtime CDN)
    └── main.js             ← Toda a lógica JavaScript
```

---

## 4. Arquitetura Geral

Página única estática com comportamento dinâmico via JavaScript vanilla. **Sem back-end próprio, sem bundler, sem build step.**

```
index.html (estrutura completa)
    │
    ├── Tailwind CDN → estilização
    ├── config.js → tema personalizado (cores, fontes, border-radius)
    ├── styles.css → ajustes de layout + otimizações iOS
    └── main.js → lógica principal
         │
         ├── Sound Overlay → solicita interação do usuário (autoplay policy)
         ├── Mesversários → barra de progresso interativa (12 meses)
         ├── Rádio Dino → player de áudio com playlist (6 faixas)
         ├── Galeria (Swiper) → carrossel de ~130+ mídias
         └── RSVP Form → POST para SheetDB.io + localStorage
```

### Fluxo principal
1. Usuário acessa `index.html`
2. Página carrega CDNs + assets + scripts
3. Sound overlay aparece (exige clique para iniciar áudio)
4. Ao clicar "OK": overlay some, música inicia, barra do player aparece
5. Mesversários: calcula % decorrido entre `2025-09-10` e `2026-09-10`, cria 12 botões, seleciona mês 1 automaticamente
6. Galeria: seleciona aleatoriamente 40 slides (20 no iOS), renderiza fotos/vídeos, inicializa Swiper com autoplay (4s)
7. Usuário interage: navega meses, carrossel, player, links externos
8. RSVP: formulário → POST SheetDB.io → `localStorage` marca como confirmado

---

## 5. Módulos e Componentes

| Módulo | Função | Arquivos envolvidos |
|---|---|---|
| **Sound Overlay** | Tela inicial obrigatória para iniciar áudio (autoplay policy) | HTML (`#volume-overlay`), JS |
| **Mesversários Timeline** | Barra de progresso segmentada em 12 meses. Ao clicar, exibe foto + texto descritivo hardcoded | HTML, JS (`initMesversarios()`), imagens em `mesversario/` |
| **Rádio Dino Player** | Player de áudio fixo no rodapé. Playlist de 6 faixas. Controles play/pause/skip. Auto-advance no `ended` do áudio. Disco animado com CSS spin | HTML (`#dino-radio-player`, `<audio>`), JS, `audio/music.mp3` |
| **Galeria de Momentos** | Carrossel Swiper com fotos e vídeos. Shuffle aleatório. Efeito blur no fundo (desktop) / fundo sólido (iOS). Play/Pause do autoplay | HTML, JS (Swiper API), CSS, imagens em `moments/` |
| **Formulário RSVP** | Campos: nome, quantidade pessoas, observação. POST para SheetDB.io. `localStorage` previne reenvio. Botão "Limpar" recarrega página | HTML, JS (fetch + localStorage) |
| **Favicon Dinâmico** | Cria `<link rel="icon">` com emoji 🦖 SVG + avatar.png | JS (executado no `DOMContentLoaded`) |
| **Detalhes da Festa** | Data/hora, local com mapa embed, links calendário + maps | HTML (hardcoded) |
| **Sugestões de Presentes** | Ícones de sugestões + link para lista Amazon | HTML (hardcoded) |

---

## 6. Gerenciamento de Estado e Persistência

- **Estado:** Variáveis JS locais (`currentTrackIndex`, `isPlaying`) — sem biblioteca de estado.
- **localStorage:** Chave `rsvp_confirmed` para evitar reenvio do RSVP.
- **SheetDB.io:** Único mecanismo de persistência remota — salva RSVPs em Google Sheets via POST.
- **Não há banco de dados relacional.** Todo conteúdo não-RSVP é estático (hardcoded no HTML/JS ou arquivos de mídia).

---

## 7. Observações para Futuros Desenvolvedores/Agentes

- **SheetDB API key está exposta** no `main.js` (visível publicamente). Considere migrar para backend próprio se necessário.
- **Playlist incompleta:** 5 faixas de `radio/` referenciadas mas não existentes. O player tem fallback que pula faixas faltantes.
- **Fotos de mesversário:** Instruções no `readme.txt` (nomear `N.jpg`). Atualmente existem 1-10; faltam 11 e 12.
- **Otimizações iOS:** Código com ajustes específicos para evitar crash de GPU (sem blur, sem loop, sem `will-change` em slides, limite de 20 slides).
- **Dependência de internet:** Não funciona offline (CDNs + APIs externas).
- **Tailwind via CDN:** Configuração de tema via `tailwind.config` runtime. Não funcionaria com a versão CLI/build.
- **Data hardcoded:** Festa em `2026-09-12`. Período dos mesversários: `2025-09-10` a `2026-09-10`.
- **Shuffle não-determinístico:** Galeria usa `Math.random()` — ordem muda a cada carregamento.
- **Sem testes automatizados.**
- **Sem autenticação.**
- **Sem build/deploy configurado.** Basta servir `index.html` em qualquer servidor HTTP estático (GitHub Pages, Netlify, etc.). Remote aponta para `github.com/RenanSS1/dinos-party.git`.
- **Licença:** Não identificada (sem arquivo LICENSE no repositório).

---

## 8. Como Executar

Requisição mínima: navegador moderno com internet. Abrir `index.html` diretamente ou via servidor HTTP estático:

```bash
# Opção 1: direto no navegador
open index.html

# Opção 2: servidor local (recomendado para áudio + fetch)
npx serve .
# ou
python3 -m http.server 8000
```

Não há build, testes ou processo de deploy automatizado configurado no código atual.