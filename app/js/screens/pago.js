/* 7. Pago y Confirmación de Detalles — ported from 7._pago_1/code.html */
(function () {
  App.register('pago', {
    title: 'Confirmar y Pagar',
    render({ data, App }) {
      const draft = App.state.draft;
      // Guard: if incomplete, provide clear guidance
      if (!draft.serviceIds || draft.serviceIds.length === 0 || !draft.barberId) {
        return `
<div class="bg-[#F7F7F4] font-sans text-on-surface antialiased min-h-screen p-6 flex flex-col justify-between">
  <header class="flex items-center gap-3">
    <button data-back="#/servicios" class="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm">
      <span class="material-symbols-outlined">arrow_back</span>
    </button>
    <h1 class="font-bold text-lg">Completa tu reserva</h1>
  </header>
  <div class="flex flex-col items-center text-center my-auto">
    <span class="material-symbols-outlined text-[48px] text-primary mb-3">content_cut</span>
    <h2 class="text-xl font-bold mb-2">Faltan detalles en tu cita</h2>
    <p class="text-sm text-secondary mb-6 max-w-xs">Por favor selecciona un servicio y un barbero antes de procesar el pago.</p>
    <button data-nav="#/servicios" class="h-12 px-6 rounded-xl bg-primary-container text-white font-bold">
      Elegir servicios
    </button>
  </div>
  <div></div>
</div>`;
      }

      const barber = App.barber(draft.barberId);
      const totals = App.booking.totals();
      const dateStr = draft.date ? `${App.fmt.dateLong(draft.date)} · ${App.fmt.time12(draft.time || '10:30')}` : 'Por definir';

      return `
<div class="bg-[#F7F7F4] font-sans text-on-surface antialiased min-h-screen selection:bg-primary/20 selection:text-primary">
  <main class="flex flex-col relative w-full pt-safe pb-36 min-h-screen">
    <!-- Top Navigation Bar -->
    <header class="flex items-center justify-between px-4 h-14 bg-white/70 backdrop-blur-md sticky top-0 z-30 border-b border-black/5">
      <button data-back="#/fecha" aria-label="Volver atrás" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform" type="button">
        <span class="material-symbols-outlined text-[20px]">arrow_back</span>
      </button>
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-[15px] text-on-surface tracking-tight">Confirmar y Pagar</h1>
        <span class="text-[11px] font-semibold tracking-wider uppercase text-primary">Paso 4 de 4</span>
      </div>
      <div class="w-10 flex items-center justify-center text-primary-container">
        <span class="material-symbols-outlined text-[22px]">verified_user</span>
      </div>
    </header>

    <div class="px-4 pt-3 flex flex-col max-w-lg mx-auto w-full">
      <!-- Appointment Summary Card -->
      <section class="bg-white rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-high/60 mb-3.5">
        <div class="flex items-center justify-between pb-3.5 border-b border-surface-container">
          <div class="flex items-center gap-3">
            <img alt="${barber.name}" class="w-12 h-12 rounded-full object-cover ring-2 ring-primary-container/20" src="${barber.avatar}">
            <div class="flex flex-col">
              <span class="text-[15px] font-bold text-on-surface leading-tight">${barber.fullName || barber.name}</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="material-symbols-outlined text-amber-500 text-[14px] fill-1">star</span>
                <span class="text-[12px] font-bold text-on-surface">${barber.rating}</span>
                <span class="text-[11px] text-on-surface-variant font-medium">(${barber.reviews} reseñas)</span>
              </div>
            </div>
          </div>
          <span class="text-[11px] font-semibold text-primary-container bg-primary-container/10 px-2.5 py-1 rounded-full">
            Barbero Pro
          </span>
        </div>

        <!-- Service Details -->
        <div class="mt-3.5 space-y-2.5">
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0 text-primary-container">
              <span class="material-symbols-outlined text-[18px]">content_cut</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[14px] font-bold text-on-surface">${App.booking.title()}</span>
              <span class="text-[12px] text-on-surface-variant">Incluye lavado capilar, visagismo y styling artesanal</span>
            </div>
          </div>
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0 text-primary-container">
              <span class="material-symbols-outlined text-[18px]">calendar_today</span>
            </div>
            <div class="flex items-center justify-between w-full min-w-0">
              <span class="text-[13px] text-on-surface-variant">Fecha y horario</span>
              <span class="text-[13px] font-bold text-on-surface">${dateStr}</span>
            </div>
          </div>
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0 text-primary-container">
              <span class="material-symbols-outlined text-[18px]">pin_drop</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[13px] font-semibold text-on-surface">${data.LOCATION.name}</span>
              <span class="text-[12px] text-on-surface-variant">${data.LOCATION.address}, ${data.LOCATION.cabin}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Cost Breakdown Card -->
      <section class="bg-white rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-surface-container-high/60 mb-4" id="costBreakdown">
        <h2 class="text-[14px] font-bold text-on-surface mb-3 flex items-center justify-between">
          <span>Desglose del pago</span>
          <span class="text-[11px] font-medium text-on-surface-variant uppercase tracking-wider">USD</span>
        </h2>
        <div class="space-y-2 text-[13px]">
          <div class="flex items-center justify-between">
            <span class="text-on-surface-variant">Subtotal</span>
            <span class="font-semibold text-on-surface">${App.fmt.money(totals.subtotal, true)}</span>
          </div>
          ${totals.promo ? `
          <div class="flex items-center justify-between text-primary-container">
            <span class="flex items-center gap-1 font-medium">
              <span class="material-symbols-outlined text-[15px]">discount</span>
              ${totals.promo.label}
            </span>
            <span class="font-bold">-${App.fmt.money(totals.discount, true)}</span>
          </div>` : ''}
          <div class="flex items-center justify-between">
            <span class="text-on-surface-variant">Tarifa de servicio</span>
            <span class="font-semibold text-on-surface">${App.fmt.money(totals.fee, true)}</span>
          </div>
          <div class="pt-2.5 mt-2.5 border-t border-surface-container flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-[15px] font-bold text-on-surface">Total a pagar</span>
              <span class="text-[11px] text-on-surface-variant">Impuestos incluidos</span>
            </div>
            <span class="text-[22px] font-extrabold text-[#1F5C46] tracking-tight">
              ${App.fmt.money(totals.total, true)}
            </span>
          </div>
        </div>
      </section>

      <!-- Promo Code Box -->
      <div class="bg-white rounded-[16px] p-2.5 pl-3.5 border border-surface-container-high/70 shadow-sm flex items-center justify-between mb-4" id="promoBox">
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <span class="material-symbols-outlined text-primary-container text-[20px]">confirmation_number</span>
          <div class="flex flex-col min-w-0" id="promoStatusArea">
            <span class="text-[11px] font-medium text-on-surface-variant">Código de descuento</span>
            ${totals.promo ? `
            <div class="flex items-center gap-1.5">
              <span class="inline-flex items-center gap-1 bg-[#1F5C46]/10 text-[#1F5C46] font-bold text-[12px] px-2 py-0.5 rounded-md tracking-wider">
                ${totals.promo.code}
                <span class="material-symbols-outlined text-[13px] fill-1">check_circle</span>
              </span>
              <span class="text-[11px] font-semibold text-[#1F5C46]">Aplicado</span>
            </div>` : `
            <span class="text-[12px] text-secondary font-medium">Ninguno aplicado</span>`}
          </div>
        </div>
        <button id="togglePromoBtn" class="text-[12px] font-bold text-on-surface-variant hover:text-on-surface px-2.5 py-1.5 rounded-lg active:bg-surface-container transition-colors shrink-0" type="button">
          ${totals.promo ? 'Cambiar' : 'Agregar'}
        </button>
      </div>

      <!-- Hidden promo input form -->
      <div id="promoInputArea" class="hidden mb-4 bg-surface-container-low p-3 rounded-2xl flex items-center gap-2">
        <input id="promoCodeInput" placeholder="Ingresa código (ej. AURA20)" class="flex-1 h-10 px-3 rounded-xl bg-white text-xs border border-outline-variant uppercase font-semibold">
        <button id="applyPromoBtn" class="h-10 px-4 rounded-xl bg-primary text-white font-bold text-xs">Aplicar</button>
      </div>

      <!-- Payment Methods Section -->
      <section class="space-y-2.5 mb-2">
        <div class="flex items-center justify-between px-1 mb-1">
          <h2 class="text-[15px] font-bold text-on-surface">Método de pago</h2>
          <span class="text-[12px] text-on-surface-variant font-medium">Selecciona una opción</span>
        </div>

        <!-- Option 1: Credit Card -->
        <label class="payment-card relative flex items-center justify-between p-3.5 rounded-[16px] bg-white border-2 border-[#1F5C46] shadow-sm cursor-pointer transition-all active:scale-[0.99]" data-method="card">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-11 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 shadow-inner">
              <span class="text-[12px] font-black italic tracking-widest text-white">VISA</span>
            </div>
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-[14px] font-bold text-on-surface truncate">Tarjeta de Crédito</span>
                <span class="bg-[#1F5C46]/10 text-[#1F5C46] text-[10px] font-bold px-1.5 py-0.5 rounded">Predeterminada</span>
              </div>
              <span class="text-[12px] text-on-surface-variant">Visa terminada en 4242</span>
            </div>
          </div>
          <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#1F5C46] text-white check-dot">
            <span class="w-2 h-2 rounded-full bg-white"></span>
          </div>
        </label>

        <!-- Option 2: Apple Pay -->
        <label class="payment-card relative flex items-center justify-between p-3.5 rounded-[16px] bg-white border border-surface-container-high/70 shadow-sm cursor-pointer transition-all active:scale-[0.99]" data-method="apple">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-11 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.65-.79 1.1-1.88.98-2.97-.95.04-2.09.64-2.76 1.43-.59.68-1.11 1.78-.97 2.84 1.05.08 2.11-.53 2.75-1.3"></path></svg>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[14px] font-bold text-on-surface">Apple Pay</span>
              <span class="text-[12px] text-on-surface-variant">Confirmación biométrica rápida</span>
            </div>
          </div>
          <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-outline-variant check-dot"></div>
        </label>

        <!-- Option 3: Google Pay -->
        <label class="payment-card relative flex items-center justify-between p-3.5 rounded-[16px] bg-white border border-surface-container-high/70 shadow-sm cursor-pointer transition-all active:scale-[0.99]" data-method="google">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-11 h-8 rounded-lg bg-surface-container-lowest border border-black/[0.08] flex items-center justify-center shrink-0">
              <span class="font-bold text-[12px] text-slate-800">GPay</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[14px] font-bold text-on-surface">Google Pay</span>
              <span class="text-[12px] text-on-surface-variant">Pago en un toque</span>
            </div>
          </div>
          <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-outline-variant check-dot"></div>
        </label>

        <!-- Option 4: Pago en Local -->
        <label class="payment-card relative flex items-center justify-between p-3.5 rounded-[16px] bg-white border border-surface-container-high/70 shadow-sm cursor-pointer transition-all active:scale-[0.99]" data-method="local">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-11 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary-container">
              <span class="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[14px] font-bold text-on-surface">Pago en Local</span>
              <span class="text-[12px] text-on-surface-variant">Efectivo o Datáfono al finalizar</span>
            </div>
          </div>
          <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-outline-variant check-dot"></div>
        </label>
      </section>
    </div>
  </main>

  <!-- Sticky Pay CTA -->
  <aside class="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/5 px-4 py-3.5 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
    <div class="max-w-lg mx-auto flex flex-col gap-2">
      <button id="payNowBtn" class="w-full h-[52px] rounded-2xl bg-[#1F5C46] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-[#1F5C46]/25 active:scale-[0.98] transition-all hover:bg-[#164333]">
        <span class="material-symbols-outlined text-[20px]">lock</span>
        <span>Pagar ahora · ${App.fmt.money(totals.total, true)}</span>
      </button>
      <div class="flex items-center justify-center gap-1.5 text-[11px] text-secondary">
        <span class="material-symbols-outlined text-[13px] text-primary">shield</span>
        <span>Pago 100% encriptado · Cancelación gratis hasta 2h antes</span>
      </div>
    </div>
  </aside>
</div>`;
    },
    mount(root, { data, App }) {
      const draft = App.state.draft;
      let selectedMethod = draft.payment || 'card';

      // Payment method selection
      root.querySelectorAll('.payment-card').forEach(card => {
        card.addEventListener('click', () => {
          root.querySelectorAll('.payment-card').forEach(c => {
            c.className = 'payment-card relative flex items-center justify-between p-3.5 rounded-[16px] bg-white border border-surface-container-high/70 shadow-sm cursor-pointer transition-all active:scale-[0.99]';
            const dot = c.querySelector('.check-dot');
            dot.className = 'w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-outline-variant check-dot';
            dot.innerHTML = '';
          });
          card.className = 'payment-card relative flex items-center justify-between p-3.5 rounded-[16px] bg-white border-2 border-[#1F5C46] shadow-sm cursor-pointer transition-all active:scale-[0.99]';
          const dot = card.querySelector('.check-dot');
          dot.className = 'w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#1F5C46] text-white check-dot';
          dot.innerHTML = '<span class="w-2 h-2 rounded-full bg-white"></span>';

          selectedMethod = card.dataset.method;
          App.state.draft.payment = selectedMethod;
          App.save();
        });
      });

      // Promo toggling
      const togglePromoBtn = root.querySelector('#togglePromoBtn');
      const promoInputArea = root.querySelector('#promoInputArea');
      const promoCodeInput = root.querySelector('#promoCodeInput');
      const applyPromoBtn = root.querySelector('#applyPromoBtn');

      if (togglePromoBtn && promoInputArea) {
        togglePromoBtn.addEventListener('click', () => {
          promoInputArea.classList.toggle('hidden');
          if (!promoInputArea.classList.contains('hidden')) {
            promoCodeInput.focus();
          }
        });

        applyPromoBtn.addEventListener('click', () => {
          const code = promoCodeInput.value.trim().toUpperCase();
          if (data.PROMO_CODES[code]) {
            App.state.draft.promo = code;
            App.save();
            App.ui.toast(`Cupón ${code} aplicado`, 'check_circle');
            App.rerender();
          } else if (code === '') {
            App.state.draft.promo = null;
            App.save();
            App.ui.toast('Cupón removido');
            App.rerender();
          } else {
            App.ui.toast('Código no válido. Prueba con AURA20', 'error');
          }
        });
      }

      // Pay now button
      const payBtn = root.querySelector('#payNowBtn');
      if (payBtn) {
        payBtn.addEventListener('click', () => {
          payBtn.disabled = true;
          payBtn.innerHTML = `
            <span class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>Procesando pago seguro...</span>`;

          setTimeout(() => {
            const bookingId = App.booking.confirm();
            App.save();
            App.ui.toast('¡Reserva confirmada con éxito!', 'check_circle');
            App.go(`#/confirmacion/${bookingId}`);
          }, 850);
        });
      }
    }
  });
})();
