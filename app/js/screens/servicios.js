/* 6. Reserva: Seleccionar Servicio — ported from 6._reserva_seleccionar_servicio_1/code.html */
(function () {
  App.register('servicios', {
    title: 'Seleccionar Servicio',
    render({ data, App }) {
      const selectedIds = new Set(App.state.draft.serviceIds || []);
      const count = selectedIds.size;
      const subtotal = App.booking.subtotal(Array.from(selectedIds));

      return `
<div class="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
  <!-- Sticky Top Header & Categories Filter -->
  <header class="fixed top-0 inset-x-0 z-30 bg-surface/90 backdrop-blur-md border-b border-black/5 pt-safe">
    <div class="flex items-center justify-between px-4 h-14">
      <button data-back="#/inicio" aria-label="Volver atrás" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform" type="button">
        <span class="material-symbols-outlined text-[22px]">arrow_back</span>
      </button>
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-[16px] text-on-surface tracking-tight">Seleccionar Servicio</h1>
        <span class="text-[11px] font-semibold tracking-wider uppercase text-primary">Paso 1 de 4</span>
      </div>
      <div class="w-10 flex items-center justify-end">
        <span class="text-[11px] font-bold tracking-widest text-[#1F5C46] uppercase">Aura</span>
      </div>
    </div>
    <!-- Horizontal Filter Chips Scroll -->
    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 pb-3 pt-1" id="categoryChips">
      ${data.SERVICE_CATEGORIES.map((cat, idx) => `
      <button class="filter-chip whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${idx === 0 ? 'bg-[#1F5C46] text-white shadow-sm' : 'text-secondary bg-white border border-black/5 hover:border-black/10'}" data-category="${cat.id}">
        ${cat.label}
      </button>`).join('')}
    </div>
  </header>

  <!-- Main Content: Services List -->
  <main class="flex-1 w-full px-4 pt-[124px] pb-36">
    <div class="flex flex-col gap-3.5 max-w-lg mx-auto" id="servicesList">
      ${data.SERVICES.map(srv => {
        const isSelected = selectedIds.has(srv.id);
        return `
      <article class="service-card group cursor-pointer bg-white rounded-[16px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${isSelected ? 'ring-2 ring-[#1F5C46]' : 'ring-1 ring-black/[0.04] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]'} transition-all duration-200 relative overflow-hidden flex items-start gap-3.5" data-id="${srv.id}" data-category="${srv.category}">
        ${srv.recommended ? `
        <div class="absolute top-0 right-0 bg-[#1F5C46] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-sm uppercase tracking-wider">
          <span class="material-symbols-outlined text-[11px] fill-1">star</span>
          Recomendado
        </div>` : ''}

        <div class="w-12 h-12 rounded-xl ${isSelected ? 'bg-[#1F5C46]/10 text-[#1F5C46]' : 'bg-surface-container text-on-surface-variant'} flex items-center justify-center shrink-0 mt-0.5 service-icon-box">
          <span class="material-symbols-outlined text-[26px]">${srv.icon}</span>
        </div>

        <div class="flex flex-col flex-1 min-w-0 pr-1">
          <div class="flex items-start justify-between gap-2">
            <h3 class="font-bold text-[16px] text-on-surface tracking-tight leading-snug">${srv.name}</h3>
            <span class="font-extrabold text-[16px] text-[#1F5C46] shrink-0">${App.fmt.money(srv.price)}</span>
          </div>
          <p class="text-[13px] text-secondary leading-relaxed mt-1">${srv.desc}</p>
          <div class="flex items-center gap-1.5 text-secondary mt-2.5">
            <span class="material-symbols-outlined text-[15px] text-[#1F5C46]">schedule</span>
            <span class="text-[12px] font-medium text-on-surface-variant">${srv.duration} min</span>
          </div>
        </div>

        <div class="shrink-0 pt-0.5">
          <div class="radio-indicator w-6 h-6 rounded-full ${isSelected ? 'bg-[#1F5C46] border-2 border-[#1F5C46] text-white' : 'border-2 border-outline-variant text-transparent bg-transparent'} flex items-center justify-center transition-colors shadow-sm">
            <span class="material-symbols-outlined text-[15px] font-bold">check</span>
          </div>
        </div>
      </article>`;
      }).join('')}
    </div>
  </main>

  <!-- Sticky Bottom Navigation CTA -->
  <aside class="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/5 px-4 py-3.5 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
    <div class="max-w-lg mx-auto flex items-center justify-between gap-4">
      <div class="flex flex-col">
        <span class="text-[12px] text-secondary font-medium" id="summaryCounter">
          ${count} ${count === 1 ? 'servicio seleccionado' : 'servicios seleccionados'}
        </span>
        <span class="font-extrabold text-[20px] text-[#1F5C46] leading-none" id="summaryTotal">
          ${App.fmt.money(subtotal)}
        </span>
      </div>
      <button id="continueBtn" class="flex-1 h-[50px] rounded-xl bg-[#1F5C46] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md shadow-[#1F5C46]/20 active:scale-[0.98] transition-all hover:bg-[#164333] ${count === 0 ? 'opacity-50 pointer-events-none' : ''}">
        <span>Continuar con Fecha y Hora</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  </aside>
</div>`;
    },
    mount(root, { data, App }) {
      let currentFilter = 'todos';
      const selected = new Set(App.state.draft.serviceIds || []);

      const counterEl = root.querySelector('#summaryCounter');
      const totalEl = root.querySelector('#summaryTotal');
      const continueBtn = root.querySelector('#continueBtn');

      function updateSummary() {
        const count = selected.size;
        counterEl.textContent = `${count} ${count === 1 ? 'servicio seleccionado' : 'servicios seleccionados'}`;
        const subtotal = App.booking.subtotal(Array.from(selected));
        totalEl.textContent = App.fmt.money(subtotal);

        if (count === 0) {
          continueBtn.classList.add('opacity-50', 'pointer-events-none');
        } else {
          continueBtn.classList.remove('opacity-50', 'pointer-events-none');
        }

        App.state.draft.serviceIds = Array.from(selected);
        App.save();
      }

      function filterCards() {
        root.querySelectorAll('.service-card').forEach(card => {
          const cat = card.dataset.category;
          if (currentFilter === 'todos' || cat === currentFilter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }

      root.querySelectorAll('#categoryChips .filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          root.querySelectorAll('#categoryChips .filter-chip').forEach(c => {
            c.className = 'filter-chip whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all text-secondary bg-white border border-black/5 hover:border-black/10';
          });
          chip.className = 'filter-chip whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all bg-[#1F5C46] text-white shadow-sm';
          currentFilter = chip.dataset.category;
          filterCards();
        });
      });

      root.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          const indicator = card.querySelector('.radio-indicator');
          const iconBox = card.querySelector('.service-icon-box');

          if (selected.has(id)) {
            selected.delete(id);
            card.classList.remove('ring-2', 'ring-[#1F5C46]');
            card.classList.add('ring-1', 'ring-black/[0.04]');
            indicator.className = 'radio-indicator w-6 h-6 rounded-full border-2 border-outline-variant text-transparent bg-transparent flex items-center justify-center transition-colors shadow-sm';
            iconBox.className = 'w-12 h-12 rounded-xl bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0 mt-0.5 service-icon-box';
          } else {
            selected.add(id);
            card.classList.add('ring-2', 'ring-[#1F5C46]');
            card.classList.remove('ring-1', 'ring-black/[0.04]');
            indicator.className = 'radio-indicator w-6 h-6 rounded-full bg-[#1F5C46] border-2 border-[#1F5C46] text-white flex items-center justify-center transition-colors shadow-sm';
            iconBox.className = 'w-12 h-12 rounded-xl bg-[#1F5C46]/10 text-[#1F5C46] flex items-center justify-center shrink-0 mt-0.5 service-icon-box';
          }
          updateSummary();
        });
      });

      continueBtn.addEventListener('click', () => {
        if (selected.size === 0) {
          App.ui.toast('Selecciona al menos un servicio para continuar', 'warning');
          return;
        }
        App.go('#/fecha');
      });
    }
  });
})();
