/* 11. Confirmación de Reserva — ported from 11._confirmaci_n_de_reserva/code.html */
(function () {
  App.register('confirmacion', {
    title: 'Cita Reservada con Éxito',
    render({ params, data, App }) {
      const bookings = App.state.bookings || [];
      const booking = bookings.find(b => b.id === (params && params.id)) || App.booking.upcoming()[0] || bookings[0];

      if (!booking) {
        return `
<div class="bg-surface p-6 min-h-screen flex flex-col items-center justify-center text-center">
  <span class="material-symbols-outlined text-[48px] text-primary mb-2">event_available</span>
  <h1 class="text-xl font-bold mb-4">No hay reservas para mostrar</h1>
  <button data-nav="#/inicio" class="h-12 px-6 rounded-xl bg-primary text-white font-bold">Volver al inicio</button>
</div>`;
      }

      const barber = App.barber(booking.barberId) || data.BARBERS[0];
      const serviceTitle = App.booking.title(booking.serviceIds);
      const duration = App.booking.duration(booking.serviceIds);
      const user = App.state.user;

      const paymentMap = {
        card: 'Tarjeta •••• 4242',
        apple: 'Apple Pay',
        google: 'Google Pay',
        local: 'Pago en Local',
      };
      const paymentText = paymentMap[booking.payment] || 'Tarjeta de Crédito';

      return `
<div class="bg-surface font-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
  <!-- Top App Bar Navigation -->
  <header class="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
    <div class="h-16 px-margin flex items-center justify-between">
      <button data-nav="#/inicio" aria-label="Volver al inicio" class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform" type="button">
        <span class="material-symbols-outlined text-[20px]">arrow_back</span>
      </button>
      <div class="flex flex-col items-center">
        <span class="font-headline-md text-headline-md text-primary tracking-tight leading-none">Confirmación</span>
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">Paso 4 de 4</span>
      </div>
      <div class="w-10 flex items-center justify-center text-primary-container">
        <span class="material-symbols-outlined text-[22px]">verified_user</span>
      </div>
    </div>
  </header>

  <main class="flex flex-col relative w-full px-margin pt-20 pb-16 bg-surface min-h-screen">
    <div class="flex flex-col w-full max-w-md mx-auto gap-space-lg">
      <!-- Success Icon Hero Banner -->
      <div class="flex flex-col items-center text-center pt-space-sm">
        <div class="relative mb-space-md">
          <div class="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center ring-8 ring-primary-fixed/30 animate-scale-in">
            <div class="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
              <span class="material-symbols-outlined text-[36px] fill-1">check</span>
            </div>
          </div>
          <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary-fixed"></div>
          <div class="absolute bottom-2 -left-2 w-2.5 h-2.5 rounded-full bg-primary-container/40"></div>
        </div>

        <h2 class="font-display-md text-display-md text-on-surface mb-space-xs">
          ¡Cita Reservada con Éxito!
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-xs">
          Hemos enviado el comprobante a <span class="font-label-md text-on-surface font-semibold">${user.email}</span> con los detalles y recordatorios.
        </p>

        <!-- Booking Code Pill with Copy Action -->
        <div class="mt-space-md flex items-center gap-space-sm bg-surface-container-high/80 px-space-md py-space-xs rounded-full shadow-sm">
          <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Código</span>
          <span class="font-headline-md text-headline-md text-primary tracking-wide font-bold" id="bookingCode">${booking.ref}</span>
          <button id="copyCodeBtn" aria-label="Copiar código" class="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary-container hover:bg-surface active:scale-90 transition-transform shadow-sm" type="button">
            <span class="material-symbols-outlined text-[16px]">content_copy</span>
          </button>
        </div>
      </div>

      <!-- Boarding Pass / Receipt Ticket Card -->
      <div class="relative bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden border border-black/[0.04]">
        <!-- Ticket Top Section: Barber Profile & Service -->
        <div class="p-space-lg flex flex-col gap-space-md">
          <!-- Barber Row -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-space-md min-w-0">
              <div class="relative shrink-0">
                <img class="w-12 h-12 rounded-full object-cover shadow-sm bg-surface-container" src="${barber.avatar || barber.img}" alt="${barber.name}">
                <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-[10px] font-bold">★</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-headline-md text-headline-md text-on-surface truncate font-bold">${barber.fullName || barber.name}</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant">${barber.shortSpecialty}</span>
              </div>
            </div>
            <span class="shrink-0 bg-primary-fixed/40 text-primary font-label-sm text-label-sm px-space-sm py-0.5 rounded-full uppercase tracking-wider font-semibold">
              Barbero Pro
            </span>
          </div>

          <!-- Service Row -->
          <div class="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between gap-space-sm">
            <div class="flex items-center gap-space-sm min-w-0">
              <div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                <span class="material-symbols-outlined text-[20px]">content_cut</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-label-lg text-label-lg text-on-surface truncate font-semibold">${serviceTitle}</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">schedule</span> ${duration || 45} min de sesión
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ticket Perforation Cutout & Dashed Tear-line -->
        <div class="relative flex items-center my-0">
          <div class="w-5 h-6 bg-surface rounded-r-full shrink-0 shadow-inner"></div>
          <div class="flex-1 h-[2px] bg-repeat-x bg-[length:10px_2px] bg-[radial-gradient(circle,_#d5d5d0_50%,_transparent_55%)] mx-2"></div>
          <div class="w-5 h-6 bg-surface rounded-l-full shrink-0 shadow-inner"></div>
        </div>

        <!-- Ticket Bottom Section: Time, Venue & Payment Details -->
        <div class="p-space-lg flex flex-col gap-space-md bg-surface-container-lowest">
          <div class="grid grid-cols-2 gap-space-md">
            <!-- Date & Time -->
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5">Fecha y Hora</span>
              <span class="font-label-lg text-label-lg text-on-surface font-semibold">${App.fmt.dateMedium(booking.date)}</span>
              <span class="font-body-sm text-body-sm text-primary-container font-bold">${App.fmt.time12(booking.time)}</span>
            </div>
            <!-- Venue & Station -->
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5">Ubicación</span>
              <span class="font-label-lg text-label-lg text-on-surface font-semibold">${data.LOCATION.name}</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">${data.LOCATION.address} · ${data.LOCATION.cabin}</span>
            </div>
          </div>

          <!-- Payment Summary Strip -->
          <div class="flex items-center justify-between pt-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl">
            <div class="flex items-center gap-space-sm">
              <span class="material-symbols-outlined text-[18px] text-primary fill-1">credit_card</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">${paymentText}</span>
            </div>
            <div class="flex items-center gap-space-xs">
              <span class="font-label-sm text-label-sm text-on-surface-variant">Total:</span>
              <span class="font-headline-md text-headline-md text-primary font-bold">${App.fmt.money(booking.total, true)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Utility Actions -->
      <div class="grid grid-cols-2 gap-space-md">
        <button id="addToCalBtn" class="h-12 bg-surface-container-lowest rounded-xl flex items-center justify-center gap-space-xs px-space-sm shadow-sm active:scale-95 transition-transform text-on-surface hover:bg-surface-container-low border border-black/[0.04]" type="button">
          <span class="material-symbols-outlined text-[20px] text-primary-container">event</span>
          <span class="font-label-md text-label-md text-on-surface truncate font-semibold">Añadir Calendario</span>
        </button>
        <button id="getDirectionsBtn" class="h-12 bg-surface-container-lowest rounded-xl flex items-center justify-center gap-space-xs px-space-sm shadow-sm active:scale-95 transition-transform text-on-surface hover:bg-surface-container-low border border-black/[0.04]" type="button">
          <span class="material-symbols-outlined text-[20px] text-primary-container">near_me</span>
          <span class="font-label-md text-label-md text-on-surface truncate font-semibold">Cómo llegar</span>
        </button>
      </div>

      <!-- Navigation Links -->
      <div class="flex flex-col gap-space-sm mt-space-xs">
        <button data-nav="#/reservas" class="w-full h-[52px] rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform hover:bg-[#164333] font-semibold" type="button">
          <span class="material-symbols-outlined text-[20px]">calendar_month</span>
          <span>Ir a Mis Reservas</span>
        </button>
        <button data-nav="#/inicio" class="w-full h-11 flex items-center justify-center font-label-md text-label-md text-on-surface-variant hover:text-on-surface active:opacity-70 transition-opacity" type="button">
          <span>Volver al Inicio</span>
        </button>
      </div>
    </div>
  </main>
</div>`;
    },
    mount(root, { params, data, App }) {
      const bookings = App.state.bookings || [];
      const booking = bookings.find(b => b.id === (params && params.id)) || App.booking.upcoming()[0] || bookings[0];

      // Copy booking code
      const copyBtn = root.querySelector('#copyCodeBtn');
      if (copyBtn && booking) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard?.writeText(booking.ref).catch(() => {});
          App.ui.toast(`Código de reserva ${booking.ref} copiado`, 'content_copy');
        });
      }

      // Add to calendar ICS generator
      const calBtn = root.querySelector('#addToCalBtn');
      if (calBtn && booking) {
        calBtn.addEventListener('click', () => {
          const barber = App.barber(booking.barberId);
          const barberName = barber ? barber.name : 'Barbero Aura';
          const title = App.booking.title(booking.serviceIds);

          const dateCompact = booking.date.replace(/-/g, '');
          const timeCompact = booking.time.replace(/:/g, '') + '00';
          const dtStart = `${dateCompact}T${timeCompact}`;
          // Estimate 45 min duration
          const dtEnd = `${dateCompact}T${String(Number(booking.time.split(':')[0]) + 1).padStart(2, '0')}${booking.time.split(':')[1]}00`;

          const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Aura Barberia//Citas//ES',
            'BEGIN:VEVENT',
            `SUMMARY:${title} - Aura Barbería`,
            `DESCRIPTION:Cita con ${barberName}. Código de reserva: ${booking.ref}`,
            `LOCATION:${data.LOCATION.address}, ${data.LOCATION.name}`,
            `DTSTART:${dtStart}`,
            `DTEND:${dtEnd}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR',
          ].join('\r\n');

          const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `Cita-Aura-${booking.ref}.ics`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          App.ui.toast('Archivo de calendario .ics generado', 'event');
        });
      }

      // Directions
      const dirBtn = root.querySelector('#getDirectionsBtn');
      if (dirBtn) {
        dirBtn.addEventListener('click', () => {
          window.open('https://www.google.com/maps/search/?api=1&query=Calle+Serrano+42+Madrid', '_blank');
        });
      }
    }
  });
})();
