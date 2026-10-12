/* 8. Mis Reservas — ported from 8._mis_reservas/code.html */
(function () {
  App.register('reservas', {
    title: 'Mis Reservas',
    render({ query, data, App }) {
      const activeTab = (query && query.tab) || 'upcoming';
      const upcoming = App.booking.upcoming();
      const past = App.booking.past();
      const cancelled = App.booking.cancelled();

      return `
<div class="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
  ${App.ui.appHeader('Reservas')}

  <main class="flex flex-col relative w-full px-margin pt-20 pb-32 bg-surface min-h-screen">
    <div class="flex flex-col w-full max-w-md mx-auto">
      <!-- Section Header -->
      <section class="flex flex-col pt-space-xs mb-space-md">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Mis Reservas</h1>
            <p class="font-body-sm text-body-sm text-secondary">Gestiona tus citas y rituales de barbería</p>
          </div>
          <button id="sortToggleBtn" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button" aria-label="Filtrar">
            <span class="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>
      </section>

      <!-- Tabs Navigation -->
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar mb- space-y-0 mb-4 pb-1">
        <button class="tab-btn flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all shrink-0 ${activeTab === 'upcoming' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant'}" data-tab="upcoming">
          <span class="material-symbols-outlined text-[16px]">event_repeat</span>
          <span>Próximas</span>
          <span class="ml-0.5 px-1.5 py-0.2 rounded-full ${activeTab === 'upcoming' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface'} text-[11px] font-bold">${upcoming.length}</span>
        </button>
        <button class="tab-btn flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all shrink-0 ${activeTab === 'past' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant'}" data-tab="past">
          <span>Pasadas</span>
          <span class="ml-0.5 text-[11px] text-secondary">(${past.length})</span>
        </button>
        <button class="tab-btn flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all shrink-0 ${activeTab === 'cancelled' ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant'}" data-tab="cancelled">
          <span>Canceladas</span>
          <span class="ml-0.5 text-[11px] text-secondary">(${cancelled.length})</span>
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="tabContent" class="flex flex-col gap-4"></div>

      <!-- Interactive Floating Booking CTA -->
      <div class="sticky bottom-20 z-20 w-full mt-4">
        <div class="bg-surface-container-lowest/95 backdrop-blur-md p-2 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-black/[0.05]">
          <div class="flex items-center gap-3 pl-2">
            <div class="w-10 h-10 rounded-xl bg-primary-fixed text-primary-container flex items-center justify-center">
              <span class="material-symbols-outlined text-[22px]">content_cut</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-md text-label-md text-on-surface leading-tight font-semibold">¿Listo para un retoque?</span>
              <span class="font-body-sm text-[11px] text-secondary">Barberos disponibles hoy</span>
            </div>
          </div>
          <button id="newBookingBtn" class="h-10 px-4 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md active:scale-95 transition-transform flex items-center gap-1.5 hover:bg-[#164333]">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Nueva reserva</span>
          </button>
        </div>
      </div>
    </div>
  </main>

  ${App.ui.bottomNav('reservas')}
</div>`;
    },
    mount(root, { query, data, App }) {
      let currentTab = (query && query.tab) || 'upcoming';
      const container = root.querySelector('#tabContent');

      function renderTab() {
        if (currentTab === 'upcoming') {
          const upcoming = App.booking.upcoming();
          if (upcoming.length === 0) {
            container.innerHTML = `
<div class="flex flex-col items-center justify-center py-12 text-center bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
  <span class="material-symbols-outlined text-[40px] text-secondary mb-2">event_available</span>
  <h3 class="font-bold text-base mb-1">No tienes citas próximas</h3>
  <p class="text-sm text-secondary mb-4 max-w-xs">Agenda con uno de nuestros maestros artesanos cuando quieras.</p>
  <button data-nav="#/servicios" class="h-10 px-5 rounded-xl bg-primary-container text-white font-semibold text-sm">
    Reservar ahora
  </button>
</div>`;
            return;
          }

          container.innerHTML = upcoming.map(b => {
            const barber = App.barber(b.barberId) || data.BARBERS[0];
            const title = App.booking.title(b.serviceIds);
            const duration = App.booking.duration(b.serviceIds);
            const dateStr = App.fmt.dateLong(b.date);
            const timeStr = App.fmt.time12(b.time);
            const relative = App.fmt.relative(b.date);

            return `
<div class="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-space-md flex flex-col gap-space-md border-l-4 border-primary-container">
  <!-- Card Header Row -->
  <div class="flex items-center justify-between">
    <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed/40 text-primary-container">
      <span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
      <span class="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Confirmada</span>
    </div>
    <span class="font-label-sm text-label-sm text-outline">Ref: #${b.ref}</span>
  </div>

  <!-- Barber & Service Info Block -->
  <div class="flex items-start gap-space-md">
    <img class="w-14 h-14 rounded-full object-cover flex-shrink-0 shadow-sm bg-surface-container ring-2 ring-primary-container/10" src="${barber.avatar || barber.thumb}" alt="${barber.name}">
    <div class="flex flex-col min-w-0 flex-1">
      <div class="flex items-center gap-1">
        <h3 class="font-headline-md text-headline-md text-on-surface truncate font-bold">${barber.fullName || barber.name}</h3>
        <span class="material-symbols-outlined text-[16px] text-primary fill-1">verified</span>
      </div>
      <p class="font-body-md text-body-md text-secondary truncate mt-0.5">${title}</p>
      <div class="flex items-center gap-2 mt-1">
        <span class="font-label-sm text-label-sm text-primary-container font-bold">${App.fmt.money(b.total, true)}</span>
        <span class="text-outline-variant text-xs">·</span>
        <span class="font-body-sm text-body-sm text-outline">${duration || 45} min</span>
      </div>
    </div>
  </div>

  <!-- Appointment Timing & Location Details -->
  <div class="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2">
    <div class="flex items-center justify-between text-body-md font-body-md text-on-surface">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px] text-primary-container">calendar_month</span>
        <span class="font-medium">${dateStr}</span>
      </div>
      <div class="px-2.5 py-0.5 rounded-md bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
        <span class="material-symbols-outlined text-[14px] text-primary align-middle">schedule</span>
        <span class="font-bold">${timeStr}</span> <span class="text-primary-container font-semibold">(${relative})</span>
      </div>
    </div>
    <div class="flex items-center gap-2 pt-1 text-secondary text-body-sm font-body-sm">
      <span class="material-symbols-outlined text-[18px] text-outline">location_on</span>
      <span class="truncate">${data.LOCATION.name} · ${data.LOCATION.address}, ${data.LOCATION.cabin}</span>
    </div>
  </div>

  <!-- Quick Action Buttons -->
  <div class="grid grid-cols-2 gap-space-sm pt-1">
    <button class="reschedule-btn h-[42px] px-3 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center gap-1.5 text-primary-container hover:bg-primary-fixed/20 active:scale-[0.98] transition-all border border-black/[0.04] font-semibold" data-id="${b.id}">
      <span class="material-symbols-outlined text-[18px]">edit_calendar</span>
      <span class="font-label-md text-label-md">Reprogramar</span>
    </button>
    <button class="directions-btn h-[42px] px-3 rounded-xl bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-sm font-semibold">
      <span class="material-symbols-outlined text-[18px]">near_me</span>
      <span class="font-label-md text-label-md">Ver Ubicación</span>
    </button>
  </div>

  <div class="flex justify-end pt-1">
    <button class="cancel-booking-btn text-xs text-secondary hover:text-error transition-colors underline" data-id="${b.id}">
      Cancelar esta cita
    </button>
  </div>
</div>`;
          }).join('');

          // Wire reschedule
          container.querySelectorAll('.reschedule-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const b = App.state.bookings.find(x => x.id === btn.dataset.id);
              if (b) {
                App.state.draft = {
                  ...App.state.draft,
                  serviceIds: [...b.serviceIds],
                  barberId: b.barberId,
                  date: b.date,
                  time: b.time,
                  rescheduleId: b.id,
                };
                App.save();
                App.ui.toast('Elige nueva fecha y hora para tu cita', 'calendar_today');
                App.go('#/fecha');
              }
            });
          });

          // Wire directions
          container.querySelectorAll('.directions-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              window.open('https://www.google.com/maps/search/?api=1&query=Calle+Serrano+42+Madrid', '_blank');
            });
          });

          // Wire cancel
          container.querySelectorAll('.cancel-booking-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
                const b = App.state.bookings.find(x => x.id === btn.dataset.id);
                if (b) {
                  b.status = 'cancelada';
                  App.save();
                  App.ui.toast('Cita cancelada con éxito', 'cancel');
                  renderTab();
                }
              }
            });
          });
        } else if (currentTab === 'past') {
          const past = App.booking.past();
          if (past.length === 0) {
            container.innerHTML = `
<div class="flex flex-col items-center justify-center py-12 text-center bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
  <span class="material-symbols-outlined text-[40px] text-secondary mb-2">history</span>
  <h3 class="font-bold text-base mb-1">Sin historial de citas pasadas</h3>
  <p class="text-sm text-secondary">Tus servicios completados se mostrarán aquí.</p>
</div>`;
            return;
          }

          container.innerHTML = `
<div class="flex items-center justify-between mb-1 px-1">
  <span class="font-label-md text-label-md text-secondary tracking-wide uppercase font-semibold">Cita Anterior</span>
  <span class="font-body-sm text-body-sm text-outline">${App.fmt.monthYear(past[0].date)}</span>
</div>
` + past.map(b => {
            const barber = App.barber(b.barberId) || data.BARBERS[1];
            const title = App.booking.title(b.serviceIds);

            return `
<div class="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-space-md mb-2 flex flex-col gap-space-sm opacity-95">
  <div class="flex items-center justify-between">
    <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-secondary">
      <span class="material-symbols-outlined text-[14px]">check_circle</span>
      <span class="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Completada</span>
    </div>
    <span class="font-body-sm text-body-sm text-outline">${App.fmt.dayMonth(b.date)} · ${App.fmt.time12(b.time)}</span>
  </div>
  <div class="flex items-center gap-space-md py-1">
    <img class="w-12 h-12 rounded-full object-cover flex-shrink-0" src="${barber.avatar || barber.thumb}" alt="${barber.name}">
    <div class="flex flex-col min-w-0">
      <h3 class="font-headline-md text-headline-md text-on-surface truncate font-bold">${barber.name}</h3>
      <p class="font-body-md text-body-md text-secondary truncate">${title}</p>
      <span class="font-label-sm text-label-sm text-outline-variant mt-0.5 font-semibold">${App.fmt.money(b.total, true)}</span>
    </div>
  </div>
  <div class="flex items-center justify-between pt-2 border-t border-black/[0.04]">
    <div class="flex items-center gap-1 text-primary-container">
      <span class="material-symbols-outlined text-[18px] text-amber-500 fill-1">star</span>
      <span class="font-label-sm text-label-sm text-on-surface font-semibold">${b.rating ? b.rating + '.0 Calificado' : '5.0 Calificado'}</span>
    </div>
    <button class="rebook-btn h-[38px] px-4 rounded-xl bg-surface-container-low text-primary-container hover:bg-primary-fixed/30 active:scale-[0.98] transition-all flex items-center gap-1.5 font-semibold" data-id="${b.id}">
      <span class="material-symbols-outlined text-[17px]">replay</span>
      <span class="font-label-md text-label-md">Volver a agendar</span>
    </button>
  </div>
</div>`;
          }).join('');

          container.querySelectorAll('.rebook-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const b = App.state.bookings.find(x => x.id === btn.dataset.id);
              if (b) {
                App.state.draft = {
                  ...App.state.draft,
                  serviceIds: [...b.serviceIds],
                  barberId: b.barberId,
                  rescheduleId: null,
                };
                App.save();
                App.ui.toast(`Agendando de nuevo con ${App.barber(b.barberId)?.name}`);
                App.go('#/fecha');
              }
            });
          });
        } else if (currentTab === 'cancelled') {
          const cancelled = App.booking.cancelled();
          if (cancelled.length === 0) {
            container.innerHTML = `
<div class="flex flex-col items-center justify-center py-12 text-center bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
  <span class="material-symbols-outlined text-[40px] text-secondary mb-2">event_busy</span>
  <h3 class="font-bold text-base mb-1">No tienes citas canceladas</h3>
  <p class="text-sm text-secondary">Tus cancelaciones aparecerán en esta sección.</p>
</div>`;
            return;
          }

          container.innerHTML = cancelled.map(b => {
            const barber = App.barber(b.barberId) || data.BARBERS[0];
            return `
<div class="w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm opacity-60 flex flex-col gap-2">
  <div class="flex items-center justify-between">
    <span class="text-xs font-bold text-error uppercase">Cancelada</span>
    <span class="text-xs text-outline">${App.fmt.dateShort(b.date)}</span>
  </div>
  <div class="flex items-center gap-3">
    <img class="w-10 h-10 rounded-full object-cover" src="${barber.avatar || barber.thumb}">
    <div class="flex flex-col">
      <span class="font-bold text-sm">${barber.name}</span>
      <span class="text-xs text-secondary">${App.booking.title(b.serviceIds)}</span>
    </div>
  </div>
</div>`;
          }).join('');
        }
      }

      root.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          root.querySelectorAll('.tab-btn').forEach(b => {
            b.className = 'tab-btn flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all shrink-0 bg-surface-container text-on-surface-variant';
          });
          btn.className = 'tab-btn flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all shrink-0 bg-primary-container text-on-primary shadow-sm';
          currentTab = btn.dataset.tab;
          renderTab();
        });
      });

      root.querySelector('#newBookingBtn').addEventListener('click', () => {
        App.booking.reset();
        App.go('#/servicios');
      });

      root.querySelector('#sortToggleBtn').addEventListener('click', () => {
        App.ui.toast('Ordenando citas por fecha más reciente', 'swap_vert');
      });

      renderTab();
    }
  });
})();
