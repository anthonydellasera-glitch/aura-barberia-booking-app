/* 3. Inicio — ported from 3._inicio/code.html */
(function () {
  App.register('inicio', {
    title: 'Inicio',
    render({ data, App }) {
      const user = App.state.user;
      const firstName = user.firstName || user.name.split(' ')[0] || 'Mateo';
      const unreadCount = App.unreadCount();
      const upcomingBooking = App.booking.upcoming()[0];
      let upcomingBarber = null;
      if (upcomingBooking) {
        upcomingBarber = App.barber(upcomingBooking.barberId);
      }

      // Popular services
      const popServices = data.SERVICES.filter(s => s.popular);
      // Top 2 barbers
      const recBarbers = data.BARBERS.slice(0, 2);

      return `
<div class="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
  ${App.ui.appHeader('Inicio')}

  <main class="flex flex-col relative w-full px-margin pt-20 pb-28 bg-surface min-h-screen">
    <div class="flex flex-col w-full gap-space-xl">
      <!-- Personalized User Header -->
      <section class="flex items-center justify-between pt-space-xs">
        <div class="flex items-center gap-space-md">
          <div class="relative cursor-pointer" data-nav="#/perfil">
            <img alt="${firstName}" class="w-[52px] h-[52px] rounded-full object-cover shadow-sm bg-surface-container" src="${data.IMG.avatar}">
            <span class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-primary-fixed border-[2px] border-surface"></span>
          </div>
          <div class="flex flex-col">
            <span class="font-headline-lg text-headline-lg text-on-surface tracking-tight">¡Hola, ${firstName}!</span>
            <span class="font-body-sm text-body-sm text-secondary">¿Listo para tu próximo corte?</span>
          </div>
        </div>
        <div class="flex items-center">
          <button data-nav="#/notificaciones" aria-label="Notificaciones" class="relative w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface shadow-sm active:scale-95 transition-transform">
            <span class="material-symbols-outlined text-[22px]">notifications</span>
            ${unreadCount > 0 ? `
            <span class="absolute top-2 right-2 flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
            </span>` : ''}
          </button>
        </div>
      </section>

      ${upcomingBooking && upcomingBarber ? `
      <!-- Próxima Cita Card (Interactive) -->
      <section class="bg-surface-container-lowest border border-primary-container/20 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow" data-nav="#/reservas">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-primary-fixed/40 flex flex-col items-center justify-center text-primary-container">
            <span class="material-symbols-outlined text-[20px]">calendar_month</span>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary-container font-bold">Próxima cita</span>
              <span class="font-body-sm text-[11px] text-secondary">(${App.fmt.relative(upcomingBooking.date)})</span>
            </div>
            <span class="font-headline-md text-headline-md text-on-surface leading-tight mt-0.5">
              ${App.booking.title(upcomingBooking.serviceIds)}
            </span>
            <span class="font-body-sm text-body-sm text-secondary">
              ${App.fmt.dateShort(upcomingBooking.date)} · ${App.fmt.time12(upcomingBooking.time)} con ${upcomingBarber.name}
            </span>
          </div>
        </div>
        <span class="material-symbols-outlined text-secondary">chevron_right</span>
      </section>` : ''}

      <!-- Premium Search Bar -->
      <section class="w-full">
        <form id="searchForm" class="flex items-center bg-surface-container-lowest rounded-2xl px-space-md py-space-sm shadow-sm border border-black/[0.04]">
          <span class="material-symbols-outlined text-secondary text-[22px] mr-space-sm select-none">search</span>
          <input id="searchInput" class="w-full bg-transparent border-0 p-0 font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" placeholder="Busca barbero, servicio o corte..." type="text">
          <button type="submit" aria-label="Buscar" class="ml-space-sm w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low text-primary-container active:scale-95 transition-transform">
            <span class="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </form>
      </section>

      <!-- Forest Green Promotional Banner -->
      <section class="relative overflow-hidden bg-primary-container rounded-2xl p-space-lg shadow-md text-on-primary">
        <div class="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-primary-fixed-dim/10 pointer-events-none blur-xl"></div>
        <div class="absolute top-0 right-0 w-36 h-36 rounded-full bg-primary/20 pointer-events-none -mr-8 -mt-8"></div>
        <div class="relative z-10 flex flex-col justify-between max-w-[62%]">
          <div>
            <span class="inline-block bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider px-2.5 py-1 rounded-full mb-space-sm shadow-sm">
              Oferta Exclusiva
            </span>
            <h2 class="font-headline-lg text-headline-lg text-surface-container-lowest leading-tight tracking-tight mt-1">
              20% de descuento en tu primer corte completo
            </h2>
          </div>
          <div class="mt-space-md">
            <button id="promoBookBtn" class="h-10 px-space-md rounded-xl bg-surface-container-lowest text-primary-container font-label-md text-label-md shadow-sm active:scale-95 transition-all flex items-center gap-1.5 hover:bg-surface-container-low">
              <span>Reservar ahora</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
        <!-- Cutout Barbershop Graphic Placeholder -->
        <div class="absolute right-0 bottom-0 w-36 h-full flex items-end justify-end pointer-events-none">
          <img class="h-[128px] w-auto object-cover object-left-bottom rounded-br-2xl opacity-95" src="${data.IMG.promo}" alt="Promoción">
        </div>
      </section>

      <!-- Popular Services Section -->
      <section class="flex flex-col gap-space-md">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <h3 class="font-headline-md text-headline-md text-on-surface tracking-tight">Servicios populares</h3>
            <span class="font-body-sm text-body-sm text-secondary">Los cortes más solicitados</span>
          </div>
          <button data-nav="#/servicios" class="font-label-md text-label-md text-primary-container hover:underline">
            Ver todos
          </button>
        </div>
        <!-- Horizontal Scrollable Services Strip -->
        <div class="flex gap-space-md overflow-x-auto pb-2 -mx-margin px-margin no-scrollbar">
          ${popServices.map(srv => `
          <div class="min-w-[210px] bg-surface-container-lowest rounded-2xl p-space-md flex flex-col justify-between shadow-sm active:scale-[0.99] transition-transform">
            <div class="flex items-start justify-between">
              <div class="w-10 h-10 rounded-xl ${srv.id === 'signature' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-primary-container'} flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">${srv.icon}</span>
              </div>
              ${srv.recommended ? `
              <span class="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full uppercase tracking-wider">
                Popular
              </span>` : `
              <span class="font-body-sm text-body-sm text-secondary flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">schedule</span> ${srv.duration} min
              </span>`}
            </div>
            <div class="mt-space-lg">
              <h4 class="font-label-lg text-label-lg text-on-surface leading-snug">${srv.shortName || srv.name}</h4>
              <div class="flex items-center justify-between mt-space-sm pt-space-xs">
                <span class="font-headline-md text-headline-md text-primary-container">${App.fmt.money(srv.price)}</span>
                <button class="add-service-btn w-7 h-7 rounded-full bg-surface-container-low text-primary-container flex items-center justify-center active:bg-primary-container active:text-on-primary transition-colors" data-id="${srv.id}">
                  <span class="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </section>

      <!-- Recommended Barbers Section -->
      <section class="flex flex-col gap-space-md">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <h3 class="font-headline-md text-headline-md text-on-surface tracking-tight">Barberos recomendados</h3>
            <span class="font-body-sm text-body-sm text-secondary">Expertos en arte capilar y barbería</span>
          </div>
          <button data-nav="#/barberos" class="font-label-md text-label-md text-primary-container hover:underline">
            Ver barberos
          </button>
        </div>
        <!-- Barber Cards Stack -->
        <div class="flex flex-col gap-space-md">
          ${recBarbers.map(barber => `
          <div class="bg-surface-container-lowest rounded-2xl p-space-md flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-shadow" data-nav="#/barbero/${barber.id}">
            <div class="flex items-center gap-space-md">
              <img class="w-16 h-20 rounded-xl object-cover shadow-sm bg-surface-container" src="${barber.thumb}" alt="${barber.name}">
              <div class="flex flex-col">
                <div class="flex items-center gap-1.5">
                  <span class="font-headline-md text-headline-md text-on-surface leading-tight">${barber.name}</span>
                </div>
                <span class="font-label-sm text-label-sm text-primary-container uppercase tracking-wider mt-0.5">${barber.shortSpecialty}</span>
                <span class="font-body-sm text-body-sm text-secondary mt-0.5">${barber.years} años de experiencia</span>
                <div class="flex items-center gap-1 mt-1 bg-surface-container-low px-2 py-0.5 rounded-full w-fit">
                  <span class="material-symbols-outlined text-amber-500 text-[14px] fill-1">star</span>
                  <span class="font-label-sm text-label-sm text-on-surface">${barber.rating}</span>
                  <span class="font-body-sm text-[10px] text-secondary">(${barber.reviews} reseñas)</span>
                </div>
              </div>
            </div>
            <div>
              <button class="h-10 px-4 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md shadow-sm active:scale-95 transition-transform flex items-center" data-nav="#/barbero/${barber.id}">
                Agendar
              </button>
            </div>
          </div>`).join('')}
        </div>
      </section>
    </div>
  </main>

  ${App.ui.bottomNav('inicio')}
</div>`;
    },
    mount(root, { App }) {
      const form = root.querySelector('#searchForm');
      const input = root.querySelector('#searchInput');
      if (form && input) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const q = encodeURIComponent(input.value.trim());
          App.go(`#/barberos${q ? '?q=' + q : ''}`);
        });
      }

      const promoBtn = root.querySelector('#promoBookBtn');
      if (promoBtn) {
        promoBtn.addEventListener('click', () => {
          App.booking.reset();
          App.state.draft.promo = 'AURA20';
          App.save();
          App.ui.toast('Cupón AURA20 (20% OFF) aplicado');
          App.go('#/servicios');
        });
      }

      root.querySelectorAll('.add-service-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const sId = btn.dataset.id;
          App.booking.reset();
          App.booking.toggleService(sId);
          App.ui.toast('Servicio seleccionado');
          App.go('#/servicios');
        });
      });
    }
  });
})();
