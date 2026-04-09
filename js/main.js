/**
 * Main logic for Dinos Party
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dinos Party initialized! 🦖');

    // --- Audio Control Logic ---
    const audio = document.getElementById('bg-music');
    const musicBtn = document.querySelector('button:has([data-icon="play_circle"]), button:has([data-icon="pause_circle"])');
    const musicIcon = musicBtn ? musicBtn.querySelector('.material-symbols-outlined') : null;
    const musicText = musicBtn ? musicBtn.querySelector('span:not(.material-symbols-outlined)') : null;

    const toggleMusic = () => {
        if (audio.paused) {
            audio.play().then(() => {
                updateMusicUI(true);
            }).catch(err => console.log("Erro ao tocar música:", err));
        } else {
            audio.pause();
            updateMusicUI(false);
        }
    };

    const updateMusicUI = (isPlaying) => {
        if (!musicIcon || !musicText) return;
        if (isPlaying) {
            musicIcon.textContent = 'pause_circle';
            musicIcon.style.fontVariationSettings = "'FILL' 1";
            musicText.textContent = 'Pausar Música';
        } else {
            musicIcon.textContent = 'play_circle';
            musicIcon.style.fontVariationSettings = "'FILL' 1";
            musicText.textContent = 'Ouvir Música';
        }
    };

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }

    const attemptAutoplay = () => {
        audio.play().then(() => {
            updateMusicUI(true);
            window.removeEventListener('click', attemptAutoplay);
            window.removeEventListener('touchstart', attemptAutoplay);
        }).catch(() => {});
    };

    attemptAutoplay();
    window.addEventListener('click', attemptAutoplay, { once: true });
    window.addEventListener('touchstart', attemptAutoplay, { once: true });


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

    const shuffleMedia = (array, count) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const renderMedia = () => {
        const wrapper = document.getElementById('moments-wrapper');
        if (!wrapper) return;

        const selectedMedia = shuffleMedia(allMedia, 40);

        selectedMedia.forEach(file => {
            const isVideo = file.toLowerCase().endsWith('.mp4');
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            if (isVideo) {
                slide.innerHTML = `
                    <video class="w-full aspect-[4/5] object-cover" autoplay muted loop playsinline
                           onerror="this.closest('.swiper-slide').remove()">
                        <source src="assets/img/moments/${file}" type="video/mp4">
                    </video>
                `;
            } else {
                slide.innerHTML = `
                    <img src="assets/img/moments/${file}" alt="Momento do Théo" 
                         class="w-full aspect-[4/5] object-cover" loading="lazy"
                         onerror="this.closest('.swiper-slide').remove()">
                `;
            }
            wrapper.appendChild(slide);
        });

        new Swiper('.moments-swiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
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
        });
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

        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Coleta de dados
            const formData = {
                data: [{
                    nome: document.getElementById('name').value,
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
