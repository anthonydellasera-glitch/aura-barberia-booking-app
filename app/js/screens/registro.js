/* 2b. Registro de Usuario — ported from 2b._registro_de_usuario/code.html */
(function () {
  App.register('registro', {
    title: 'Crear Cuenta',
    render({ data, App }) {
      return `
<div class="bg-surface font-sans text-on-surface antialiased min-h-full">
  <div class="flex flex-col relative w-full px-margin pt-safe pb-safe min-h-screen justify-between">
    <div class="flex flex-col gap-6">
      <!-- Encabezado con Navegación -->
      <header class="flex items-center justify-between pt-2">
        <button data-back="#/login" aria-label="Volver" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform" type="button">
          <span class="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <span class="font-label-sm text-label-sm tracking-widest uppercase text-outline">Membresía Exclusiva</span>
        <div class="w-10"></div>
      </header>

      <!-- Título y Presentación -->
      <section class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <img src="${data.IMG.logo}" alt="Aura Barbería" class="h-6 w-auto object-contain">
          <span class="font-label-md text-label-md uppercase tracking-wider text-primary-container font-semibold">Aura Barbería</span>
        </div>
        <h1 class="font-display-md text-display-md text-on-surface tracking-tight">Crea tu cuenta</h1>
        <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Únete a Aura Barbería para agendar tus citas en segundos y acceder a beneficios exclusivos.
        </p>
      </section>

      <!-- Banner de Membresía / Hero Card -->
      <div class="bg-surface-container-low rounded-2xl p-3 flex items-center gap-3 border border-outline-variant/40">
        <img alt="Barbero" class="w-14 h-14 rounded-xl object-cover bg-surface-container flex-shrink-0" src="${data.IMG.registerHero}">
        <div class="flex flex-col">
          <span class="font-label-md text-label-md text-on-surface font-semibold">Experiencia de primer nivel</span>
          <span class="font-body-sm text-body-sm text-outline">Cuidado personal con rituales de autor</span>
        </div>
      </div>

      <!-- Formulario -->
      <form class="flex flex-col gap-4" id="regForm">
        <!-- Nombre Completo -->
        <div class="flex flex-col gap-1.5">
          <label class="font-label-md text-label-md text-on-surface" for="regFullName">Nombre completo</label>
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">person</span>
            <input class="w-full h-[50px] pl-11 pr-4 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline border border-black/[0.06] focus:border-[#1F5C46] focus:ring-1 focus:ring-[#1F5C46] focus:outline-none transition-colors" id="regFullName" placeholder="ej. Mateo Silva" type="text" value="${App.state.user.name}" required>
          </div>
        </div>

        <!-- Correo Electrónico -->
        <div class="flex flex-col gap-1.5">
          <label class="font-label-md text-label-md text-on-surface" for="regEmail">Correo electrónico</label>
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">mail</span>
            <input class="w-full h-[50px] pl-11 pr-4 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline border border-black/[0.06] focus:border-[#1F5C46] focus:ring-1 focus:ring-[#1F5C46] focus:outline-none transition-colors" id="regEmail" placeholder="ej. mateo.silva@email.com" type="email" value="${App.state.user.email}" required>
          </div>
        </div>

        <!-- Número de Teléfono -->
        <div class="flex flex-col gap-1.5">
          <label class="font-label-md text-label-md text-on-surface" for="regPhone">Número de teléfono móvil</label>
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">call</span>
            <input class="w-full h-[50px] pl-11 pr-4 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline border border-black/[0.06] focus:border-[#1F5C46] focus:ring-1 focus:ring-[#1F5C46] focus:outline-none transition-colors" id="regPhone" placeholder="+1 (555) 234-5678" type="tel" value="${App.state.user.phone}" required>
          </div>
        </div>

        <!-- Contraseña -->
        <div class="flex flex-col gap-1.5">
          <label class="font-label-md text-label-md text-on-surface" for="regPassInput">Contraseña</label>
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">lock</span>
            <input class="w-full h-[50px] pl-11 pr-12 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline border border-black/[0.06] focus:border-[#1F5C46] focus:ring-1 focus:ring-[#1F5C46] focus:outline-none transition-colors" id="regPassInput" placeholder="Crea una contraseña segura" type="password" value="secreto123" required>
            <button aria-label="Mostrar contraseña" class="absolute right-3 p-1.5 text-outline hover:text-on-surface transition-colors flex items-center justify-center" id="regTogglePass" type="button">
              <span class="material-symbols-outlined text-[20px]" id="regEyeIcon">visibility</span>
            </button>
          </div>
          <!-- Medidor sutil de seguridad -->
          <div class="flex flex-col gap-1.5 mt-1">
            <div class="grid grid-cols-4 gap-1.5 h-1 w-full">
              <div class="h-full rounded-full bg-emerald-500 transition-colors duration-300" id="bar1"></div>
              <div class="h-full rounded-full bg-emerald-500 transition-colors duration-300" id="bar2"></div>
              <div class="h-full rounded-full bg-emerald-500 transition-colors duration-300" id="bar3"></div>
              <div class="h-full rounded-full bg-surface-container transition-colors duration-300" id="bar4"></div>
            </div>
            <div class="flex justify-between items-center px-0.5">
              <span class="font-body-sm text-body-sm text-primary-container font-medium" id="strengthText">Seguridad: buena</span>
              <span class="font-body-sm text-body-sm text-outline">Mínimo 8 caracteres</span>
            </div>
          </div>
        </div>

        <!-- Términos y Condiciones -->
        <label class="flex items-start gap-2.5 cursor-pointer mt-1">
          <input class="w-4 h-4 mt-0.5 rounded text-primary-container border-outline-variant focus:ring-primary-container focus:ring-offset-0 bg-surface-container-lowest" id="termsCheck" type="checkbox" checked required>
          <span class="font-body-sm text-body-sm text-on-surface-variant leading-snug">
            Acepto los <a href="#" class="text-primary-container underline" onclick="event.preventDefault();App.ui.toast('Términos y condiciones aceptados');">Términos y Condiciones</a> y la Política de Privacidad de Aura Barbería
          </span>
        </label>

        <!-- Botón de Registro -->
        <button class="w-full h-[52px] rounded-2xl bg-primary-container text-on-primary font-label-md text-label-md shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2" type="submit">
          <span>Crear cuenta</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </form>

      <!-- Divisor -->
      <div class="flex items-center gap-3 my-1">
        <div class="flex-1 h-[1px] bg-outline-variant/40"></div>
        <span class="font-body-sm text-body-sm text-outline">O regístrate con</span>
        <div class="flex-1 h-[1px] bg-outline-variant/40"></div>
      </div>

      <!-- Botones Sociales -->
      <div class="grid grid-cols-2 gap-3">
        <button id="regGoogle" class="h-[52px] bg-surface-container-lowest text-on-surface rounded-xl font-label-md text-label-md shadow-sm border border-black/[0.04] active:bg-surface-container-low transition-all flex items-center justify-center gap-2 px-3" type="button">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
          </svg>
          <span>Google</span>
        </button>
        <button id="regApple" class="h-[52px] bg-surface-container-lowest text-on-surface rounded-xl font-label-md text-label-md shadow-sm border border-black/[0.04] active:bg-surface-container-low transition-all flex items-center justify-center gap-2 px-3" type="button">
          <svg class="w-5 h-5 fill-current text-on-surface" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.86.96-2.84-.93.04-2.07.62-2.73 1.39-.58.67-1.09 1.76-.95 2.8 1.04.08 2.08-.57 2.72-1.35z"></path>
          </svg>
          <span>Apple</span>
        </button>
      </div>
    </div>

    <!-- Pie de Página -->
    <div class="flex items-center justify-center gap-1.5 pt-4 pb-4">
      <span class="font-body-md text-body-md text-on-surface-variant">¿Ya tienes una cuenta?</span>
      <button data-nav="#/login" class="font-label-md text-label-md text-primary-container hover:underline transition-all" type="button">
        Iniciar sesión
      </button>
    </div>
  </div>
</div>`;
    },
    mount(root) {
      const form = root.querySelector('#regForm');
      const nameInput = root.querySelector('#regFullName');
      const emailInput = root.querySelector('#regEmail');
      const phoneInput = root.querySelector('#regPhone');
      const passInput = root.querySelector('#regPassInput');
      const toggleBtn = root.querySelector('#regTogglePass');
      const eyeIcon = root.querySelector('#regEyeIcon');
      const terms = root.querySelector('#termsCheck');

      if (toggleBtn && passInput && eyeIcon) {
        toggleBtn.addEventListener('click', () => {
          const isPassword = passInput.getAttribute('type') === 'password';
          passInput.setAttribute('type', isPassword ? 'text' : 'password');
          eyeIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
        });
      }

      function submitReg() {
        if (!terms.checked) {
          App.ui.toast('Debes aceptar los términos y condiciones', 'warning');
          return;
        }
        const name = nameInput.value.trim() || 'Mateo Silva';
        const email = emailInput.value.trim() || 'mateo.silva@email.com';
        const phone = phoneInput.value.trim() || '+1 (555) 234-5678';
        const firstName = name.split(' ')[0] || name;

        App.state.user.name = name;
        App.state.user.firstName = firstName;
        App.state.user.email = email;
        App.state.user.phone = phone;
        App.state.loggedIn = true;
        App.save();

        App.ui.toast(`¡Bienvenido, ${firstName}! Cuenta creada.`);
        App.go('#/inicio');
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitReg();
      });

      root.querySelector('#regGoogle').addEventListener('click', () => submitReg());
      root.querySelector('#regApple').addEventListener('click', () => submitReg());
    }
  });
})();
