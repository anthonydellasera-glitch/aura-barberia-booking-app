/* 5. Reserva: Fecha y Hora — ported from 5._reserva_fecha_y_hora_1/code.html */
(function () {
  App.register('fecha', {
    title: 'Fecha y Hora',
    render({ data, App }) {
      const draft = App.state.draft;
      const duration = App.booking.duration(draft.serviceIds);
      const title = App.booking.title(draft.serviceIds);
      const barber = draft.barberId ? App.barber(draft.barberId) : null;
      const barberName = barber ? barber.name : 'Por seleccionar';

      return `
<div class="bg-[#F7F7F4] font-sans text-on-surface antialiased min-h-screen selection:bg-primary/20 selection:text-primary">
  <main class="flex flex-col relative w-full pt-safe pb-32 min-h-screen">
    <!-- Top Bar -->
    <header class="flex items-center justify-between px-4 h-14 bg-white/70 backdrop-blur-md sticky top-0 z-30 border-b border-black/5">
      <button data-back="#/servicios" aria-label="Volver atrás" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform" type="button">
        <span class="material-symbols-outlined text-[20px]">arrow_back</span>
      </button>
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-[15px] text-on-surface tracking-tight">Reservar Cita</h1>
        <span class="text-[11px] font-semibold tracking-wider uppercase text-primary">Paso 2 de 4</span>
      </div>
      <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform" type="button" onclick="App.ui.toast('Aura Barbería - Citas disponibles');">
        <span class="material-symbols-outlined text-[20px]">more_vert</span>
      </button>
    </header>

    <div class="px-4 pt-4 flex flex-col max-w-lg mx-auto w-full">
      <!-- Steps Indicator -->
      <section class="mb-5 overflow-x-auto no-scrollbar">
        <div class="flex items-center gap-2 min-w-max">
          <!-- 1. Servicio (Completado) -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary shrink-0" data-nav="#/servicios">
            <span class="material-symbols-outlined text-[14px] font-bold">check</span>
            <span class="text-xs font-semibold">1. Servicio</span>
          </div>
          <div class="w-3 h-[2px] bg-primary/30 shrink-0"></div>
          <!-- 2. Fecha y Hora (Activo) -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F5C46] text-white shrink-0 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
            <span class="text-xs font-semibold">2. Fecha y Hora</span>
          </div>
          <div class="w-3 h-[2px] bg-surface-container-high shrink-0"></div>
          <!-- 3. Barbero -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-outline shrink-0 border border-surface-container-high" ${draft.barberId ? '' : 'data-nav="#/barberos?pick=1"'}>
            <span class="text-xs font-medium">3. Barbero</span>
          </div>
          <div class="w-3 h-[2px] bg-surface-container-high shrink-0"></div>
          <!-- 4. Pago -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-outline shrink-0 border border-surface-container-high">
            <span class="text-xs font-medium">4. Pago</span>
          </div>
        </div>
      </section>

      <!-- Info Box: Duración & Barbero -->
      <div class="mb-5 bg-white rounded-2xl p-3.5 border border-surface-container shadow-xs flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <span class="text-lg">⏳</span>
          <div class="flex flex-col">
            <span class="text-xs font-semibold text-on-surface">Duración estimada: ${duration || 45} min · ${barberName}</span>
            <span class="text-[11px] text-on-surface-variant font-medium">${title}</span>
          </div>
        </div>
        <span class="text-xs font-bold text-primary bg-[#1F5C46]/10 px-2.5 py-1 rounded-full">Silla 01</span>
      </div>

      <!-- Section 'Selecciona la fecha' -->
      <section class="bg-white rounded-2xl p-4 shadow-sm border border-surface-container mb-5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex flex-col">
            <span class="text-xs uppercase tracking-wider text-outline font-semibold">Calendario</span>
            <h2 class="text-base font-bold text-on-surface">Selecciona la fecha</h2>
          </div>
          <!-- Month Navigation -->
          <div class="flex items-center gap-1 bg-[#F7F7F4] rounded-full px-2 py-1">
            <button id="prevMonthBtn" aria-label="Mes anterior" class="w-7 h-7 rounded-full flex items-center justify-center text-on-surface hover:bg-white active:scale-95 transition-all" type="button">
              <span class="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span class="text-xs font-bold text-on-surface px-1" id="currentMonthLabel"></span>
            <button id="nextMonthBtn" aria-label="Mes siguiente" class="w-7 h-7 rounded-full flex items-center justify-center text-on-surface hover:bg-white active:scale-95 transition-all" type="button">
              <span class="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Days of week -->
        <div class="grid grid-cols-7 text-center mb-2">
          <span class="text-[11px] font-bold text-outline py-1">L</span>
          <span class="text-[11px] font-bold text-outline py-1">M</span>
          <span class="text-[11px] font-bold text-outline py-1">X</span>
          <span class="text-[11px] font-bold text-outline py-1">J</span>
          <span class="text-[11px] font-bold text-outline py-1">V</span>
          <span class="text-[11px] font-bold text-outline py-1">S</span>
          <span class="text-[11px] font-bold text-outline py-1">D</span>
        </div>

        <!-- Calendar Matrix -->
        <div class="grid grid-cols-7 gap-y-1.5 text-center items-center" id="calendarGrid"></div>
      </section>

      <!-- Horarios disponibles -->
      <section class="bg-white rounded-2xl p-4 shadow-sm border border-surface-container mb-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex flex-col">
            <span class="text-xs uppercase tracking-wider text-outline font-semibold">Horarios disponibles</span>
            <h2 class="text-base font-bold text-on-surface" id="selectedDateTitle">Cargando fecha...</h2>
          </div>
          <span class="flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/5 px-2 py-1 rounded-md">
            <span class="w-1.5 h-1.5 rounded-full bg-primary"></span> 10 cupos
          </span>
        </div>

        <!-- Morning Slots -->
        <div class="mb-4">
          <div class="flex items-center gap-1.5 mb-2.5">
            <span class="material-symbols-outlined text-[16px] text-amber-600">light_mode</span>
            <span class="text-xs font-bold text-on-surface uppercase tracking-wider">Mañana</span>
          </div>
          <div class="grid grid-cols-3 gap-2" id="morningSlots"></div>
        </div>

        <!-- Afternoon Slots -->
        <div>
          <div class="flex items-center gap-1.5 mb-2.5">
            <span class="material-symbols-outlined text-[16px] text-orange-600">wb_twilight</span>
            <span class="text-xs font-bold text-on-surface uppercase tracking-wider">Tarde</span>
          </div>
          <div class="grid grid-cols-3 gap-2" id="afternoonSlots"></div>
        </div>
      </section>
    </div>
  </main>

  <!-- Sticky Bottom Navigation CTA -->
  <aside class="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/5 px-4 py-3.5 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
    <div class="max-w-lg mx-auto flex items-center justify-between gap-3">
      <div class="flex flex-col min-w-0">
        <span class="text-[11px] uppercase tracking-wider font-semibold text-secondary truncate">Seleccionado:</span>
        <span class="text-xs font-bold text-[#1F5C46] truncate" id="selectionSummary">Elige fecha y hora</span>
      </div>
      <button id="nextStepBtn" class="flex-1 h-[48px] rounded-xl bg-[#1F5C46] text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-[#1F5C46]/20 active:scale-[0.98] transition-all hover:bg-[#164333] opacity-50 pointer-events-none" type="button">
        <span>Siguiente · Confirmar detalles</span>
        <span class="material-symbols-outlined text-[18px]">chevron_right</span>
      </button>
    </div>
  </aside>
</div>`;
    },
    mount(root, { data, App }) {
      const draft = App.state.draft;
      const today = App.fmt.today();

      // Initial active date
      let selectedDate = draft.date ? App.fmt.fromISO(draft.date) : App.fmt.addDays(today, 1);
      // Ensure selected day is not Sunday (0)
      if (selectedDate.getDay() === 0) selectedDate = App.fmt.addDays(selectedDate, 1);

      let viewMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      let selectedTime = draft.time || '10:30';

      const monthLabel = root.querySelector('#currentMonthLabel');
      const calendarGrid = root.querySelector('#calendarGrid');
      const dateTitle = root.querySelector('#selectedDateTitle');
      const morningContainer = root.querySelector('#morningSlots');
      const afternoonContainer = root.querySelector('#afternoonSlots');
      const summaryLabel = root.querySelector('#selectionSummary');
      const nextBtn = root.querySelector('#nextStepBtn');

      function updateFooter() {
        const iso = App.fmt.toISO(selectedDate);
        if (selectedDate && selectedTime) {
          summaryLabel.textContent = `${App.fmt.dateShort(iso)} · ${App.fmt.time12(selectedTime)}`;
          nextBtn.classList.remove('opacity-50', 'pointer-events-none');
        } else {
          summaryLabel.textContent = 'Elige fecha y hora';
          nextBtn.classList.add('opacity-50', 'pointer-events-none');
        }

        App.state.draft.date = iso;
        App.state.draft.time = selectedTime;
        App.save();
      }

      function renderCalendar() {
        const y = viewMonth.getFullYear();
        const m = viewMonth.getMonth();
        monthLabel.textContent = `${App.fmt.MONTHS[m]} ${y}`;

        // First day of month (convert Sunday=0 to 6, Mon=0)
        const firstDay = new Date(y, m, 1);
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;

        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const daysInPrevMonth = new Date(y, m, 0).getDate();

        let cells = [];

        // Trailing days from prev month
        for (let i = startDay - 1; i >= 0; i--) {
          const d = daysInPrevMonth - i;
          cells.push(`<div class="py-1"><span class="w-8 h-8 mx-auto flex items-center justify-center text-xs font-medium text-slate-300">${d}</span></div>`);
        }

        // Days of current month
        for (let d = 1; d <= daysInMonth; d++) {
          const thisDate = new Date(y, m, d);
          const isPast = thisDate < today;
          const isSunday = thisDate.getDay() === 0;
          const isSelected = selectedDate && App.fmt.toISO(thisDate) === App.fmt.toISO(selectedDate);

          if (isPast || isSunday) {
            cells.push(`<div class="py-1"><span class="w-8 h-8 mx-auto flex items-center justify-center text-xs font-medium text-slate-300">${d}</span></div>`);
          } else if (isSelected) {
            cells.push(`
<div class="py-1">
  <button class="w-8 h-8 mx-auto flex items-center justify-center text-xs font-bold text-white bg-[#1F5C46] rounded-full shadow-sm ring-2 ring-[#1F5C46]/30 day-btn" data-day="${d}">
    ${d}
  </button>
</div>`);
          } else {
            cells.push(`
<div class="py-1">
  <button class="w-8 h-8 mx-auto flex items-center justify-center text-xs font-semibold text-on-surface rounded-full hover:bg-[#F7F7F4] active:scale-95 transition-all day-btn" data-day="${d}">
    ${d}
  </button>
</div>`);
          }
        }

        calendarGrid.innerHTML = cells.join('');

        calendarGrid.querySelectorAll('.day-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const d = Number(btn.dataset.day);
            selectedDate = new Date(y, m, d);
            renderCalendar();
            renderTimeSlots();
            updateFooter();
          });
        });
      }

      function renderTimeSlots() {
        const iso = App.fmt.toISO(selectedDate);
        dateTitle.textContent = App.fmt.dateDayMonth(iso);

        function renderRow(container, slots) {
          container.innerHTML = slots.map(slot => {
            const isSel = selectedTime === slot;
            return `
<button class="time-slot-btn h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${isSel ? 'bg-[#1F5C46] text-white shadow-sm' : 'bg-surface-container-low text-on-surface border border-surface-container hover:bg-surface-container'}" data-slot="${slot}">
  ${isSel ? '<span class="material-symbols-outlined text-[14px]">check</span>' : ''}
  <span>${App.fmt.time12(slot)}</span>
</button>`;
          }).join('');
        }

        renderRow(morningContainer, data.TIME_SLOTS.morning);
        renderRow(afternoonContainer, data.TIME_SLOTS.afternoon);

        root.querySelectorAll('.time-slot-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            selectedTime = btn.dataset.slot;
            renderTimeSlots();
            updateFooter();
          });
        });
      }

      // Prev / Next month
      root.querySelector('#prevMonthBtn').addEventListener('click', () => {
        if (viewMonth > today) {
          viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
          renderCalendar();
        } else {
          App.ui.toast('No puedes reservar en meses pasados', 'event_busy');
        }
      });
      root.querySelector('#nextMonthBtn').addEventListener('click', () => {
        viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
        renderCalendar();
      });

      // Next CTA
      nextBtn.addEventListener('click', () => {
        if (!selectedDate || !selectedTime) {
          App.ui.toast('Por favor selecciona una fecha y una hora', 'warning');
          return;
        }

        // Reschedule handling
        if (draft.rescheduleId) {
          App.booking.confirm();
          App.save();
          App.ui.toast('¡Cita reprogramada con éxito!', 'calendar_month');
          App.go('#/reservas');
          return;
        }

        // If no barber chosen yet, pick barber next
        if (!draft.barberId) {
          App.go('#/barberos?pick=1');
        } else {
          App.go('#/pago');
        }
      });

      renderCalendar();
      renderTimeSlots();
      updateFooter();
    }
  });
})();
