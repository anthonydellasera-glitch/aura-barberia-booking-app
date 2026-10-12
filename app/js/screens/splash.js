/* 1. Splash / Bienvenida — ported from 1._splash_bienvenida_1/code.html */
(function () {
  const SLIDES = [
    { title: 'Reserva tu corte con facilidad', text: 'Maestría artesanal, estilo contemporáneo y atención personalizada en cada detalle.' },
    { title: 'Elige a tu barbero de confianza', text: 'Perfiles, reseñas reales y galería de trabajos para encontrar a tu maestro ideal.' },
    { title: 'Rituales premium, cero esperas', text: 'Agenda en segundos, paga desde la app y recibe recordatorios antes de tu cita.' },
  ];

  App.register('splash', {
    title: 'Bienvenida',
    render({ data, App }) {
      return `
<div class="relative w-full h-full min-h-full flex flex-col justify-between overflow-hidden bg-black text-white font-sans antialiased select-none">
  <div class="absolute inset-0 w-full h-full bg-cover bg-center" style="background-image:url('${data.IMG.splash}')"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-40% to-black/40 pointer-events-none"></div>
  <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none"></div>
  <div class="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#1F5C46]/20 rounded-full blur-3xl pointer-events-none"></div>

  <header class="relative z-10 flex flex-col items-center pt-safe px-6 text-center mt-10">
    <div class="relative flex items-center justify-center mb-3">
      <img src="${data.IMG.logo}" alt="Logo Aura Barbería" class="h-10 w-auto object-contain drop-shadow-md">
    </div>
    <h2 class="font-sans font-bold text-lg tracking-[0.25em] uppercase text-white/95 drop-shadow-sm">Aura Barbería</h2>
    <span class="text-[11px] uppercase tracking-[0.3em] text-[#b2f0d3] font-semibold mt-1">Corte Clásico &amp; Contemporáneo</span>
  </header>

  <div class="relative z-10 flex flex-col px-6 pb-safe mb-8">
    <div class="max-w-md mx-auto w-full flex flex-col">
      <div class="mb-6 space-y-3 min-h-[148px] flex flex-col justify-end" id="slideText">
        <h1 class="text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md" id="slideTitle">${SLIDES[0].title}</h1>
        <p class="text-base text-cream-muted/80 leading-relaxed font-normal" id="slideBody">${SLIDES[0].text}</p>
      </div>
      <div aria-label="Indicadores de carrusel" class="flex items-center gap-2 mb-8" role="tablist" id="dots">
        ${SLIDES.map((_, i) => `<button data-slide="${i}" aria-label="Diapositiva ${i + 1}" class="h-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'w-7 bg-[#10b981] shadow-sm' : 'w-1.5 bg-white/30'}"></button>`).join('')}
      </div>
      <button data-nav="#/registro" class="w-full h-[52px] rounded-2xl bg-[#1F5C46] hover:bg-[#164333] active:scale-[0.99] transition-all duration-200 shadow-xl shadow-black/40 text-white font-semibold text-base flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/20 group" type="button">
        <span>Comenzar</span>
        <span class="material-symbols-outlined text-xl transition-transform duration-200 group-hover:translate-x-0.5">arrow_forward</span>
      </button>
      <div class="mt-4 text-center">
        <p class="text-sm text-neutral-400">¿Ya tienes una cuenta?
          <a class="text-white font-medium hover:text-[#b2f0d3] transition-colors ml-1" href="#/login">Iniciar sesión</a>
        </p>
      </div>
    </div>
  </div>
</div>`;
    },
    mount(root) {
      let i = 0;
      const title = root.querySelector('#slideTitle'), body = root.querySelector('#slideBody'), text = root.querySelector('#slideText');
      const dots = [...root.querySelectorAll('[data-slide]')];
      function show(n) {
        i = n;
        text.style.transition = 'opacity .25s'; text.style.opacity = 0;
        setTimeout(() => { title.textContent = SLIDES[i].title; body.textContent = SLIDES[i].text; text.style.opacity = 1; }, 220);
        dots.forEach((d, k) => { d.className = `h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-7 bg-[#10b981] shadow-sm' : 'w-1.5 bg-white/30'}`; });
      }
      dots.forEach(d => d.addEventListener('click', () => { show(+d.dataset.slide); restart(); }));
      let timer; const restart = () => { clearInterval(timer); timer = setInterval(() => show((i + 1) % SLIDES.length), 4000); };
      restart();
      return () => clearInterval(timer);
    },
  });
})();
