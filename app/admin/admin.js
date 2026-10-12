/* Aura Barbería — CEO & Executive Dashboard Engine */
(function () {
  const STORAGE_KEY = 'aura-barberia-state-v1';
  const SERVICES_OVERRIDE_KEY = 'aura-services-custom-v1';

  // Helper to load client state
  function getClientState() {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (s) return s;
    } catch (e) {}
    return null;
  }

  function saveClientState(st) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
  }

  // Allow customized services
  function getServices() {
    try {
      const custom = JSON.parse(localStorage.getItem(SERVICES_OVERRIDE_KEY));
      if (custom && Array.isArray(custom)) return custom;
    } catch (e) {}
    return window.AURA_DATA.SERVICES;
  }

  function saveServices(srvList) {
    localStorage.setItem(SERVICES_OVERRIDE_KEY, JSON.stringify(srvList));
  }

  const Admin = {
    currentTab: 'overview',
    currentPeriod: 'month',
    chartInstance: null,
    demandChartInstance: null,

    init() {
      Admin.renderHeader();
      Admin.setTab('overview');
      Admin.setupListeners();
    },

    setTab(tabId) {
      Admin.currentTab = tabId;
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.tab === tabId) {
          link.classList.add('bg-[#1F5C46]', 'text-white', 'shadow-sm');
          link.classList.remove('text-[#404944]', 'hover:bg-black/5');
        } else {
          link.classList.remove('bg-[#1F5C46]', 'text-white', 'shadow-sm');
          link.classList.add('text-[#404944]', 'hover:bg-black/5');
        }
      });

      const container = document.getElementById('main-content');
      switch (tabId) {
        case 'overview':
          container.innerHTML = Admin.renderOverview();
          Admin.mountOverview();
          break;
        case 'appointments':
          container.innerHTML = Admin.renderAppointments();
          Admin.mountAppointments();
          break;
        case 'barbers':
          container.innerHTML = Admin.renderBarbers();
          Admin.mountBarbers();
          break;
        case 'services':
          container.innerHTML = Admin.renderServices();
          Admin.mountServices();
          break;
        case 'clients':
          container.innerHTML = Admin.renderClients();
          Admin.mountClients();
          break;
        case 'finances':
          container.innerHTML = Admin.renderFinances();
          Admin.mountFinances();
          break;
        case 'settings':
          container.innerHTML = Admin.renderSettings();
          Admin.mountSettings();
          break;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    /* ========================================================
       1. OVERVIEW (RESUMEN EJECUTIVO)
    ======================================================== */
    renderOverview() {
      const clientState = getClientState();
      const bookings = (clientState && clientState.bookings) || [];
      const confirmed = bookings.filter(b => b.status === 'confirmada' || b.status === 'completada');

      const appRevenue = confirmed.reduce((acc, b) => acc + (b.total || 0), 0);
      const totalMonthlyRev = 10450 + appRevenue;
      const totalAppointments = 458 + confirmed.length;
      const avgTicket = (totalMonthlyRev / totalAppointments).toFixed(2);
      const chairs = window.AURA_ADMIN_DATA.CHAIRS;
      const occupiedChairs = chairs.filter(c => c.status === 'en_servicio').length;
      const occupancyRate = Math.round((occupiedChairs / chairs.length) * 100);

      return `
<div class="space-y-6">
  <!-- Top Stat Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Card 1 -->
    <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-[#71717A]">Facturación Mes</span>
        <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">+14.6%</span>
      </div>
      <div class="mt-3">
        <h3 class="text-3xl font-extrabold text-[#1a1c1b] tracking-tight">$${totalMonthlyRev.toLocaleString()} USD</h3>
        <p class="text-xs text-[#71717A] mt-1">vs $9,120 USD el mes pasado</p>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-[#71717A]">Citas Totales</span>
        <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">+8.2%</span>
      </div>
      <div class="mt-3">
        <h3 class="text-3xl font-extrabold text-[#1a1c1b] tracking-tight">${totalAppointments} citas</h3>
        <p class="text-xs text-[#71717A] mt-1">${bookings.length} registradas en la App</p>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-[#71717A]">Ticket Promedio</span>
        <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">⭐</span>
      </div>
      <div class="mt-3">
        <h3 class="text-3xl font-extrabold text-[#1a1c1b] tracking-tight">$${avgTicket} USD</h3>
        <p class="text-xs text-[#71717A] mt-1">Gasto medio por cliente</p>
      </div>
    </div>

    <!-- Card 4 -->
    <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-[#71717A]">Ocupación en Vivo</span>
        <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">${occupiedChairs}/4</span>
      </div>
      <div class="mt-3">
        <h3 class="text-3xl font-extrabold text-[#1a1c1b] tracking-tight">${occupancyRate}%</h3>
        <p class="text-xs text-[#71717A] mt-1">2 sillas atendiendo ahora</p>
      </div>
    </div>
  </div>

  <!-- Charts & Floor Status Row -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Revenue Evolution Chart -->
    <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-black/[0.06] shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-base font-bold text-[#1a1c1b]">Evolución de Ingresos y Tendencia</h3>
          <p class="text-xs text-[#71717A]">Comparativa mensual últimos 6 meses</p>
        </div>
        <span class="text-xs font-bold text-[#1F5C46] bg-[#E8F3EE] px-3 py-1 rounded-full uppercase tracking-wider">Crecimiento +62% YoY</span>
      </div>
      <div class="relative h-64 w-full">
        <canvas id="revenueChart"></canvas>
      </div>
    </div>

    <!-- Live Floor / Sillas en Sala -->
    <div class="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-bold text-[#1a1c1b]">Sillas en Sala (En Vivo)</h3>
          <span class="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            En Directo
          </span>
        </div>
        <div class="space-y-3">
          ${chairs.map(c => {
            const barber = window.AURA_DATA.BARBERS.find(b => b.id === c.barberId);
            const isOcc = c.status === 'en_servicio';
            const isNext = c.status === 'proximo';
            return `
            <div class="p-3 rounded-xl border ${isOcc ? 'border-emerald-200 bg-emerald-50/40' : (isNext ? 'border-amber-200 bg-amber-50/40' : 'border-gray-200 bg-gray-50/60')} flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="${barber.avatar || barber.thumb}" class="w-10 h-10 rounded-full object-cover">
                <div>
                  <h4 class="text-xs font-bold text-[#1a1c1b]">${c.name} · ${barber.name.split(' ')[0]}</h4>
                  <p class="text-[11px] text-[#71717A]">${c.clientName ? `${c.clientName} (${c.service})` : 'Silla lista para el próximo cliente'}</p>
                </div>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isOcc ? 'bg-emerald-600 text-white' : (isNext ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700')}">
                ${isOcc ? `Ocupada (${c.endsAt})` : (isNext ? 'Próximo' : 'Libre')}
              </span>
            </div>`;
          }).join('')}
        </div>
      </div>
      <button onclick="Admin.openNewAppointmentModal()" class="w-full mt-4 h-11 bg-[#1F5C46] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#164333] transition-colors shadow-sm">
        <span class="material-symbols-outlined text-[16px]">add</span>
        <span>Asignar Cliente en Silla</span>
      </button>
    </div>
  </div>

  <!-- Appointments Queue (Today's Live Queue) -->
  <div class="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-base font-bold text-[#1a1c1b]">Citas del Día y Gestión Rápida</h3>
        <p class="text-xs text-[#71717A]">Sincronizadas con la aplicación de clientes en tiempo real</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="Admin.setTab('appointments')" class="text-xs font-bold text-[#1F5C46] hover:underline">Ver agenda completa →</button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="border-b border-black/[0.06] text-[#71717A] uppercase tracking-wider font-semibold">
            <th class="pb-3">Ref</th>
            <th class="pb-3">Cliente</th>
            <th class="pb-3">Barbero</th>
            <th class="pb-3">Servicio</th>
            <th class="pb-3">Horario</th>
            <th class="pb-3">Total</th>
            <th class="pb-3">Estado</th>
            <th class="pb-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-black/[0.04]">
          ${bookings.slice(0, 6).map(b => {
            const barber = window.AURA_DATA.BARBERS.find(x => x.id === b.barberId) || window.AURA_DATA.BARBERS[0];
            const sTitle = window.App ? window.App.booking.title(b.serviceIds) : 'Corte Clásico';
            return `
            <tr class="hover:bg-[#F9F9F6]/80 transition-colors">
              <td class="py-3.5 font-bold text-[#1F5C46]">#${b.ref}</td>
              <td class="py-3.5 font-semibold text-[#1a1c1b]">${(clientState && clientState.user && clientState.user.name) || 'Mateo Silva'}</td>
              <td class="py-3.5 flex items-center gap-2">
                <img src="${barber.avatar || barber.thumb}" class="w-6 h-6 rounded-full object-cover">
                <span>${barber.name}</span>
              </td>
              <td class="py-3.5">${sTitle}</td>
              <td class="py-3.5 font-medium">${b.time || '10:30'} (${b.date})</td>
              <td class="py-3.5 font-bold text-[#1a1c1b]">$${Number(b.total).toFixed(2)} USD</td>
              <td class="py-3.5">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${b.status === 'confirmada' ? 'bg-emerald-100 text-emerald-800' : (b.status === 'completada' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800')}">
                  ${b.status}
                </span>
              </td>
              <td class="py-3.5 text-right space-x-1">
                ${b.status === 'confirmada' ? `
                <button onclick="Admin.completeBooking('${b.id}')" title="Marcar como completada" class="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 transition-colors text-[11px]">
                  Completar
                </button>
                <button onclick="Admin.cancelBooking('${b.id}')" title="Cancelar cita" class="px-2 py-1 bg-red-50 text-red-700 font-bold rounded-lg hover:bg-red-100 transition-colors text-[11px]">
                  ✕
                </button>` : `
                <span class="text-gray-400 text-[11px]">Cerrada</span>`}
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>`;
    },

    mountOverview() {
      // Build Chart with Chart.js
      const ctx = document.getElementById('revenueChart');
      if (ctx && window.Chart) {
        const revData = window.AURA_ADMIN_DATA.MONTHLY_REVENUE;
        Admin.chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: revData.map(d => d.month),
            datasets: [{
              label: 'Ingresos Netos ($ USD)',
              data: revData.map(d => d.revenue),
              borderColor: '#1F5C46',
              backgroundColor: 'rgba(31, 92, 70, 0.08)',
              borderWidth: 3,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: '#1F5C46',
              pointRadius: 4,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              y: {
                beginAtZero: false,
                grid: { color: 'rgba(0,0,0,0.04)' }
              },
              x: {
                grid: { display: false }
              }
            }
          }
        });
      }
    },

    /* ========================================================
       2. AGENDA & OPERACIONES (APPOINTMENTS)
    ======================================================== */
    renderAppointments() {
      const clientState = getClientState();
      const bookings = (clientState && clientState.bookings) || [];
      return `
<div class="space-y-6">
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm">
    <div>
      <h2 class="text-lg font-extrabold text-[#1a1c1b]">Agenda Operativa y Citas</h2>
      <p class="text-xs text-[#71717A]">Control total de la programación, turnos y estados de servicio.</p>
    </div>
    <div class="flex items-center gap-2.5">
      <button onclick="Admin.openNewAppointmentModal()" class="h-10 px-4 bg-[#1F5C46] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#164333] transition-colors shadow-sm">
        <span class="material-symbols-outlined text-[16px]">add</span>
        <span>Nueva Cita Manual</span>
      </button>
    </div>
  </div>

  <div class="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-5">
    <div class="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.06]">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-[#71717A] uppercase tracking-wider">Filtrar por estado:</span>
        <button onclick="Admin.filterAppointments('all')" class="px-3 py-1 rounded-full text-xs font-bold bg-[#1F5C46] text-white">Todas (${bookings.length})</button>
        <button onclick="Admin.filterAppointments('confirmada')" class="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200">Confirmadas</button>
        <button onclick="Admin.filterAppointments('completada')" class="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200">Completadas</button>
      </div>
      <span class="text-xs text-[#71717A]">Sede Central · Calle Serrano 42</span>
    </div>

    <div class="space-y-3" id="appointments-container">
      ${bookings.map(b => {
        const barber = window.AURA_DATA.BARBERS.find(x => x.id === b.barberId) || window.AURA_DATA.BARBERS[0];
        const sTitle = window.App ? window.App.booking.title(b.serviceIds) : 'Corte Clásico';
        const isDone = b.status === 'completada';
        const isCancelled = b.status === 'cancelada';

        return `
        <div class="p-4 rounded-xl border border-black/[0.06] bg-[#F9F9F6]/40 hover:bg-white transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-white border border-black/[0.06] shadow-xs flex flex-col items-center justify-center shrink-0">
              <span class="text-[10px] font-bold uppercase text-[#71717A]">${b.date.slice(5)}</span>
              <span class="text-xs font-black text-[#1F5C46]">${b.time || '10:30'}</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm text-[#1a1c1b]">#${b.ref} · ${(clientState && clientState.user && clientState.user.name) || 'Mateo Silva'}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${b.status === 'confirmada' ? 'bg-emerald-100 text-emerald-800' : (isDone ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800')}">
                  ${b.status}
                </span>
              </div>
              <p class="text-xs text-[#71717A] mt-0.5">${sTitle} · Atendido por <span class="font-semibold text-[#1a1c1b]">${barber.name}</span></p>
            </div>
          </div>

          <div class="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
            <div class="text-right">
              <span class="text-xs text-[#71717A]">Cobrado</span>
              <p class="text-base font-extrabold text-[#1F5C46]">$${Number(b.total).toFixed(2)} USD</p>
            </div>

            <div class="flex items-center gap-1.5">
              ${!isDone && !isCancelled ? `
              <button onclick="Admin.completeBooking('${b.id}')" class="px-3 py-1.5 bg-[#1F5C46] text-white text-xs font-bold rounded-xl hover:bg-[#164333] transition-colors">
                Completar
              </button>
              <button onclick="Admin.cancelBooking('${b.id}')" class="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors">
                Cancelar
              </button>` : `
              <span class="text-xs text-gray-400 font-semibold italic">Finalizada</span>`}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>
</div>`;
    },

    mountAppointments() {},

    /* ========================================================
       3. BARBEROS & RENDIMIENTO / COMISIONES
    ======================================================== */
    renderBarbers() {
      const barbers = window.AURA_DATA.BARBERS;
      const clientState = getClientState();
      const bookings = (clientState && clientState.bookings) || [];
      const rate = window.AURA_ADMIN_DATA.COMMISSION_RATE; // 50%

      return `
<div class="space-y-6">
  <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h2 class="text-lg font-extrabold text-[#1a1c1b]">Equipo de Maestros Barberos</h2>
      <p class="text-xs text-[#71717A]">Desempeño individual, cortes realizados y comisiones calculadas al 50%.</p>
    </div>
    <div class="text-right">
      <span class="text-xs text-[#71717A]">Tasa de Comisión</span>
      <p class="text-sm font-bold text-[#1F5C46]">50% Servicio / 50% Salón</p>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    ${barbers.map(barber => {
      const bBookings = bookings.filter(b => b.barberId === barber.id);
      const baseRev = barber.id === 'carlos' ? 3850 : (barber.id === 'daniel' ? 2920 : (barber.id === 'sofia' ? 2450 : 2100));
      const addRev = bBookings.reduce((sum, b) => sum + (b.total || 0), 0);
      const totalGen = baseRev + addRev;
      const commission = totalGen * rate;
      const salonShare = totalGen * (1 - rate);

      return `
      <div class="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3.5">
              <img src="${barber.hero || barber.img}" class="w-16 h-20 rounded-xl object-cover shadow-xs bg-surface-container">
              <div>
                <div class="flex items-center gap-1.5">
                  <h3 class="text-base font-extrabold text-[#1a1c1b]">${barber.fullName || barber.name}</h3>
                  <span class="text-xs">🏆</span>
                </div>
                <p class="text-xs text-[#1F5C46] font-semibold mt-0.5">${barber.title}</p>
                <div class="flex items-center gap-1 mt-1 text-xs text-[#71717A]">
                  <span class="text-amber-500">★</span>
                  <span class="font-bold text-[#1a1c1b]">${barber.rating}</span>
                  <span>(${barber.reviews} reseñas)</span>
                </div>
              </div>
            </div>
            <span class="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-bold uppercase">
              Activo Hoy
            </span>
          </div>

          <!-- Metrics Strip -->
          <div class="grid grid-cols-3 gap-2 mt-5 p-3 rounded-xl bg-[#F9F9F6] text-center">
            <div>
              <span class="text-[10px] font-semibold uppercase text-[#71717A]">Facturado</span>
              <p class="text-sm font-extrabold text-[#1a1c1b] mt-0.5">$${totalGen.toLocaleString()} USD</p>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase text-emerald-700">Comisión (50%)</span>
              <p class="text-sm font-extrabold text-emerald-700 mt-0.5">$${commission.toLocaleString()} USD</p>
            </div>
            <div>
              <span class="text-[10px] font-semibold uppercase text-[#1F5C46]">Margen Salón</span>
              <p class="text-sm font-extrabold text-[#1F5C46] mt-0.5">$${salonShare.toLocaleString()} USD</p>
            </div>
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-black/[0.04] flex items-center justify-between">
          <span class="text-xs text-[#71717A]">Próximo turno: <b>${barber.next} hrs</b></span>
          <button onclick="Admin.toast('Liquidación de $${commission.toLocaleString()} USD registrada para ${barber.name.split(' ')[0]}')" class="h-9 px-3.5 bg-surface-container-high hover:bg-surface-container-highest text-[#1a1c1b] rounded-xl text-xs font-bold transition-colors">
            Liquidar Comisión
          </button>
        </div>
      </div>`;
    }).join('')}
  </div>
</div>`;
    },

    mountBarbers() {},

    /* ========================================================
       4. CATÁLOGO DE SERVICIOS Y TARIFAS
    ======================================================== */
    renderServices() {
      const services = getServices();
      return `
<div class="space-y-6">
  <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h2 class="text-lg font-extrabold text-[#1a1c1b]">Catálogo de Servicios y Precios</h2>
      <p class="text-xs text-[#71717A]">El CEO puede actualizar las tarifas, nombres y duraciones en vivo.</p>
    </div>
    <button onclick="Admin.openNewServiceModal()" class="h-10 px-4 bg-[#1F5C46] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#164333] transition-colors shadow-sm">
      <span class="material-symbols-outlined text-[16px]">add</span>
      <span>Crear Nuevo Servicio</span>
    </button>
  </div>

  <div class="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-[#F9F9F6] border-b border-black/[0.06] text-[#71717A] uppercase tracking-wider font-semibold">
          <tr>
            <th class="p-4">Servicio</th>
            <th class="p-4">Categoría</th>
            <th class="p-4">Duración</th>
            <th class="p-4">Precio Actual</th>
            <th class="p-4">Margen (50%)</th>
            <th class="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-black/[0.04]">
          ${services.map(s => `
          <tr class="hover:bg-[#F9F9F6]/80 transition-colors">
            <td class="p-4 font-bold text-[#1a1c1b] flex items-center gap-2.5">
              <span class="material-symbols-outlined text-primary text-[20px]">${s.icon}</span>
              <span>${s.name}</span>
              ${s.recommended ? '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[9px] font-black uppercase">Popular</span>' : ''}
            </td>
            <td class="p-4 uppercase text-[#71717A] font-medium">${s.category}</td>
            <td class="p-4 font-medium">${s.duration} minutos</td>
            <td class="p-4 font-black text-sm text-[#1F5C46]">$${Number(s.price).toFixed(2)} USD</td>
            <td class="p-4 font-semibold text-emerald-700">$${(s.price * 0.5).toFixed(2)} USD</td>
            <td class="p-4 text-right">
              <button onclick="Admin.editServicePrice('${s.id}')" class="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-[#1a1c1b] font-bold rounded-lg transition-colors text-[11px]">
                Editar Tarifa
              </button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>`;
    },

    mountServices() {},

    /* ========================================================
       5. CRM DE CLIENTES Y AURA CLUB
    ======================================================== */
    renderClients() {
      const clients = window.AURA_ADMIN_DATA.CLIENTS_CRM;
      return `
<div class="space-y-6">
  <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h2 class="text-lg font-extrabold text-[#1a1c1b]">CRM de Clientes & Aura Club</h2>
      <p class="text-xs text-[#71717A]">Historial de visitas, gasto acumulado (LTV) y notas del barbero.</p>
    </div>
    <div class="flex items-center gap-2">
      <input id="clientSearchInput" onkeyup="Admin.filterClientsTable()" type="text" placeholder="Buscar cliente por nombre o email..." class="h-10 px-3.5 rounded-xl border border-black/[0.08] text-xs w-64 bg-[#F9F9F6]">
    </div>
  </div>

  <div class="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs" id="clientsTable">
        <thead class="bg-[#F9F9F6] border-b border-black/[0.06] text-[#71717A] uppercase tracking-wider font-semibold">
          <tr>
            <th class="p-4">Cliente</th>
            <th class="p-4">Nivel Club</th>
            <th class="p-4">Visitas</th>
            <th class="p-4">LTV (Gasto Acumulado)</th>
            <th class="p-4">Barbero Frecuente</th>
            <th class="p-4">Notas & Preferencias</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-black/[0.04]">
          ${clients.map(c => `
          <tr class="hover:bg-[#F9F9F6]/80 transition-colors client-row" data-name="${c.name.toLowerCase()}">
            <td class="p-4">
              <span class="font-bold text-sm text-[#1a1c1b] block">${c.name}</span>
              <span class="text-[11px] text-[#71717A]">${c.email} · ${c.phone}</span>
            </td>
            <td class="p-4">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${c.level === 'Diamante' ? 'bg-indigo-100 text-indigo-900' : (c.level === 'Oro' ? 'bg-amber-100 text-amber-900' : 'bg-gray-100 text-gray-800')}">
                ${c.level}
              </span>
            </td>
            <td class="p-4 font-bold text-sm text-[#1a1c1b]">${c.visits} citas</td>
            <td class="p-4 font-black text-sm text-[#1F5C46]">$${c.spent.toFixed(2)} USD</td>
            <td class="p-4 font-semibold text-[#1a1c1b]">${c.favoriteBarber}</td>
            <td class="p-4 text-[11px] text-[#71717A] max-w-xs truncate">${c.notes}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>`;
    },

    mountClients() {},

    /* ========================================================
       6. FINANZAS & FLUJO DE CAJA (FINANCES)
    ======================================================== */
    renderFinances() {
      const gross = 10450;
      const comm = gross * 0.50; // $5,225
      const fixed = 2100; // Alquiler local Serrano, luz, suministros
      const netProfit = gross - comm - fixed; // $3,125

      return `
<div class="space-y-6">
  <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm flex items-center justify-between">
    <div>
      <h2 class="text-lg font-extrabold text-[#1a1c1b]">Finanzas & Desglose de Caja</h2>
      <p class="text-xs text-[#71717A]">Estado de pérdidas y ganancias del periodo en curso.</p>
    </div>
    <span class="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">Salud Financiera Óptima</span>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
    <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm">
      <span class="text-xs uppercase font-semibold text-[#71717A]">Ingresos Brutos</span>
      <h3 class="text-2xl font-black text-[#1a1c1b] mt-1">$${gross.toLocaleString()} USD</h3>
      <p class="text-[11px] text-[#71717A] mt-1">Facturación total por servicios y productos</p>
    </div>
    <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm">
      <span class="text-xs uppercase font-semibold text-[#71717A]">Comisiones de Personal</span>
      <h3 class="text-2xl font-black text-amber-700 mt-1">-$${comm.toLocaleString()} USD</h3>
      <p class="text-[11px] text-[#71717A] mt-1">50% liquidable a Carlos, Daniel, Sofía y Javier</p>
    </div>
    <div class="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-sm">
      <span class="text-xs uppercase font-semibold text-[#71717A]">Beneficio Neto Dueño</span>
      <h3 class="text-2xl font-black text-[#1F5C46] mt-1">$${netProfit.toLocaleString()} USD</h3>
      <p class="text-[11px] text-emerald-700 font-bold mt-1">Margen neto de ~30% tras costes fijos</p>
    </div>
  </div>

  <!-- Payment Methods Breakdown & Cost Structure -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-sm">
      <h3 class="text-base font-bold text-[#1a1c1b] mb-4">Ventas por Método de Pago</h3>
      <div class="space-y-4">
        <div>
          <div class="flex justify-between text-xs font-bold mb-1">
            <span>Tarjeta de Crédito / Débito (Stripe)</span>
            <span class="text-[#1F5C46]">$6,270 USD (60%)</span>
          </div>
          <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div class="bg-[#1F5C46] h-full rounded-full" style="width: 60%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs font-bold mb-1">
            <span>Apple Pay & Google Pay</span>
            <span class="text-[#1F5C46]">$2,612 USD (25%)</span>
          </div>
          <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div class="bg-[#1F5C46] h-full rounded-full" style="width: 25%"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs font-bold mb-1">
            <span>Efectivo en Local (Datáfono)</span>
            <span class="text-[#1F5C46]">$1,568 USD (15%)</span>
          </div>
          <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div class="bg-[#1F5C46] h-full rounded-full" style="width: 15%"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-sm">
      <h3 class="text-base font-bold text-[#1a1c1b] mb-4">Campañas & Cupones de Marketing</h3>
      <div class="space-y-3">
        <div class="p-3 rounded-xl bg-[#F9F9F6] flex items-center justify-between">
          <div>
            <span class="text-xs font-black text-[#1F5C46] uppercase">AURA20 (Bienvenida)</span>
            <p class="text-[11px] text-[#71717A]">20% OFF en primera reserva vía App</p>
          </div>
          <span class="text-xs font-bold text-[#1a1c1b]">42 canjes ($151.20 desc.)</span>
        </div>
        <div class="p-3 rounded-xl bg-[#F9F9F6] flex items-center justify-between">
          <div>
            <span class="text-xs font-black text-[#1F5C46] uppercase">RITUAL20 (Fin de Semana)</span>
            <p class="text-[11px] text-[#71717A]">20% OFF en Toalla Caliente y Barba</p>
          </div>
          <span class="text-xs font-bold text-[#1a1c1b]">18 canjes ($50.40 desc.)</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
    },

    mountFinances() {},

    /* ========================================================
       7. AJUSTES DE SEDE (SETTINGS)
    ======================================================== */
    renderSettings() {
      const loc = window.AURA_DATA.LOCATION;
      return `
<div class="space-y-6 max-w-3xl">
  <div class="bg-white p-6 rounded-2xl border border-black/[0.06] shadow-sm">
    <h2 class="text-lg font-extrabold text-[#1a1c1b] mb-4">Configuración de la Sede Central</h2>
    <form onsubmit="event.preventDefault(); Admin.toast('Configuración de la sede guardada correctamente');" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-[#71717A] mb-1">Nombre Comercial</label>
          <input type="text" value="${loc.name}" class="w-full h-10 px-3 rounded-xl border border-black/[0.08] text-xs font-bold">
        </div>
        <div>
          <label class="block text-xs font-bold text-[#71717A] mb-1">Dirección Física</label>
          <input type="text" value="${loc.address}" class="w-full h-10 px-3 rounded-xl border border-black/[0.08] text-xs">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-[#71717A] mb-1">Horario Apertura</label>
          <input type="text" value="09:00 - 20:00" class="w-full h-10 px-3 rounded-xl border border-black/[0.08] text-xs font-semibold">
        </div>
        <div>
          <label class="block text-xs font-bold text-[#71717A] mb-1">Capacidad Sillas Activas</label>
          <input type="number" value="4" class="w-full h-10 px-3 rounded-xl border border-black/[0.08] text-xs font-semibold">
        </div>
      </div>

      <button type="submit" class="h-10 px-6 bg-[#1F5C46] text-white rounded-xl text-xs font-bold hover:bg-[#164333] transition-colors">
        Guardar Parámetros
      </button>
    </form>
  </div>
</div>`;
    },

    mountSettings() {},

    /* ========================================================
       ACTIONS & MODALS
    ======================================================== */
    completeBooking(bookingId) {
      const state = getClientState();
      if (!state) return;
      const b = state.bookings.find(x => x.id === bookingId);
      if (b) {
        b.status = 'completada';
        saveClientState(state);
        Admin.toast(`Cita #${b.ref} marcada como completada y facturada.`);
        Admin.setTab(Admin.currentTab);
      }
    },

    cancelBooking(bookingId) {
      if (!confirm('¿Seguro que deseas cancelar esta cita desde el panel?')) return;
      const state = getClientState();
      if (!state) return;
      const b = state.bookings.find(x => x.id === bookingId);
      if (b) {
        b.status = 'cancelada';
        saveClientState(state);
        Admin.toast(`Cita #${b.ref} cancelada.`, 'cancel');
        Admin.setTab(Admin.currentTab);
      }
    },

    editServicePrice(serviceId) {
      const services = getServices();
      const s = services.find(x => x.id === serviceId);
      if (!s) return;
      const newPrice = prompt(`Nuevo precio en USD para "${s.name}":`, s.price);
      if (newPrice !== null && !isNaN(Number(newPrice))) {
        s.price = Number(newPrice);
        saveServices(services);
        Admin.toast(`Tarifa actualizada: ${s.name} ahora cuesta $${s.price} USD`);
        Admin.setTab('services');
      }
    },

    openNewServiceModal() {
      const name = prompt('Nombre del nuevo servicio:');
      if (!name) return;
      const price = prompt('Precio en USD:', '20');
      if (!price) return;
      const duration = prompt('Duración en minutos:', '35');

      const services = getServices();
      const newId = 'srv_' + Date.now();
      services.push({
        id: newId,
        name,
        price: Number(price),
        duration: Number(duration) || 30,
        icon: 'content_cut',
        category: 'cortes',
        desc: 'Servicio de autor añadido por el CEO',
      });
      saveServices(services);
      Admin.toast(`Servicio "${name}" añadido al catálogo.`);
      Admin.setTab('services');
    },

    openNewAppointmentModal() {
      const clientName = prompt('Nombre del Cliente (Walk-in / Llamada):', 'Carlos Santana');
      if (!clientName) return;
      const barberId = prompt('ID de Barbero (carlos / daniel / sofia / javier):', 'carlos');
      const time = prompt('Hora de la cita (ej. 11:30):', '11:30');

      const state = getClientState();
      if (!state) return;

      const newId = 'b_admin_' + Date.now();
      const ref = 'AUR-' + Math.floor(1000 + Math.random() * 9000);
      state.bookings.unshift({
        id: newId,
        ref,
        barberId: barberId || 'carlos',
        serviceIds: ['fade'],
        date: new Date().toISOString().split('T')[0],
        time: time || '11:30',
        subtotal: 18,
        discount: 0,
        fee: 0,
        total: 18,
        payment: 'local',
        status: 'confirmada',
        createdAt: Date.now()
      });
      saveClientState(state);
      Admin.toast(`Nueva cita #${ref} programada en la agenda.`);
      Admin.setTab(Admin.currentTab);
    },

    filterClientsTable() {
      const q = (document.getElementById('clientSearchInput')?.value || '').toLowerCase();
      document.querySelectorAll('.client-row').forEach(row => {
        const name = row.dataset.name;
        if (name.includes(q)) row.style.display = '';
        else row.style.display = 'none';
      });
    },

    filterAppointments(filter) {
      const state = getClientState();
      const bookings = (state && state.bookings) || [];
      const cont = document.getElementById('appointments-container');
      if (!cont) return;

      const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
      cont.innerHTML = filtered.map(b => {
        const barber = window.AURA_DATA.BARBERS.find(x => x.id === b.barberId) || window.AURA_DATA.BARBERS[0];
        const sTitle = window.App ? window.App.booking.title(b.serviceIds) : 'Corte Clásico';
        return `
        <div class="p-4 rounded-xl border border-black/[0.06] bg-[#F9F9F6]/40 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="font-bold text-sm">#${b.ref} · ${b.date} · ${b.time}</span>
            <span class="text-xs text-[#71717A]">(${barber.name})</span>
          </div>
          <span class="font-bold text-sm text-[#1F5C46]">$${b.total} USD</span>
        </div>`;
      }).join('');
    },

    renderHeader() {
      // Header is static in HTML
    },

    setupListeners() {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          Admin.setTab(link.dataset.tab);
        });
      });
    },

    toast(msg, icon = 'check_circle') {
      const host = document.getElementById('admin-toast-host');
      if (!host) return;
      const el = document.createElement('div');
      el.className = 'flex items-center gap-2 bg-[#1a1c1b] text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-bold animate-slide-in';
      el.innerHTML = `<span class="material-symbols-outlined text-[18px] text-emerald-400">${icon}</span><span>${msg}</span>`;
      host.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(6px)';
        el.style.transition = 'all .3s';
        setTimeout(() => el.remove(), 300);
      }, 2500);
    }
  };

  window.Admin = Admin;
})();
