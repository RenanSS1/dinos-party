/**
 * Main logic for Dinos Party
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dinos Party initialized! 🦖')    // --- Mesversários Progression and Detail Display Logic ---
    const initMesversarios = () => {
        const barContainer = document.getElementById('mesversarios-bar-container');
        const progressFill = document.getElementById('mesversarios-progress-fill');
        const footprint = document.getElementById('mesversario-footprint');
        const currentLabel = document.getElementById('mesversario-current-label');
        const detailCard = document.getElementById('mesversario-detail-card');
        const detailImg = document.getElementById('mesversario-detail-img');
        const imgPlaceholder = document.getElementById('mesversario-img-placeholder');
        const detailTitle = document.getElementById('mesversario-detail-title');
        const detailText = document.getElementById('mesversario-detail-text');

        if (!barContainer || !progressFill) return;

        const startDate = new Date('2025-09-10');
        const endDate = new Date('2026-09-10');
        const today = new Date();
        const total = endDate - startDate;
        const elapsed = today - startDate;
        const percent = Math.min(Math.max(elapsed / total, 0), 1);

        // Preenche a barra de forma contínua
        progressFill.style.width = `${percent * 100}%`;

        const texts = {
            1: "Meu primeiro mês de vida! Já sei dar sorrisos involuntários e amo o aconchego do colo.",
            2: "Dois meses de muito amor! Estou descobrindo minhas mãozinhas e fazendo os primeiros sons.",
            3: "Três meses! Durmo muito melhor à noite e adoro olhar para brinquedos coloridos.",
            4: "Quatro meses! Começando a tentar rolar e dando gargalhadas muito gostosas.",
            5: "Cinco meses! Seguro meus brinquedos com firmeza e reconheço rostos familiares.",
            6: "Seis meses! Introdução alimentar começou! Minha primeira papinha e já sento com apoio.",
            7: "Sete meses! Adoro brincar de se esconder e tentar alcançar as coisas ao redor.",
            8: "Oito meses! Começando a engatinhar e a explorar todos os cantos da casa.",
            9: "Nove meses! Consigo ficar de pé me apoiando nos móveis e balbucio 'mama' e 'papa'.",
            10: "Dez meses! Minha curiosidade está no máximo! Adoro bater palminhas e dar tchau.",
            11: "Onze meses! Quase um ano! Arriscando meus primeiros passos sem apoio.",
            12: "Um ano de vida! Aqui vamos fazer a nossa foto juntos em minha festinha de 1 ano!!!"
        };

        // Limpa o contêiner antes de gerar
        barContainer.innerHTML = '';

        // Cria os 12 dots interativos com tracks entre eles
        for (let i = 1; i <= 12; i++) {
            // Determina o estado do dot
            const isPast = percent > i / 12;
            const isCurrent = percent >= (i - 1) / 12 && percent < i / 12;
            const isActive = percent >= (i - 0.5) / 12;

            // Cria o dot (círculo clicável)
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'mesversario-dot';
            if (isPast) dot.classList.add('past');
            if (isCurrent) dot.classList.add('active');
            if (!isPast && !isCurrent) dot.classList.add('future');
            dot.dataset.month = i;

            const label = document.createElement('span');
            label.className = 'dot-label';
            label.textContent = i;
            dot.appendChild(label);

            // Evento de clique para mostrar os detalhes do mês
            dot.addEventListener('click', () => {
                // Remove destaque de outros dots
                barContainer.querySelectorAll('.mesversario-dot').forEach(d => {
                    d.classList.remove('active');
                });
                dot.classList.add('active');

                // Atualiza label indicador
                if (currentLabel) {
                    currentLabel.textContent = `Mês ${i} de 12`;
                }

                // Carrega informações no card de detalhes
                detailTitle.textContent = `${i}º Mês`;
                detailText.textContent = texts[i] || 'Momento especial do Théo!';

                // Exibe o card de detalhes
                detailCard.classList.remove('hidden');

                // Carrega a foto com fallback e loading
                detailImg.classList.add('hidden');
                imgPlaceholder.classList.remove('hidden');
                imgPlaceholder.textContent = 'Carregando...';

                const tempImg = new Image();
                tempImg.src = `assets/img/mesversario/${i}.jpg`;

                tempImg.onload = () => {
                    detailImg.src = tempImg.src;
                    detailImg.classList.remove('hidden');
                    imgPlaceholder.classList.add('hidden');
                };

                tempImg.onerror = () => {
                    detailImg.classList.add('hidden');
                    imgPlaceholder.classList.remove('hidden');
                    imgPlaceholder.textContent = 'Sem Foto';
                };
            });

            barContainer.appendChild(dot);

            // Adiciona track (conector) entre dots, exceto após o último
            if (i < 12) {
                const track = document.createElement('div');
                track.className = 'mesversario-track';
                if (percent > i / 12) {
                    track.classList.add('filled');
                }
                barContainer.appendChild(track);
            }
        }

        // Posiciona a pegada decorativa na barra
        const updateFootprint = () => {
            if (!footprint || !barContainer) return;
            const barWidth = barContainer.offsetWidth;
            const pos = percent * barWidth;
            const maxPos = barWidth - 20;
            footprint.style.left = `${Math.min(pos, maxPos)}px`;
        };

        // Atualiza label inicial
        if (currentLabel) {
            const currentMonth = Math.ceil(percent * 12) || 1;
            currentLabel.textContent = `Mês ${currentMonth} de 12`;
        }

        // Seleciona o primeiro mês por padrão ao carregar
        setTimeout(() => {
            const targetDot = barContainer.querySelector('.mesversario-dot[data-month="1"]');
            if (targetDot) {
                targetDot.click();
            } else {
                barContainer.querySelector('.mesversario-dot')?.click();
            }
            updateFootprint();
        }, 200);

        // Recalcula posição da pegada em resize (com debounce)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateFootprint, 100);
        });
    };

    initMesversarios();

    // --- Dynamic Favicons ---
    const linkSvg = document.createElement('link');
    linkSvg.rel = 'icon';
    linkSvg.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦖</text></svg>';
    document.head.appendChild(linkSvg);

    const linkPng = document.createElement('link');
    linkPng.rel = 'icon';
    linkPng.type = 'image/png';
    linkPng.href = 'assets/img/avatar.png';
    document.head.appendChild(linkPng);

    // --- Dino Radio Playlist Control Logic ---
    const audio = document.getElementById('bg-music');
    
    const volumeOverlay = document.getElementById('volume-overlay');
    const volumeOverlayBtn = document.getElementById('volume-overlay-btn');

    // Bottom bar elements
    const radioPlayBtn = document.getElementById('radio-play-btn');
    const radioPlayIcon = document.getElementById('radio-play-icon');
    const radioPrevBtn = document.getElementById('radio-prev-btn');
    const radioNextBtn = document.getElementById('radio-next-btn');
    const radioTrackTitle = document.getElementById('radio-track-title');
    const radioDiskIcon = document.getElementById('radio-disk-icon');

    // Playlist Definition
    const playlist = [
        { title: "Tema da Aventura", src: "assets/audio/music.mp3" },
        { title: "Dino Rádio - Faixa 1", src: "assets/audio/radio/1.mp3" },
        { title: "Dino Rádio - Faixa 2", src: "assets/audio/radio/2.mp3" },
        { title: "Dino Rádio - Faixa 3", src: "assets/audio/radio/3.mp3" },
        { title: "Dino Rádio - Faixa 4", src: "assets/audio/radio/4.mp3" },
        { title: "Dino Rádio - Faixa 5", src: "assets/audio/radio/5.mp3" }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    // Load a track from playlist
    const loadTrack = (index, shouldPlay = true) => {
        if (index < 0) index = playlist.length - 1;
        if (index >= playlist.length) index = 0;
        
        currentTrackIndex = index;
        audio.src = playlist[currentTrackIndex].src;
        if (radioTrackTitle) {
            radioTrackTitle.textContent = playlist[currentTrackIndex].title;
        }

        if (shouldPlay) {
            playAudio();
        } else {
            pauseAudio();
        }
    };

    const playAudio = () => {
        audio.play().then(() => {
            isPlaying = true;
            updateRadioUI(true);
        }).catch(err => {
            console.log("Erro ao tocar faixa:", err);
            // Fallback: se a música do rádio falhar (ex: arquivo não baixado), tenta a próxima
            if (currentTrackIndex !== 0) {
                console.log("Pulando faixa inexistente...");
                playNext();
            }
        });
    };

    const pauseAudio = () => {
        audio.pause();
        isPlaying = false;
        updateRadioUI(false);
    };

    const togglePlay = () => {
        if (audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    };

    const playNext = () => {
        loadTrack(currentTrackIndex + 1, true);
    };

    const playPrev = () => {
        loadTrack(currentTrackIndex - 1, true);
    };

    const updateRadioUI = (playing) => {
        // Sync Bottom Bar Player
        if (radioPlayIcon) {
            radioPlayIcon.textContent = playing ? 'pause' : 'play_arrow';
        }

        // Spin disk animation
        if (radioDiskIcon) {
            if (playing) {
                radioDiskIcon.classList.remove('play-state-paused');
                radioDiskIcon.classList.add('play-state-running');
            } else {
                radioDiskIcon.classList.remove('play-state-running');
                radioDiskIcon.classList.add('play-state-paused');
            }
        }
    };

    // Attach Event Listeners
    if (radioPlayBtn) {
        radioPlayBtn.addEventListener('click', togglePlay);
    }
    if (radioNextBtn) {
        radioNextBtn.addEventListener('click', playNext);
    }
    if (radioPrevBtn) {
        radioPrevBtn.addEventListener('click', playPrev);
    }

    // Auto-advance to next song
    audio.addEventListener('ended', playNext);

    // Initial Load without autoplaying immediately (unless started via overlay)
    loadTrack(0, false);

    // Volume overlay click action
    if (volumeOverlay && volumeOverlayBtn) {
        volumeOverlayBtn.addEventListener('click', () => {
            volumeOverlay.classList.add('opacity-0', 'pointer-events-none', 'hidden');
            // Inicia a música com interação do usuário
            playAudio();
        });
    }


    // --- Swiper & Media Gallery Logic ---

    // Lista completa de arquivos compatíveis (Atualizada)
    const allMedia = [
        "1766173589146.jpg", "1766173589151.jpg", "1766951263764.jpg", "1766951263772.jpg", "1766951263779.jpg",
        "1767738900786.jpg", "1767904620801.jpg", "1767904620807.jpg", "1769908110385.jpg", "1769908110392.jpg",
        "1769908110399.jpg", "1769908110405.jpg", "1769908110417.jpg", "1769908110425.jpg", "1769908110432.jpg",
        "1769908110439.jpg", "1769908110447.jpg", "1769908110460.jpeg", "1770768579821.jpg", "1770768579845.jpg",
        "1770768579853.jpg", "1770768579859.jpg", "1770768579866.jpg", "1770768579873.jpg", "1770768579879.jpg",
        "1770768579886.jpeg", "1770768579902.jpg", "1771350244404.png", "1771350244412.jpg", "1771350244419.jpg",
        "1771350288728.jpg", "1771350288743.jpg", "1771899325174.jpg", "1771899325182.jpg", "1771899325191.jpg",
        "1772398018551.jpg", "1772398018558.jpg", "1772398018564.jpg", "1772398018570.jpg", "1772398018577.jpg",
        "1772398018583.jpg", "IMG_0405~2.jpg", "IMG_20250910_162244.jpg", "IMG_20250910_162246.jpg", "IMG_20250910_163503.jpg",
        "IMG_20250910_171037.jpg", "IMG_20250911_151353.jpg", "IMG_20250911_151358.jpg", "IMG_20250911_151604.jpg",
        "IMG_20250912_114148.jpg", "IMG_20250912_114155.jpg", "IMG_20250913_121057.jpg", "IMG_20250913_144459.jpg",
        "IMG_20250913_144509.jpg", "IMG_20250913_163150.jpg", "IMG_20250913_164110.jpg", "IMG_20250914_124956.jpg",
        "IMG_20250914_125008.jpg", "IMG_20250914_125032.jpg", "IMG_20250914_201424.jpg", "IMG_20250915_111428.jpg",
        "IMG_20250915_111436.jpg", "IMG_20250916_121417.jpg", "IMG_20250916_203333.jpg", "IMG_20250916_204104.jpg",
        "IMG_20250917_092024.jpg", "IMG_20250917_172912.jpg", "IMG_20250917_172957.jpg", "IMG_20250917_174318.jpg",
        "IMG_20250918_111922.jpg", "IMG_20250918_111957.jpg", "IMG_20250919_094020.jpg", "IMG_20250920_095818.jpg",
        "IMG_20250920_095830.jpg", "IMG_20250920_142113.jpg", "IMG_20250921_154629.jpg", "IMG_20250921_165141.jpg",
        "IMG_20250922_160447.jpg", "IMG_20250922_160456.jpg", "IMG_20250922_172226.jpg", "IMG_20250923_081856.jpg",
        "IMG_20250923_081901.jpg", "IMG_20250924_110216.jpg", "IMG_20250924_110224.jpg", "IMG_20250924_115416.jpg",
        "IMG_20250924_120948.jpg", "IMG_20250924_120957.jpg", "IMG_20250925_104802.jpg", "IMG_20250926_094407.jpg",
        "IMG_20250926_193231.jpg", "IMG_20250927_125519.jpg", "IMG_20250929_141226.jpg", "IMG_20250930_194800.jpg",
        "IMG_20251001_090157.jpg", "IMG_20251001_145114.jpg", "IMG_20251001_184931.jpg", "IMG_20251002_095318.jpg",
        "IMG_20251002_114913.jpg", "IMG_20251003_102257.jpg", "IMG_20251004_145343.jpg", "IMG_20251004_162317.jpg",
        "IMG_20251004_162353.jpg", "IMG_20251004_162418.jpg", "IMG_20251010_155925.jpg", "IMG_20251010_184353.jpg",
        "IMG_20251010_193919.jpg", "IMG_20251010_193944.jpg", "IMG_20251011_091223.jpg", "IMG_20251015_183608.jpg",
        "IMG_20251018_132554.jpg", "IMG_20251018_132603.jpg", "IMG_20251018_133115.jpg", "IMG_20251018_133153.jpg",
        "IMG_20251020_201938.jpg", "IMG_20251031_192315.jpg", "IMG_20251101_112930.jpg", "IMG_20251102_091839.jpg",
        "IMG_20251102_114821.jpg", "IMG_20251104_183027.jpg", "IMG_20251108_175541.jpg", "IMG_20251108_175550.jpg",
        "IMG_20251109_111057.jpg", "IMG_20251110_183137.jpg", "IMG_20251110_183307.jpg", "IMG_20251110_183345.jpg",
        "IMG_20251110_183348.jpg", "IMG_20251110_183359.jpg", "IMG_20251110_200834.jpg", "IMG_20251113_130437.jpg",
        "IMG_20251115_195445.jpg", "IMG_20251115_195502.jpg", "IMG_20251115_195711.jpg", "IMG_20251115_195716.jpg",
        "IMG_20251115_195742.jpg", "IMG_20251115_195752.jpg", "IMG_20251115_200005.jpg", "IMG_20251115_201025.jpg",
        "IMG_20251116_113944.jpg", "IMG_20251116_113951.jpg", "IMG_20251122_113403.jpg", "IMG_20251122_113411.jpg",
        "IMG_20251122_113418.jpg", "IMG_20251122_115219.jpg", "IMG_20251122_115224.jpg", "IMG_20251122_124554.jpg",
        "IMG_20251128_143350.jpg", "IMG_20251128_143359.jpg", "IMG_20251201_091928.jpg", "IMG_20251201_091931.jpg",
        "IMG_20251201_092009.jpg", "IMG_20251207_153134.jpg", "IMG_20251207_153145.jpg", "IMG_20251213_163505.jpg",
        "IMG_20251213_163506.jpg", "IMG_20251220_144315.jpg", "IMG_20251224_131907.jpg", "IMG_20251225_181548.jpg",
        "IMG_20251225_181614.jpg", "IMG_20251225_181619.jpg", "IMG_20251225_181733.jpg", "IMG_20251225_181805_1.jpg",
        "IMG_20251225_181943.jpg", "IMG_20251225_182027.jpg", "IMG_20251225_182107.jpg", "IMG_20251227_183900.jpg",
        "IMG_20251227_184024.jpg", "IMG_20251227_184259.jpg", "IMG_20251227_184330.jpg", "IMG_20251227_184333_1.jpg",
        "IMG_20251227_184505.jpg", "IMG_20251227_184601.jpg", "IMG_20251227_184630.jpg", "IMG_20251227_192939.jpg",
        "IMG_20251227_193003.jpg", "IMG_20260201_143657.jpg", "IMG_20260201_143711.jpg", "IMG_20260201_143719.jpg",
        "IMG_20260201_154401.jpg", "IMG_20260201_180004.jpg", "IMG_20260210_192937.jpg", "IMG_20260215_195919.jpg",
        "IMG_20260301_104039.jpg", "IMG_20260301_112051.jpg", "IMG_20260315_163850.jpg", "IMG_20260315_163857.jpg",
        "IMG_20260315_163912.jpg", "IMG_20260315_163937.jpg", "IMG_20260315_164048.jpg", "IMG_20260315_164055.jpg",
        "IMG_20260315_164149.jpg", "IMG_20260315_164208.jpg", "IMG_20260315_164232.jpg", "IMG_20260315_164408.jpg",
        "IMG_20260315_164929.jpg", "IMG_20260315_164933.jpg", "IMG_20260315_164941.jpg", "IMG_20260315_170200.jpg",
        "IMG_20260321_155155.jpg", "IMG_20260321_155246.jpg", "IMG_20260321_155455.jpg", "IMG_20260321_155503.jpg",
        "IMG_20260321_155544.jpg", "IMG_20260321_155624.jpg", "IMG_20260321_155626.jpg", "MOVIE.mp4",
        "VID-20251021-WA0029.mp4", "VID-20260301-WA0081.mp4", "VID_20250911_151053.mp4", "VID_20250919_094025.mp4",
        "VID_20251101_114359.mp4", "VID_20251101_114806.mp4", "VID_20251101_114806_exported_0.jpg",
        "VID_20251109_110928.mp4", "VID_20251214_114248-CINEMATIC_MOMENT_VIDEO.mp4", "VID_20260201_151952.mp4"
    ];

    const shuffleMedia = (array, count = 40) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Detect iOS to avoid heavy CSS effects that cause crashes
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const renderMedia = () => {
        const wrapper = document.getElementById('moments-wrapper');
        if (!wrapper) return;

        // iOS: limit to 20 slides; Desktop: limit to 40 to reduce DOM pressure
        const selectedMedia = shuffleMedia(allMedia, isIOS ? 20 : 40);

        selectedMedia.forEach(file => {
            const isVideo = file.toLowerCase().endsWith('.mp4');
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            if (isVideo) {
                // On iOS: single video, solid dark background - NO blur (causes GPU crash)
                // On desktop: blurred video background
                const bgBlurEl = isIOS
                    ? ''
                    : `<video class="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none select-none" style="filter: blur(20px); transform: scale(1.1);" muted loop playsinline preload="none" aria-hidden="true">
                            <source src="assets/img/moments/${file}" type="video/mp4">
                        </video>`;

                slide.innerHTML = `
                    <div class="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center rounded-xl" style="background:#1a2e1e">
                        ${bgBlurEl}
                        <video class="relative z-10 w-full h-full object-contain" autoplay muted loop playsinline
                               onerror="this.closest('.swiper-slide').remove()" preload="none">
                            <source src="assets/img/moments/${file}" type="video/mp4">
                        </video>
                    </div>
                `;
            } else {
                // On iOS: NO blur background image - only foreground image on solid color bg
                // On desktop: blurred background image
                const innerHTML = isIOS
                    ? `<div class="relative w-full aspect-[4/5] overflow-hidden bg-[#0d1f13] flex items-center justify-center rounded-xl">
                            <img src="assets/img/moments/${file}" alt="Momento do Théo"
                                 class="w-full h-full object-contain" loading="lazy"
                                 onerror="this.closest('.swiper-slide').remove()">
                        </div>`
                    : `<div class="relative w-full aspect-[4/5] overflow-hidden bg-[#0d1f13] flex items-center justify-center rounded-xl">
                            <img src="assets/img/moments/${file}" class="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none" style="filter: blur(24px); transform: scale(1.1);" aria-hidden="true" loading="lazy">
                            <img src="assets/img/moments/${file}" alt="Momento do Théo"
                                 class="relative z-10 w-full h-full object-contain" loading="lazy"
                                 onerror="this.closest('.swiper-slide').remove()">
                        </div>`;

                slide.innerHTML = innerHTML;
            }
            wrapper.appendChild(slide);
        });

        const swiper = new Swiper('.moments-swiper', {
            // Loop OFF on iOS: loop mode clones ALL slides, doubling DOM memory usage
            loop: !isIOS,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 20,
            // On iOS: preload only 1 ahead - no clones, fewer images in memory
            lazyPreloadPrevNext: isIOS ? 1 : 3,
            watchSlidesProgress: true,
            loopAdditionalSlides: isIOS ? 0 : 3,
        });

        const playPauseBtn = document.getElementById('carousel-play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                const icon = playPauseBtn.querySelector('.material-symbols-outlined');
                if (swiper.autoplay.running) {
                    swiper.autoplay.stop();
                    icon.textContent = 'play_arrow';
                    playPauseBtn.setAttribute('aria-label', 'Iniciar rotação automática');
                } else {
                    swiper.autoplay.start();
                    icon.textContent = 'pause';
                    playPauseBtn.setAttribute('aria-label', 'Pausar rotação automática');
                }
            });
        }
    };

    renderMedia();

    // --- RSVP Form Logic (SheetDB Integration) ---
    const rsvpForm = document.querySelector('form');
    const rsvpBtn = rsvpForm ? rsvpForm.querySelector('button[type="submit"]') : null;
    const rsvpContainer = document.querySelector('#rsvp-section-container'); // Precisaremos adicionar este ID no HTML

    // Função para verificar se já confirmou
    const checkPreviousRSVP = () => {
        if (localStorage.getItem('rsvp_confirmed') === 'true') {
            if (rsvpForm) {
                rsvpForm.innerHTML = `
                    <div class="flex flex-col items-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-dashed border-green-200 dark:border-green-800 animate-pulse">
                        <span class="material-symbols-outlined text-6xl text-green-600 mb-4" style="font-variation-settings: 'FILL' 1;">task_alt</span>
                        <h4 class="text-xl font-bold text-green-800 dark:text-green-300">Presença Confirmada!</h4>
                        <p class="text-green-700 dark:text-green-400 text-center mt-2">Sua vaga no banquete dino já está garantida. Nos vemos lá!</p>
                        <button onclick="localStorage.removeItem('rsvp_confirmed'); location.reload();" class="mt-4 text-xs text-green-600 underline opacity-50 hover:opacity-100">Limpar e enviar outro (opcional)</button>
                    </div>
                `;
            }
        }
    };

    if (rsvpForm && rsvpBtn) {
        // Verifica ao carregar
        checkPreviousRSVP();

        // --- Validação do campo Nome ---
        const nameInput = document.getElementById('name');
        let nameErrorEl = null;

        const createNameError = () => {
            if (nameErrorEl) return;
            nameErrorEl = document.createElement('span');
            nameErrorEl.id = 'name-error';
            nameErrorEl.className = 'text-xs font-bold text-error mt-1 ml-1 block';
            nameErrorEl.style.display = 'none';
            nameInput.parentNode.appendChild(nameErrorEl);
        };

        const showNameError = (message) => {
            createNameError();
            nameErrorEl.textContent = message;
            nameErrorEl.style.display = 'block';
            nameInput.classList.add('ring-2', 'ring-error');
        };

        const clearNameError = () => {
            if (nameErrorEl) {
                nameErrorEl.style.display = 'none';
                nameErrorEl.textContent = '';
            }
            nameInput.classList.remove('ring-2', 'ring-error');
        };

        const validateName = (name) => {
            const trimmed = name.trim();
            if (!trimmed) {
                return 'O nome é obrigatório';
            }
            if (trimmed.length < 3) {
                return 'O nome deve ter pelo menos 3 caracteres';
            }
            if (trimmed.length > 100) {
                return 'O nome está muito longo';
            }
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(trimmed)) {
                return 'O nome deve conter apenas letras';
            }
            return null;
        };

        // Limpa erro ao digitar
        nameInput.addEventListener('input', clearNameError);

        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validação do nome
            clearNameError();
            const rawName = document.getElementById('name').value;
            const nameError = validateName(rawName);

            if (nameError) {
                showNameError(nameError);
                return;
            }

            // Coleta de dados (nome sanitizado)
            const formData = {
                data: [{
                    nome: rawName.trim(),
                    pessoas: document.getElementById('guests').value,
                    observacao: document.getElementById('obs').value,
                    data_confirmacao: new Date().toLocaleString('pt-BR')
                }]
            };

            // Estado de carregamento
            const originalText = rsvpBtn.textContent;
            rsvpBtn.disabled = true;
            rsvpBtn.textContent = 'Enviando...';

            try {
                const response = await fetch('https://sheetdb.io/api/v1/rqlpnoz2spupo', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Salva no localStorage para evitar reenvio
                    localStorage.setItem('rsvp_confirmed', 'true');

                    // Atualiza a UI imediatamente
                    checkPreviousRSVP();
                } else {
                    throw new Error('Erro na resposta do servidor');
                }
            } catch (error) {
                console.error('Erro ao enviar RSVP:', error);
                alert('Ops! Tivemos um pequeno problema jurássico ao salvar sua presença. Por favor, tente novamente.');
                rsvpBtn.disabled = false;
                rsvpBtn.textContent = originalText;
            }
        });
    }
});
