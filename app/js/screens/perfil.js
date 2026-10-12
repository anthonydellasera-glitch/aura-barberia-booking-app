/* 9. Perfil de Usuario — ported from 9._perfil/code.html */
(function () {
  App.register('perfil', {
    title: 'Mi Perfil',
    render({ data, App }) {
      const user = App.state.user;
      const upcomingCount = App.booking.upcoming().length;
      const favCount = (App.state.favorites || []).length;
      const notifEnabled = App.state.notificationsEnabled !== false;

      return `
<div class="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
  ${App.ui.appHeader('Perfil')}

  <main class="flex flex-col relative w-full px-margin pt-20 pb-32 bg-surface min-h-screen">
    <div class="flex flex-col w-full max-w-md mx-auto gap-space-lg">
      <!-- Profile Header / User Identity Card -->
      <section class="flex flex-col items-center bg-surface-container-lowest rounded-2xl p-6 shadow-sm relative overflow-hidden border border-black/[0.04]">
        <div class="relative mb-3">
          <img id="profileAvatar" alt="${user.name}" class="w-20 h-20 rounded-full object-cover ring-4 ring-primary-container/20 shadow-md bg-surface-container" src="${data.IMG.avatar}">
          <button id="changePhotoBtn" aria-label="Cambiar foto de perfil" class="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md active:scale-90 transition-transform">
            <span class="material-symbols-outlined text-[15px]">photo_camera</span>
          </button>
        </div>
        <h1 class="font-headline-lg text-xl font-extrabold text-on-surface tracking-tight" id="profileName">${user.name}</h1>
        <span class="font-body-sm text-xs text-secondary mt-0.5" id="profileEmail">${user.email}</span>
        <span class="font-body-sm text-xs text-outline mt-0.5" id="profilePhone">${user.phone}</span>

        <!-- Membership Tier Badge -->
        <div class="flex items-center gap-1.5 mt-3.5 bg-primary-fixed/30 text-primary-container px-3 py-1 rounded-full">
          <span class="material-symbols-outlined text-[16px] fill-1 text-primary-container">stars</span>
          <span class="font-label-sm text-xs uppercase tracking-wider font-bold">Miembro VIP · ${user.visits || 12} visitas</span>
        </div>
      </section>

      <!-- Aura Club Points Banner -->
      <section class="bg-gradient-to-r from-primary-container to-[#104834] rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-xs uppercase tracking-wider text-[#b2f0d3] font-semibold">Aura Club · Nivel ${user.level || 'Diamante'}</span>
          <span class="text-2xl font-black tracking-tight mt-0.5">${user.points || 480} pts</span>
          <span class="text-[11px] text-white/80">Canjeables por servicios y productos</span>
        </div>
        <button id="redeemPointsBtn" class="h-9 px-3.5 bg-white text-primary-container font-bold text-xs rounded-xl shadow-sm active:scale-95 transition-transform">
          Canjear
        </button>
      </section>

      <!-- Account Settings Group 1 -->
      <section class="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-black/[0.04]">
        <!-- Personal Info (Opens inline edit modal) -->
        <button id="editProfileBtn" class="flex items-center justify-between p-4 active:bg-surface-container-low transition-colors text-left w-full border-b border-surface-container">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-lg text-sm font-semibold text-on-surface">Información personal</span>
              <span class="text-xs text-secondary">Actualiza tus datos de contacto</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
        </button>

        <!-- Bookings Link -->
        <button data-nav="#/reservas" class="flex items-center justify-between p-4 active:bg-surface-container-low transition-colors text-left w-full border-b border-surface-container">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <span class="font-label-lg text-sm font-semibold text-on-surface">Mis reservas</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-label-sm text-xs text-primary-container bg-primary-fixed/40 px-2 py-0.5 rounded-lg font-bold">${upcomingCount} activa${upcomingCount === 1 ? '' : 's'}</span>
            <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </div>
        </button>

        <!-- Favorites Link -->
        <button data-nav="#/barberos" class="flex items-center justify-between p-4 active:bg-surface-container-low transition-colors text-left w-full border-b border-surface-container">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">favorite</span>
            </div>
            <span class="font-label-lg text-sm font-semibold text-on-surface">Barberos favoritos</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-label-sm text-xs text-secondary">${favCount} favoritos</span>
            <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </div>
        </button>

        <!-- Payment Methods -->
        <button id="paymentMethodsBtn" class="flex items-center justify-between p-4 active:bg-surface-container-low transition-colors text-left w-full">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">credit_card</span>
            </div>
            <span class="font-label-lg text-sm font-semibold text-on-surface">Métodos de pago</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-label-sm text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-lg">Visa •••• 4242</span>
            <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </div>
        </button>
      </section>

      <!-- Account Settings Group 2: Preferences & Support -->
      <section class="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-black/[0.04]">
        <!-- Notifications Switch -->
        <div class="flex items-center justify-between p-4 border-b border-surface-container">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-lg text-sm font-semibold text-on-surface">Notificaciones</span>
              <span class="font-body-sm text-xs text-secondary">Citas y promociones exclusivas</span>
            </div>
          </div>
          <!-- Toggle -->
          <button id="toggleNotifBtn" aria-checked="${notifEnabled}" class="w-12 h-7 ${notifEnabled ? 'bg-primary-container' : 'bg-surface-container-high'} rounded-full p-1 transition-colors relative flex items-center focus:outline-none" role="switch" type="button">
            <span class="w-5 h-5 bg-white rounded-full shadow-sm transform ${notifEnabled ? 'translate-x-5' : 'translate-x-0'} transition-transform block"></span>
          </button>
        </div>

        <!-- Support -->
        <button id="supportBtn" class="flex items-center justify-between p-4 active:bg-surface-container-low transition-colors text-left w-full border-b border-surface-container">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <span class="font-label-lg text-sm font-semibold text-on-surface">Ayuda y soporte técnico</span>
          </div>
          <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
        </button>

        <!-- Terms & Privacy -->
        <button id="termsBtn" class="flex items-center justify-between p-4 active:bg-surface-container-low transition-colors text-left w-full">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[20px]">shield</span>
            </div>
            <span class="font-label-lg text-sm font-semibold text-on-surface">Términos y privacidad</span>
          </div>
          <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
        </button>
      </section>

      <!-- Logout Button -->
      <section class="w-full">
        <button id="logoutBtn" class="w-full h-[52px] rounded-2xl bg-error-container text-on-error-container flex items-center justify-center gap-2 active:scale-[0.98] transition-transform font-bold text-sm shadow-sm hover:opacity-95" type="button">
          <span class="material-symbols-outlined text-[22px]">logout</span>
          <span>Cerrar sesión</span>
        </button>
      </section>

      <!-- Brand Footer Note -->
      <div class="flex flex-col items-center justify-center text-center pt-2 pb-6">
        <div class="flex items-center gap-1.5 text-primary opacity-60">
          <span class="material-symbols-outlined text-[16px]">content_cut</span>
          <span class="text-xs font-semibold tracking-wider uppercase">Maestría Artesanal</span>
        </div>
        <span class="text-[11px] text-outline mt-1 font-medium">Aura Barbería v2.4.0</span>
      </div>
    </div>
  </main>

  <!-- Inline Edit Profile Modal (Hidden by default) -->
  <div id="editModal" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
    <div class="bg-surface rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col gap-4 animate-scale-in">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg text-on-surface">Editar Información</h3>
        <button id="closeModalBtn" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
      <form id="editForm" class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold text-secondary">Nombre completo</label>
          <input id="editNameInput" class="h-11 px-3 rounded-xl bg-white border border-outline-variant text-sm font-medium" value="${user.name}" required>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold text-secondary">Correo electrónico</label>
          <input id="editEmailInput" class="h-11 px-3 rounded-xl bg-white border border-outline-variant text-sm font-medium" value="${user.email}" required>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold text-secondary">Teléfono</label>
          <input id="editPhoneInput" class="h-11 px-3 rounded-xl bg-white border border-outline-variant text-sm font-medium" value="${user.phone}" required>
        </div>
        <button type="submit" class="h-12 mt-2 rounded-xl bg-primary-container text-white font-bold text-sm shadow-sm active:scale-95 transition-transform">
          Guardar Cambios
        </button>
      </form>
    </div>
  </div>

  ${App.ui.bottomNav('perfil')}
</div>`;
    },
    mount(root, { App }) {
      // Photo change
      root.querySelector('#changePhotoBtn').addEventListener('click', () => {
        App.ui.toast('Función de actualización de foto lista', 'photo_camera');
      });

      // Redeem points
      root.querySelector('#redeemPointsBtn').addEventListener('click', () => {
        App.ui.toast('¡Tienes 480 pts canjeables en tu próxima cita!', 'stars');
      });

      // Payment methods
      root.querySelector('#paymentMethodsBtn').addEventListener('click', () => {
        App.ui.toast('Tarjeta Visa •••• 4242 activa', 'credit_card');
      });

      // Notifications switch
      const notifBtn = root.querySelector('#toggleNotifBtn');
      notifBtn.addEventListener('click', () => {
        const isCurrent = notifBtn.getAttribute('aria-checked') === 'true';
        const next = !isCurrent;
        notifBtn.setAttribute('aria-checked', String(next));
        App.state.notificationsEnabled = next;
        App.save();

        const circle = notifBtn.querySelector('span');
        if (next) {
          notifBtn.className = 'w-12 h-7 bg-primary-container rounded-full p-1 transition-colors relative flex items-center focus:outline-none';
          circle.className = 'w-5 h-5 bg-white rounded-full shadow-sm transform translate-x-5 transition-transform block';
          App.ui.toast('Notificaciones activadas', 'notifications_active');
        } else {
          notifBtn.className = 'w-12 h-7 bg-surface-container-high rounded-full p-1 transition-colors relative flex items-center focus:outline-none';
          circle.className = 'w-5 h-5 bg-white rounded-full shadow-sm transform translate-x-0 transition-transform block';
          App.ui.toast('Notificaciones silenciadas', 'notifications_off');
        }
      });

      // Support & Terms
      root.querySelector('#supportBtn').addEventListener('click', () => {
        App.ui.toast('Línea de soporte Aura: +34 912 345 678', 'support_agent');
      });
      root.querySelector('#termsBtn').addEventListener('click', () => {
        App.ui.toast('Políticas de privacidad y términos vigentes', 'shield');
      });

      // Modal Edit Profile
      const editModal = root.querySelector('#editModal');
      const editBtn = root.querySelector('#editProfileBtn');
      const closeBtn = root.querySelector('#closeModalBtn');
      const editForm = root.querySelector('#editForm');

      editBtn.addEventListener('click', () => {
        editModal.classList.remove('hidden');
      });
      closeBtn.addEventListener('click', () => {
        editModal.classList.add('hidden');
      });

      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = root.querySelector('#editNameInput').value.trim() || App.state.user.name;
        const email = root.querySelector('#editEmailInput').value.trim() || App.state.user.email;
        const phone = root.querySelector('#editPhoneInput').value.trim() || App.state.user.phone;
        const firstName = name.split(' ')[0] || name;

        App.state.user.name = name;
        App.state.user.firstName = firstName;
        App.state.user.email = email;
        App.state.user.phone = phone;
        App.save();

        App.ui.toast('Perfil actualizado correctamente');
        editModal.classList.add('hidden');
        App.rerender();
      });

      // Logout
      root.querySelector('#logoutBtn').addEventListener('click', () => {
        if (confirm('¿Deseas cerrar tu sesión?')) {
          App.state.loggedIn = false;
          App.save();
          App.ui.toast('Sesión cerrada');
          App.go('#/splash');
        }
      });
    }
  });
})();
