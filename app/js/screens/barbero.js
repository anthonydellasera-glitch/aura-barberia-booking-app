/* 4. Detalle del Barbero — ported from 4._detalle_del_barbero_1/code.html */
(function () {
  App.register('barbero', {
    title: 'Detalle del Barbero',
    render({ params, data, App }) {
      const barber = App.barber(params && params.id) || data.BARBERS[0];
      const isFav = (App.state.favorites || []).includes(barber.id);

      // Determine initial selected services
      const currentDraft = App.state.draft;
      let initialSelected = [];
      if (currentDraft && currentDraft.barberId === barber.id && currentDraft.serviceIds.length > 0) {
        initialSelected = [...currentDraft.serviceIds];
      } else if (barber.services && barber.services.length > 0) {
        initialSelected = [barber.services[0]];
      } else {
        initialSelected = ['fade'];
      }

      const availableServices = (barber.services || ['fade', 'afeitado', 'signature'])
        .map(id => App.service(id))
        .filter(Boolean);

      const subtotal = initialSelected.reduce((sum, sId) => {
        const s = App.service(sId);
        return sum + (s ? s.price : 0);
      }, 0);

      return `
<div class="bg-background font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
  <!-- Main Scrollable Content -->
  <main class="flex flex-col relative w-full pb-32">
    <!-- Hero Image Area with Overlaid Floating Action Buttons -->
    <div class="relative w-full h-84 min-h-[340px]">
      <img alt="${barber.fullName} en el taller de Aura Barbería" class="w-full h-full object-cover object-center" src="${barber.hero}">
      <!-- Gradient overlay for legibility & smooth blend -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none"></div>

      <!-- Floating App Bar (Back & Favorite Heart) -->
      <div class="absolute top-0 inset-x-0 pt-safe z-30 px-margin flex items-center justify-between h-16">
        <button data-back="#/barberos" aria-label="Volver atrás" class="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md active:scale-95 transition-all hover:bg-white" type="button">
          <span class="material-symbols-outlined text-[22px]">arrow_back</span>
        </button>
        <div class="flex items-center gap-2">
          <button aria-label="Guardar barbero en favoritos" class="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-md active:scale-95 transition-all hover:bg-white" id="btn-fav" type="button">
            <span class="material-symbols-outlined text-[22px] transition-colors ${isFav ? 'text-red-500 fill-1' : 'text-on-surface'}" id="fav-icon">favorite</span>
          </button>
        </div>
      </div>

      <!-- Live Availability Tag -->
      <div class="absolute bottom-4 left-margin z-20 flex items-center gap-2 bg-[#1F5C46]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md border border-white/10">
        <span class="w-2 h-2 rounded-full bg-[#96d3b7] animate-pulse"></span>
        <span>Disponible Hoy</span>
      </div>
    </div>

    <!-- Editorial Barber Identity Block -->
    <div class="px-margin -mt-3 relative z-20 flex flex-col gap-5 bg-background rounded-t-3xl pt-6">
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <h1 class="font-display-md text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            ${barber.fullName || barber.name}
          </h1>
          <span class="material-symbols-outlined text-primary text-[22px] fill-1">verified</span>
        </div>
        <p class="font-body-md text-sm text-secondary mt-0.5">
          ${barber.title} · ${barber.years} años de experiencia
        </p>

        <!-- Rating & Social Proof Badges -->
        <div class="flex flex-wrap items-center gap-2 mt-3">
          <div class="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full">
            <span class="text-amber-500 text-sm">⭐</span>
            <span class="font-headline-md text-xs font-bold text-on-surface">${barber.rating}</span>
            <span class="font-body-sm text-[11px] text-secondary">(${barber.reviews} reseñas)</span>
          </div>
          <div class="flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded-full text-xs font-medium text-secondary">
            <span>🏆</span>
            <span>Top #1 Maestro</span>
          </div>
          <div class="flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded-full text-xs font-medium text-secondary">
            <span>🛡️</span>
            <span>Certificado Master</span>
          </div>
        </div>
      </div>

      <!-- Bio / Acerca de -->
      <section class="flex flex-col gap-2 pt-1 border-t border-black/[0.04]">
        <h2 class="font-headline-md text-base font-bold text-on-surface">Acerca de</h2>
        <p class="font-body-md text-sm text-secondary leading-relaxed">
          ${barber.about}
        </p>
        <div class="flex items-center gap-4 mt-2 text-xs font-semibold text-[#1F5C46]">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">straighten</span>
            Precisión milimétrica
          </span>
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">spa</span>
            Ritual tradicional
          </span>
        </div>
      </section>

      <!-- Section: Galería de trabajos -->
      <section class="flex flex-col pt-1">
        <div class="flex items-center justify-between mb-3 px-0.5">
          <h2 class="font-headline-md text-base font-bold text-on-surface">
            Galería de trabajos
          </h2>
          <span class="font-body-sm text-xs text-secondary">Cortes y Barbas</span>
        </div>
        <div class="grid grid-cols-4 gap-2.5">
          ${data.GALLERY.map(img => `
          <div class="gallery-thumb aspect-square rounded-xl overflow-hidden bg-surface-container-high shadow-sm group cursor-pointer" data-src="${img.src}">
            <img alt="${img.alt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="${img.src}">
          </div>`).join('')}
        </div>
      </section>

      <!-- Section: Servicios de Barber -->
      <section class="flex flex-col pt-1">
        <div class="flex items-center justify-between mb-2.5 px-0.5">
          <h2 class="font-headline-md text-base font-bold text-on-surface">
            Servicios de ${barber.name.split(' ')[0]}
          </h2>
          <span class="font-body-sm text-xs text-secondary">
            Toca para seleccionar
          </span>
        </div>
        <div class="flex flex-col gap-2.5" id="services-container">
          ${availableServices.map(srv => {
            const isSelected = initialSelected.includes(srv.id);
            return `
          <div class="service-card group cursor-pointer bg-surface-container-lowest p-4 rounded-2xl border-2 ${isSelected ? 'border-[#1F5C46] bg-[#1F5C46]/[0.02]' : 'border-transparent'} shadow-sm flex items-center justify-between transition-all active:scale-[0.99]" data-id="${srv.id}" data-price="${srv.price}">
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="service-icon-box w-11 h-11 rounded-xl ${isSelected ? 'bg-[#1F5C46]/10 text-[#1F5C46]' : 'bg-surface-container text-secondary'} flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[22px]">${srv.icon}</span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <h3 class="font-headline-md text-[15px] font-semibold text-on-surface truncate">
                    ${srv.name}
                  </h3>
                  ${srv.recommended ? `<span class="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Popular</span>` : ''}
                </div>
                <div class="flex items-center gap-2 text-secondary text-xs mt-0.5">
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">schedule</span>
                    ${srv.duration} min
                  </span>
                  <span>·</span>
                  <span class="truncate">${srv.short || srv.desc}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0 ml-2">
              <div class="text-right">
                <span class="font-headline-md text-[15px] font-bold ${isSelected ? 'text-[#1F5C46]' : 'text-on-surface'}">${App.fmt.money(srv.price)}</span>
              </div>
              <div class="service-radio w-5 h-5 rounded-full border-2 ${isSelected ? 'border-[#1F5C46] bg-[#1F5C46] text-white' : 'border-outline-variant bg-transparent text-transparent'} flex items-center justify-center transition-all">
                <span class="material-symbols-outlined text-[13px] font-bold">check</span>
              </div>
            </div>
          </div>`;
          }).join('')}
        </div>
      </section>
    </div>
  </main>

  <!-- Fixed Bottom Bar (Sticky) -->
  <aside class="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-black/[0.06] px-margin py-3 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
    <div class="max-w-md mx-auto flex items-center justify-between gap-4">
      <!-- Left: Price Preview -->
      <div class="flex flex-col min-w-[110px]">
        <span class="font-body-sm text-[11px] font-semibold text-secondary uppercase tracking-wider">
          Total estimado
        </span>
        <div class="flex items-baseline gap-1">
          <span class="font-display-md text-[20px] font-bold text-[#1F5C46]" id="price-preview">
            ${App.fmt.money(subtotal)}
          </span>
        </div>
      </div>
      <!-- Right: Button 52px height in Forest Green (#1F5C46) -->
      <button class="flex-1 h-[52px] rounded-2xl text-white font-label-lg text-[15px] font-bold flex items-center justify-center gap-2 shadow-md shadow-[#1F5C46]/20 active:scale-[0.98] transition-all hover:brightness-105 bg-[#1F5C46]" id="btn-book" type="button">
        <span>Reservar cita</span>
        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  </aside>
</div>`;
    },
    mount(root, { params, data, App }) {
      const barber = App.barber(params && params.id) || data.BARBERS[0];
      const favBtn = root.querySelector('#btn-fav');
      const favIcon = root.querySelector('#fav-icon');
      const pricePreview = root.querySelector('#price-preview');
      const bookBtn = root.querySelector('#btn-book');

      let selectedServices = new Set();
      root.querySelectorAll('.service-card').forEach(card => {
        if (card.classList.contains('border-[#1F5C46]')) {
          selectedServices.add(card.dataset.id);
        }
      });

      function updatePrice() {
        let total = 0;
        selectedServices.forEach(id => {
          const s = App.service(id);
          if (s) total += s.price;
        });
        pricePreview.textContent = App.fmt.money(total);
        if (selectedServices.size === 0) {
          bookBtn.classList.add('opacity-50', 'pointer-events-none');
        } else {
          bookBtn.classList.remove('opacity-50', 'pointer-events-none');
        }
      }

      root.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          const radio = card.querySelector('.service-radio');
          const iconBox = card.querySelector('.service-icon-box');

          if (selectedServices.has(id)) {
            selectedServices.delete(id);
            card.classList.remove('border-[#1F5C46]', 'bg-[#1F5C46]/[0.02]');
            card.classList.add('border-transparent');
            radio.className = 'service-radio w-5 h-5 rounded-full border-2 border-outline-variant bg-transparent text-transparent flex items-center justify-center transition-all';
            iconBox.className = 'service-icon-box w-11 h-11 rounded-xl bg-surface-container text-secondary flex items-center justify-center shrink-0';
          } else {
            selectedServices.add(id);
            card.classList.add('border-[#1F5C46]', 'bg-[#1F5C46]/[0.02]');
            card.classList.remove('border-transparent');
            radio.className = 'service-radio w-5 h-5 rounded-full border-2 border-[#1F5C46] bg-[#1F5C46] text-white flex items-center justify-center transition-all';
            iconBox.className = 'service-icon-box w-11 h-11 rounded-xl bg-[#1F5C46]/10 text-[#1F5C46] flex items-center justify-center shrink-0';
          }
          updatePrice();
        });
      });

      // Toggle favorite
      favBtn.addEventListener('click', () => {
        let favs = App.state.favorites || [];
        if (favs.includes(barber.id)) {
          favs = favs.filter(x => x !== barber.id);
          favIcon.className = 'material-symbols-outlined text-[22px] transition-colors text-on-surface';
          App.ui.toast(`Eliminado de favoritos: ${barber.name}`, 'favorite_border');
        } else {
          favs.push(barber.id);
          favIcon.className = 'material-symbols-outlined text-[22px] transition-colors text-red-500 fill-1';
          App.ui.toast(`Añadido a favoritos: ${barber.name}`, 'favorite');
        }
        App.state.favorites = favs;
        App.save();
      });

      // Book CTA
      bookBtn.addEventListener('click', () => {
        if (selectedServices.size === 0) {
          App.ui.toast('Por favor selecciona al menos un servicio', 'warning');
          return;
        }
        App.state.draft = {
          ...App.state.draft,
          barberId: barber.id,
          serviceIds: Array.from(selectedServices),
          rescheduleId: null,
        };
        App.save();
        App.go('#/fecha');
      });

      // Gallery tap lightbox
      root.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          App.ui.toast('Vista previa de trabajo de corte', 'photo_camera');
        });
      });

      updatePrice();
    }
  });
})();
