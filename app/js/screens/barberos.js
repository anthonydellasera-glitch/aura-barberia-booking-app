/* 10. Lista de Barberos — ported from 10._lista_de_barberos/code.html */
(function () {
  App.register('barberos', {
    title: 'Nuestros Barberos',
    render({ query, data, App }) {
      const isPickMode = query && query.pick === '1';
      const initialQuery = query && query.q ? query.q : '';

      return `
<div class="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
  ${App.ui.appHeader('Barberos')}

  <main class="flex flex-col relative w-full px-margin pt-20 pb-28 bg-surface min-h-screen">
    <div class="flex flex-col w-full pb-6 space-y-space-md">
      <!-- Section Header -->
      <section class="flex flex-col gap-1 pt-space-xs">
        ${isPickMode ? `
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex items-center gap-1 bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Paso 3 de 4 · Selección de Barbero
          </span>
        </div>` : `
        <div class="flex items-center gap-1.5 text-primary-container">
          <span class="material-symbols-outlined text-[18px]">verified</span>
          <span class="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Equipo de Elite</span>
        </div>`}
        <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Nuestros Barberos</h1>
        <p class="font-body-sm text-body-sm text-secondary">
          ${isPickMode ? 'Elige con quién deseas realizar tu corte o ritual seleccionado.' : 'Profesionales expertos listos para atenderte con la máxima precisión.'}
        </p>
      </section>

      <!-- Search Input -->
      <section class="w-full">
        <div class="flex items-center bg-surface-container-lowest rounded-2xl px-space-md py-space-sm shadow-sm border border-black/[0.04]">
          <span class="material-symbols-outlined text-secondary text-[22px] mr-space-sm select-none">search</span>
          <input id="barberSearch" class="w-full bg-transparent border-0 p-0 font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none" placeholder="Buscar por nombre o especialidad..." type="text" value="${initialQuery}">
          <button id="clearSearch" class="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface transition-colors ${initialQuery ? '' : 'hidden'}">
            <span class="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        </div>
      </section>

      <!-- Category Filter Chips -->
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5" id="barberFilters">
        ${data.BARBER_CATEGORIES.map((cat, idx) => `
        <button class="filter-chip ${idx === 0 ? 'active bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'} flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 shrink-0" data-cat="${cat.id}">
          <span>${cat.label}</span>
        </button>`).join('')}
      </div>

      <!-- Live Counter / Status Row -->
      <div class="flex items-center justify-between px-1 text-secondary font-label-sm text-label-sm">
        <span id="barberCount">${data.BARBERS.length} Maestros en turno hoy</span>
        <span class="flex items-center gap-1 text-primary-container font-medium">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Citas hoy disponibles
        </span>
      </div>

      <!-- Barbers List Stack -->
      <div class="flex flex-col space-y-space-md" id="barberList"></div>

      <!-- Empty State -->
      <div class="hidden flex-col items-center justify-center py-12 px-4 text-center" id="emptyState">
        <div class="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-secondary mb-3">
          <span class="material-symbols-outlined text-[32px]">search_off</span>
        </div>
        <h3 class="font-headline-md text-headline-md text-on-surface mb-1">No encontramos coincidencias</h3>
        <p class="font-body-md text-body-md text-secondary max-w-xs mb-4">
          Intenta buscar por otro nombre o selecciona la categoría "Todos".
        </p>
        <button id="resetFiltersBtn" class="px-4 py-2 rounded-xl bg-surface-container-high text-primary-container font-label-md text-label-md hover:bg-surface-container-highest transition-colors">
          Restablecer filtros
        </button>
      </div>

      <!-- Quick Assignment Help Card -->
      <section class="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/40 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary-container">
            <span class="material-symbols-outlined text-[20px]">help</span>
          </div>
          <div class="flex flex-col">
            <span class="font-label-md text-label-md text-on-surface font-semibold">¿No sabes a quién elegir?</span>
            <span class="font-body-sm text-body-sm text-secondary">Te asignamos al mejor disponible para ti</span>
          </div>
        </div>
        <button id="autoAssignBtn" class="px-3.5 py-2 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md active:scale-95 transition-transform">
          Asignar
        </button>
      </section>
    </div>
  </main>

  ${App.ui.bottomNav('barberos')}
</div>`;
    },
    mount(root, { query, data, App }) {
      const isPickMode = query && query.pick === '1';
      let currentCat = 'todos';
      let currentSearch = (query && query.q) || '';

      const searchInput = root.querySelector('#barberSearch');
      const clearBtn = root.querySelector('#clearSearch');
      const listContainer = root.querySelector('#barberList');
      const emptyState = root.querySelector('#emptyState');
      const counterEl = root.querySelector('#barberCount');

      function filterBarbers() {
        return data.BARBERS.filter(b => {
          const matchCat = currentCat === 'todos' || (b.categories && b.categories.includes(currentCat));
          const q = currentSearch.toLowerCase().trim();
          const matchSearch = !q || b.name.toLowerCase().includes(q) || b.specialty.toLowerCase().includes(q);
          return matchCat && matchSearch;
        });
      }

      function renderList() {
        const filtered = filterBarbers();
        counterEl.textContent = `${filtered.length} Maestro${filtered.length === 1 ? '' : 's'} en turno hoy`;

        if (filtered.length === 0) {
          listContainer.innerHTML = '';
          emptyState.classList.remove('hidden');
          emptyState.classList.add('flex');
          return;
        }

        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');

        listContainer.innerHTML = filtered.map(b => `
<div class="barber-card flex flex-col bg-surface-container-lowest rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer group" data-id="${b.id}">
  <div class="flex gap-4">
    <div class="relative w-24 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-sm bg-surface-container">
      <img class="w-full h-full object-cover" src="${b.img}" alt="${b.name}">
      ${b.badge ? `
      <span class="absolute top-1.5 left-1.5 bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-[10px] px-1.5 py-0.5 rounded-full shadow-sm font-semibold">
        ${b.badge}
      </span>` : ''}
    </div>
    <div class="flex flex-col justify-between flex-grow min-w-0">
      <div>
        <h2 class="font-headline-md text-headline-md text-on-surface truncate group-hover:text-primary transition-colors">${b.fullName || b.name}</h2>
        <p class="font-label-md text-label-md text-primary line-clamp-1 mt-0.5">${b.specialty}</p>
        <p class="font-body-sm text-body-sm text-secondary mt-1">${b.years} años de experiencia</p>
      </div>
      <div class="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-lg w-fit mt-2">
        <span class="material-symbols-outlined text-[16px] text-amber-500 fill-1">star</span>
        <span class="font-label-md text-label-md text-on-surface font-semibold">${b.rating}</span>
        <span class="font-body-sm text-body-sm text-outline">(${b.reviews} reseñas)</span>
      </div>
    </div>
  </div>
  <div class="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-black/[0.04]">
    <span class="font-label-sm text-label-sm text-secondary flex items-center gap-1">
      <span class="material-symbols-outlined text-[16px] text-primary">schedule</span>
      Próx: ${b.next} hrs
    </span>
    <button class="select-barber-btn h-[46px] px-5 bg-primary-container text-on-primary rounded-xl font-label-md text-label-md active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#164333]" data-id="${b.id}">
      <span>${isPickMode ? 'Elegir para cita' : 'Ver perfil y agendar'}</span>
      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
    </button>
  </div>
</div>`).join('');

        function handleSelect(id) {
          if (isPickMode) {
            App.state.draft.barberId = id;
            App.save();
            App.ui.toast(`Barbero seleccionado: ${App.barber(id).name}`);
            App.go('#/pago');
          } else {
            App.go(`#/barbero/${id}`);
          }
        }

        listContainer.querySelectorAll('.barber-card').forEach(card => {
          card.addEventListener('click', () => handleSelect(card.dataset.id));
        });
        listContainer.querySelectorAll('.select-barber-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleSelect(btn.dataset.id);
          });
        });
      }

      // Filter chips
      root.querySelectorAll('#barberFilters .filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          root.querySelectorAll('#barberFilters .filter-chip').forEach(c => {
            c.className = 'filter-chip bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 shrink-0';
          });
          chip.className = 'filter-chip active bg-primary-container text-on-primary shadow-sm flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 shrink-0';
          currentCat = chip.dataset.cat;
          renderList();
        });
      });

      // Search input
      searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value;
        if (currentSearch) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
        renderList();
      });

      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        clearBtn.classList.add('hidden');
        renderList();
      });

      root.querySelector('#resetFiltersBtn').addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        currentCat = 'todos';
        clearBtn.classList.add('hidden');
        root.querySelectorAll('#barberFilters .filter-chip')[0]?.click();
        renderList();
      });

      // Auto assign
      root.querySelector('#autoAssignBtn').addEventListener('click', () => {
        const topBarber = data.BARBERS[0];
        if (isPickMode) {
          App.state.draft.barberId = topBarber.id;
          App.save();
          App.ui.toast(`Asignado: ${topBarber.name}`);
          App.go('#/pago');
        } else {
          App.ui.toast(`Te recomendamos a ${topBarber.name}`);
          App.go(`#/barbero/${topBarber.id}`);
        }
      });

      renderList();
    }
  });
})();
