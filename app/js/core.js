/* Aura Barbería — core runtime: state, router, shared UI helpers */
(function () {
  const D = window.AURA_DATA;
  const STORAGE_KEY = 'aura-barberia-state-v1';

  /* ---------------- Date helpers ---------------- */
  const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const pad = n => String(n).padStart(2, '0');
  const toISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fromISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

  const fmt = {
    DAYS, MONTHS, toISO, fromISO, today, addDays,
    /** 18 -> "$18 USD"; money(15, true) -> "$15.00 USD" */
    money(n, decimals) { const v = decimals ? Number(n).toFixed(2) : (Number.isInteger(n) ? String(n) : Number(n).toFixed(2)); return `$${v} USD`; },
    num2(n) { return Number(n).toFixed(2); },
    /** "2026-10-24" -> "Sábado, 24 de Octubre" */
    dateLong(iso) { const d = fromISO(iso); return `${DAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]}`; },
    /** "Sáb, 24 de Octubre" */
    dateMedium(iso) { const d = fromISO(iso); return `${DAYS[d.getDay()].slice(0, 3)}, ${d.getDate()} de ${MONTHS[d.getMonth()]}`; },
    /** "Sáb 24 Oct" */
    dateShort(iso) { const d = fromISO(iso); return `${DAYS[d.getDay()].slice(0, 3)} ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`; },
    /** "Sábado, 24 Oct" */
    dateDayMonth(iso) { const d = fromISO(iso); return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`; },
    /** "12 Sep" */
    dayMonth(iso) { const d = fromISO(iso); return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`; },
    monthYear(iso) { const d = fromISO(iso); return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`; },
    /** "10:30" -> "10:30 AM", "15:00" -> "03:00 PM" */
    time12(t) { let [h, m] = t.split(':').map(Number); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return `${pad(h)}:${pad(m)} ${ap}`; },
    /** relative label: "hoy", "mañana", "en 3 días", "hace 2 días" */
    relative(iso) {
      const diff = Math.round((fromISO(iso) - today()) / 86400000);
      if (diff === 0) return 'hoy'; if (diff === 1) return 'mañana'; if (diff === -1) return 'ayer';
      return diff > 0 ? `en ${diff} días` : `hace ${-diff} días`;
    },
  };

  /* ---------------- State ---------------- */
  function seedState() {
    const t = today();
    const year = t.getFullYear();
    return {
      loggedIn: false,
      user: { ...D.USER },
      favorites: ['carlos', 'daniel'],
      readNotifications: [],
      notificationsEnabled: true,
      draft: emptyDraft(),
      bookings: [
        { id: 'b1', ref: 'AUR-8942', barberId: 'carlos', serviceIds: ['fade'], date: toISO(addDays(t, 2)), time: '10:30',
          subtotal: 18, discount: 3.6, fee: 0.6, total: 15, payment: 'card', status: 'confirmada', createdAt: Date.now() },
        { id: 'b0', ref: 'AUR-7710', barberId: 'daniel', serviceIds: ['afeitado'], date: `${year}-09-12`, time: '16:00',
          subtotal: 18, discount: 0, fee: 0, total: 18, payment: 'card', status: 'completada', rating: 5, createdAt: Date.now() - 1 },
      ],
    };
  }
  function emptyDraft() {
    return { serviceIds: [], barberId: null, date: null, time: null, promo: 'AURA20', payment: 'card', rescheduleId: null };
  }
  function load() {
    try { const s = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (s && s.bookings) return { ...seedState(), ...s, draft: { ...emptyDraft(), ...(s.draft || {}) } }; } catch (e) { /* ignore */ }
    return seedState();
  }

  /* ---------------- Router ---------------- */
  // Route patterns → screen names. Order matters.
  const ROUTES = [
    ['/splash', 'splash'],
    ['/login', 'login'],
    ['/registro', 'registro'],
    ['/inicio', 'inicio'],
    ['/barberos', 'barberos'],
    ['/barbero/:id', 'barbero'],
    ['/servicios', 'servicios'],
    ['/fecha', 'fecha'],
    ['/pago', 'pago'],
    ['/confirmacion/:id', 'confirmacion'],
    ['/reservas', 'reservas'],
    ['/perfil', 'perfil'],
    ['/notificaciones', 'notificaciones'],
  ];

  function parseHash() {
    const raw = (location.hash || '').replace(/^#/, '') || '';
    const [path, qs] = raw.split('?');
    const query = Object.fromEntries(new URLSearchParams(qs || ''));
    for (const [pattern, name] of ROUTES) {
      const pp = pattern.split('/'), hp = (path || '').split('/');
      if (pp.length !== hp.length) continue;
      const params = {}; let ok = true;
      pp.forEach((seg, i) => { if (seg.startsWith(':')) params[seg.slice(1)] = decodeURIComponent(hp[i]); else if (seg !== hp[i]) ok = false; });
      if (ok) return { name, params, query, path };
    }
    return null;
  }

  let cleanup = null;
  let navDepth = 0;

  const App = {
    data: D,
    fmt,
    screens: {},
    state: load(),
    route: null,

    save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(App.state)); },
    reset() { localStorage.removeItem(STORAGE_KEY); App.state = seedState(); App.save(); },

    register(name, def) { App.screens[name] = def; },

    /** Navigate to a hash route, e.g. App.go('#/barbero/carlos') */
    go(hash, opts = {}) {
      if (!hash.startsWith('#')) hash = '#' + hash;
      if (opts.replace) { history.replaceState(null, '', hash); render(); }
      else if (location.hash === hash) render();
      else { navDepth++; location.hash = hash; }
    },
    /** Go back in history, or to fallback if there is no in-app history */
    back(fallback) {
      if (navDepth > 0) { navDepth--; history.back(); }
      else App.go(fallback || (App.state.loggedIn ? '#/inicio' : '#/splash'), { replace: true });
    },
    /** Re-render the current screen (keeps scroll position) */
    rerender() { render({ keepScroll: true }); },

    /* ---------- Lookups ---------- */
    barber(id) { return D.BARBERS.find(b => b.id === id); },
    service(id) { return D.SERVICES.find(s => s.id === id); },

    /* ---------- Booking helpers ---------- */
    booking: {
      draft() { return App.state.draft; },
      reset() { App.state.draft = emptyDraft(); App.save(); },
      toggleService(id) {
        const d = App.state.draft; const i = d.serviceIds.indexOf(id);
        if (i >= 0) d.serviceIds.splice(i, 1); else d.serviceIds.push(id);
        App.save();
      },
      services(ids) { return (ids || App.state.draft.serviceIds).map(App.service).filter(Boolean); },
      duration(ids) { return App.booking.services(ids).reduce((a, s) => a + s.duration, 0); },
      subtotal(ids) { return App.booking.services(ids).reduce((a, s) => a + s.price, 0); },
      /** Human readable services title, e.g. "Corte Clásico Fade & Toalla Caliente" */
      title(ids) { const s = App.booking.services(ids); return s.length ? s.map(x => x.shortName || x.name).join(' + ') : 'Sin servicio'; },
      totals() {
        const d = App.state.draft; const subtotal = App.booking.subtotal();
        const promo = d.promo && D.PROMO_CODES[d.promo];
        const discount = promo ? Math.round(subtotal * promo.pct) / 100 : 0;
        const fee = subtotal > 0 ? D.SERVICE_FEE : 0;
        return { subtotal, discount, fee, total: Math.max(0, subtotal - discount + fee), promo: promo ? { code: d.promo, ...promo } : null };
      },
      /** Persist draft as a booking (or apply a reschedule). Returns booking id. */
      confirm() {
        const d = App.state.draft;
        if (d.rescheduleId) {
          const b = App.state.bookings.find(x => x.id === d.rescheduleId);
          if (b) { b.date = d.date; b.time = d.time; if (d.barberId) b.barberId = d.barberId; }
          App.booking.reset();
          return b ? b.id : null;
        }
        const t = App.booking.totals();
        const id = 'b' + Date.now();
        const booking = {
          id, ref: 'AUR-' + Math.floor(1000 + Math.random() * 9000), barberId: d.barberId, serviceIds: [...d.serviceIds],
          date: d.date, time: d.time, subtotal: t.subtotal, discount: t.discount, fee: t.fee, total: t.total,
          payment: d.payment, status: 'confirmada', createdAt: Date.now(),
        };
        App.state.bookings.unshift(booking);
        App.booking.reset();
        return id;
      },
      upcoming() {
        const now = toISO(today());
        return App.state.bookings.filter(b => b.status === 'confirmada' && b.date >= now).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
      },
      past() {
        const now = toISO(today());
        return App.state.bookings.filter(b => b.status === 'completada' || (b.status === 'confirmada' && b.date < now)).sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
      },
      cancelled() { return App.state.bookings.filter(b => b.status === 'cancelada'); },
    },

    unreadCount() { return D.NOTIFICATIONS.filter(n => n.unread && !App.state.readNotifications.includes(n.id)).length; },

    /* ---------- Shared UI ---------- */
    ui: {
      /** Sticky top app bar used by tab screens (logo + section title + bell + avatar) */
      appHeader(title) {
        const unread = App.unreadCount();
        return `
<header class="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
  <div class="h-16 px-margin flex items-center justify-between">
    <button class="flex items-center gap-space-sm text-left" data-nav="#/inicio">
      <img alt="Logo Aura Barbería" class="h-8 w-auto object-contain" src="${D.IMG.logo}">
      <div class="flex flex-col">
        <span class="font-label-md text-label-md text-on-surface tracking-tight uppercase">Aura Barbería</span>
        <span class="font-headline-md text-headline-md text-primary tracking-tight leading-none">${title}</span>
      </div>
    </button>
    <div class="flex items-center gap-space-xs">
      <button aria-label="Notificaciones" data-nav="#/notificaciones" class="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
        <span class="material-symbols-outlined text-[22px]">notifications</span>
        ${unread ? '<span class="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>' : ''}
      </button>
      <button aria-label="Perfil" data-nav="#/perfil" class="w-11 h-11 flex items-center justify-center">
        <img alt="Perfil" class="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container/20" src="${D.IMG.avatar}">
      </button>
    </div>
  </div>
</header>`;
      },

      /** Bottom tab bar. active: 'inicio' | 'reservas' | 'barberos' | 'perfil' */
      bottomNav(active) {
        const tabs = [
          ['inicio', 'home', 'Inicio'], ['reservas', 'calendar_today', 'Reservas'],
          ['barberos', 'content_cut', 'Barberos'], ['perfil', 'person', 'Perfil'],
        ];
        return `
<nav class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
  <div class="flex justify-around items-center h-[68px] px-space-xs">
    ${tabs.map(([id, icon, label]) => {
      const on = id === active;
      return `<a ${on ? 'aria-current="page"' : ''} href="#/${id}" class="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-all ${on ? 'text-primary-container' : 'text-secondary hover:text-on-surface'}">
        <span class="material-symbols-outlined text-[24px]" ${on ? 'style="font-variation-settings:\'FILL\' 1"' : ''}>${icon}</span>
        <span class="font-label-sm text-label-sm mt-0.5">${label}</span>
        <span class="w-1 h-1 rounded-full bg-primary-container mt-1 transition-opacity ${on ? 'opacity-100' : 'opacity-0'}"></span>
      </a>`;
    }).join('')}
  </div>
</nav>`;
      },

      /** Small transient message at the bottom of the device */
      toast(msg, icon = 'check_circle') {
        const host = document.getElementById('toast-host');
        const el = document.createElement('div');
        el.className = 'toast pointer-events-auto flex items-center gap-2 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-lg font-label-md text-label-md';
        el.innerHTML = `<span class="material-symbols-outlined text-[18px] text-primary-fixed" style="font-variation-settings:'FILL' 1">${icon}</span><span>${msg}</span>`;
        host.appendChild(el);
        setTimeout(() => { el.classList.add('toast-out'); setTimeout(() => el.remove(), 300); }, 2200);
      },

      esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },
    },
  };

  /* ---------------- Rendering ---------------- */
  function render(opts = {}) {
    const r = parseHash();
    if (!r || !App.screens[r.name]) {
      App.go(App.state.loggedIn ? '#/inicio' : '#/splash', { replace: true });
      return;
    }
    const scroller = document.getElementById('scroller');
    const root = document.getElementById('screen');
    const prevTop = scroller.scrollTop;
    if (typeof cleanup === 'function') { try { cleanup(); } catch (e) { console.error(e); } }
    cleanup = null;

    App.route = r;
    const def = App.screens[r.name];
    const ctx = { params: r.params, query: r.query, state: App.state, data: D, App };
    root.innerHTML = def.render(ctx);
    root.dataset.screen = r.name;
    document.title = 'Aura Barbería' + (def.title ? ' · ' + def.title : '');
    if (!opts.keepScroll) {
      scroller.scrollTop = 0;
      root.classList.remove('screen-enter'); void root.offsetWidth; root.classList.add('screen-enter');
    } else {
      scroller.scrollTop = prevTop;
    }
    if (def.mount) cleanup = def.mount(root, ctx) || null;
  }

  // Delegated navigation: any element with data-nav="#/route" or data-back
  document.addEventListener('click', e => {
    const back = e.target.closest('[data-back]');
    if (back) { e.preventDefault(); App.back(back.getAttribute('data-back') || undefined); return; }
    const nav = e.target.closest('[data-nav]');
    if (nav) { e.preventDefault(); App.go(nav.getAttribute('data-nav')); }
  });

  window.addEventListener('hashchange', () => render());

  App.start = function () {
    if (!location.hash) history.replaceState(null, '', App.state.loggedIn ? '#/inicio' : '#/splash');
    render();
  };

  window.App = App;
})();
