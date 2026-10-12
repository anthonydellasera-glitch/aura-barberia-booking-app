/* 12. Notificaciones — ported from 12._notificaciones/code.html */
(function () {
  App.register('notificaciones', {
    title: 'Notificaciones',
    render({ data, App }) {
      const activeFilter = 'all';
      const readSet = new Set(App.state.readNotifications || []);
      const unreadTotal = data.NOTIFICATIONS.filter(n => n.unread && !readSet.has(n.id)).length;

      return `
<div class="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
  <!-- Top Header with back button -->
  <header class="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
    <div class="h-16 px-margin flex items-center justify-between">
      <div class="flex items-center gap-space-sm">
        <button data-back="#/inicio" aria-label="Volver" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform" type="button">
          <span class="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div class="flex flex-col">
          <span class="font-label-md text-label-md text-on-surface tracking-tight uppercase">Aura Barbería</span>
          <span class="font-headline-md text-headline-md text-primary tracking-tight leading-none">Notificaciones</span>
        </div>
      </div>
      <div class="w-10"></div>
    </div>
  </header>

  <main class="flex flex-col relative w-full px-margin pt-20 pb-28 bg-surface min-h-screen">
    <div class="flex flex-col w-full pb-6 space-y-space-lg">
      <!-- Sub-Header / Action Toolbar -->
      <div class="flex items-center justify-between pt-space-xs">
        <div class="flex items-center gap-space-xs">
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Bandeja</h1>
          <span class="flex items-center justify-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm" id="unread-counter">${unreadTotal} nuevas</span>
        </div>
        <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-primary-container bg-surface-container-high hover:bg-secondary-fixed active:scale-95 transition-all text-label-md font-label-md" id="mark-all-btn">
          <span class="material-symbols-outlined text-[16px]">done_all</span>
          <span>Marcar leídas</span>
        </button>
      </div>

      <!-- Interactive Filter Chips -->
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5" id="filter-group">
        <button class="filter-chip active flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary shadow-sm transition-all duration-200 shrink-0" data-filter="all">
          <span class="material-symbols-outlined text-[16px]">all_inbox</span>
          <span>Todas</span>
          <span class="ml-1 px-1.5 py-0.2 rounded-full bg-primary text-on-primary text-label-sm font-label-sm">${data.NOTIFICATIONS.length}</span>
        </button>
        <button class="filter-chip flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all duration-200 shrink-0" data-filter="citas">
          <span class="material-symbols-outlined text-[16px]">calendar_clock</span>
          <span>Citas</span>
        </button>
        <button class="filter-chip flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all duration-200 shrink-0" data-filter="promociones">
          <span class="material-symbols-outlined text-[16px]">local_offer</span>
          <span>Promociones</span>
        </button>
        <button class="filter-chip flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all duration-200 shrink-0" data-filter="club">
          <span class="material-symbols-outlined text-[16px]">loyalty</span>
          <span>Club &amp; Pagos</span>
        </button>
      </div>

      <!-- Notifications Container -->
      <div class="flex flex-col space-y-space-lg" id="notifications-list"></div>

      <!-- Playful Empty State -->
      <div class="hidden flex-col items-center justify-center py-12 px-4 text-center" id="empty-state">
        <div class="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-secondary mb-4">
          <span class="material-symbols-outlined text-[36px]">notifications_paused</span>
        </div>
        <h3 class="font-headline-md text-headline-md text-on-surface mb-1">Sin avisos en esta sección</h3>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-xs mb-4">
          Todo impecable y en orden por ahora. Tu ritual de cuidado personal está al día.
        </p>
      </div>
    </div>
  </main>

  ${App.ui.bottomNav('perfil')}
</div>`;
    },
    mount(root, { data, App }) {
      let currentFilter = 'all';
      const listEl = root.querySelector('#notifications-list');
      const emptyEl = root.querySelector('#empty-state');
      const unreadCounter = root.querySelector('#unread-counter');
      const markAllBtn = root.querySelector('#mark-all-btn');

      function getFiltered() {
        if (currentFilter === 'all') return data.NOTIFICATIONS;
        return data.NOTIFICATIONS.filter(n => n.type === currentFilter);
      }

      function updateUI() {
        const readSet = new Set(App.state.readNotifications || []);
        const unreadTotal = data.NOTIFICATIONS.filter(n => n.unread && !readSet.has(n.id)).length;
        unreadCounter.textContent = `${unreadTotal} nuevas`;
        if (unreadTotal === 0) {
          markAllBtn.style.opacity = '0.4';
          markAllBtn.style.pointerEvents = 'none';
        } else {
          markAllBtn.style.opacity = '1';
          markAllBtn.style.pointerEvents = 'auto';
        }

        const items = getFiltered();
        if (items.length === 0) {
          listEl.innerHTML = '';
          emptyEl.classList.remove('hidden');
          emptyEl.classList.add('flex');
          return;
        }

        emptyEl.classList.add('hidden');
        emptyEl.classList.remove('flex');

        // Group by group name ("Hoy", "Esta semana")
        const groups = {};
        items.forEach(item => {
          if (!groups[item.group]) groups[item.group] = [];
          groups[item.group].push(item);
        });

        let html = '';
        for (const [groupName, groupItems] of Object.entries(groups)) {
          html += `
<div class="flex flex-col space-y-space-sm group-section">
  <div class="flex items-center justify-between px-1">
    <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">${groupName}</span>
    <span class="w-12 h-[1px] bg-outline-variant/30"></span>
  </div>
  ${groupItems.map(item => {
    const isUnread = item.unread && !readSet.has(item.id);
    return `
<article class="notification-card relative bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer group ${isUnread ? '' : 'opacity-90'}" data-id="${item.id}">
  <div class="flex items-start gap-3.5">
    <div class="relative shrink-0">
      <div class="w-11 h-11 rounded-xl ${isUnread ? 'bg-primary-fixed/50 text-primary-container' : 'bg-surface-container-high text-on-surface-variant'} flex items-center justify-center">
        <span class="material-symbols-outlined text-[24px]">${item.icon}</span>
      </div>
      ${isUnread ? '<span class="unread-dot absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full ring-2 ring-surface-container-lowest"></span>' : ''}
    </div>
    <div class="flex-1 min-w-0 flex flex-col space-y-1">
      <div class="flex items-center justify-between gap-2">
        <span class="px-2 py-0.5 rounded-full ${isUnread ? 'bg-primary-fixed/40 text-primary-container' : 'bg-surface-container text-on-surface-variant'} font-label-sm text-label-sm uppercase tracking-wider">
          ${item.tag}
        </span>
        <span class="font-body-sm text-body-sm text-secondary shrink-0">${item.time}</span>
      </div>
      <h2 class="font-headline-md text-headline-md text-on-surface pt-0.5 group-hover:text-primary transition-colors">
        ${item.title}
      </h2>
      <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
        ${item.body}
      </p>

      ${item.code ? `
      <div class="mt-2.5 rounded-lg bg-surface-container-low p-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-primary">sell</span>
          <span class="font-label-md text-label-md text-on-surface tracking-wide">CÓDIGO: ${item.code}</span>
        </div>
        <button class="copy-code-btn text-label-sm font-label-sm text-primary-container uppercase active:scale-95" data-code="${item.code}">Copiar</button>
      </div>` : ''}

      ${item.progress ? `
      <div class="pt-1.5 flex items-center gap-2">
        <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden max-w-[140px]">
          <div class="bg-primary h-full rounded-full" style="width: ${(item.progress.value / item.progress.max) * 100}%;"></div>
        </div>
        <span class="font-body-sm text-body-sm text-secondary">${item.progress.value}/${item.progress.max} pts</span>
      </div>` : ''}

      ${item.download ? `
      <div class="pt-1 flex items-center justify-between">
        <span class="font-body-sm text-body-sm text-outline">Folio: AUR-89241</span>
        <span class="material-symbols-outlined text-outline-variant text-[18px]">download</span>
      </div>` : ''}

      ${item.action ? `
      <div class="pt-2">
        <button data-nav="${item.action.nav}" class="inline-flex items-center gap-1 font-label-md text-label-md text-primary-container hover:underline">
          <span>${item.action.label}</span>
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>` : ''}
    </div>
  </div>
</article>`;
  }).join('')}
</div>`;
        }
        listEl.innerHTML = html;

        // Wire copy buttons
        listEl.querySelectorAll('.copy-code-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const code = btn.dataset.code;
            navigator.clipboard?.writeText(code).catch(() => {});
            App.ui.toast(`Código ${code} copiado`, 'content_copy');
          });
        });

        // Wire card click to mark read
        listEl.querySelectorAll('.notification-card').forEach(card => {
          card.addEventListener('click', () => {
            const id = card.dataset.id;
            if (!App.state.readNotifications.includes(id)) {
              App.state.readNotifications.push(id);
              App.save();
              updateUI();
            }
          });
        });
      }

      // Filter chips click
      root.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          root.querySelectorAll('.filter-chip').forEach(c => {
            c.className = 'filter-chip flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high active:scale-95 transition-all duration-200 shrink-0';
          });
          chip.className = 'filter-chip active flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary shadow-sm transition-all duration-200 shrink-0';
          currentFilter = chip.dataset.filter;
          updateUI();
        });
      });

      // Mark all read
      markAllBtn.addEventListener('click', () => {
        App.state.readNotifications = data.NOTIFICATIONS.map(n => n.id);
        App.save();
        App.ui.toast('Todas las notificaciones marcadas como leídas');
        updateUI();
      });

      updateUI();
    }
  });
})();
