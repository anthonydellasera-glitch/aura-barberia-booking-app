/* Aura Barbería — Executive & CEO Business Data Layer */
(function () {
  const CLIENTS_CRM = [
    { id: 'c1', name: 'Mateo Silva', email: 'mateo.silva@email.com', phone: '+1 (555) 234-5678', level: 'Diamante', visits: 12, spent: 285.00, lastVisit: '2026-10-08', favoriteBarber: 'Carlos Ruiz', notes: 'Prefiere toalla extra caliente y degradado afeitado cero.' },
    { id: 'c2', name: 'Alejandro Morales', email: 'amorales@corp.com', phone: '+34 612 884 921', level: 'Oro', visits: 8, spent: 194.00, lastVisit: '2026-10-04', favoriteBarber: 'Daniel Vargas', notes: 'Perfilado de barba simétrica y cafe cortado sin azúcar.' },
    { id: 'c3', name: 'Rodrigo Benítez', email: 'r.benitez@tech.io', phone: '+34 689 123 456', level: 'Platino', visits: 15, spent: 410.00, lastVisit: '2026-10-10', favoriteBarber: 'Carlos Ruiz', notes: 'Siempre reserva Combo Signature. Puntual.' },
    { id: 'c4', name: 'Fernando Castro', email: 'fcastro@studio.design', phone: '+34 654 321 987', level: 'Plata', visits: 5, spent: 110.00, lastVisit: '2026-09-28', favoriteBarber: 'Sofía Morales', notes: 'Texturizado a tijera, no máquina en la coronilla.' },
    { id: 'c5', name: 'Ignacio Vega', email: 'ivega@abogados.es', phone: '+34 622 778 899', level: 'Oro', visits: 9, spent: 220.00, lastVisit: '2026-10-02', favoriteBarber: 'Javier Méndez', notes: 'Afeitado ritual tradicional con navaja japonesa.' },
    { id: 'c6', name: 'Lucas Domínguez', email: 'ldominguez@gmail.com', phone: '+34 633 445 566', level: 'Bronce', visits: 2, spent: 36.00, lastVisit: '2026-09-15', favoriteBarber: 'Daniel Vargas', notes: 'Cliente nuevo, recomendado por Mateo Silva.' },
    { id: 'c7', name: 'Gabriel Mendoza', email: 'gmendoza@ventures.com', phone: '+34 601 223 344', level: 'Diamante', visits: 18, spent: 520.00, lastVisit: '2026-10-11', favoriteBarber: 'Carlos Ruiz', notes: 'Membresía VIP anual. Solicita siempre Silla 01.' }
  ];

  const MONTHLY_REVENUE = [
    { month: 'Mayo', revenue: 6420, appointments: 285 },
    { month: 'Junio', revenue: 7150, appointments: 310 },
    { month: 'Julio', revenue: 8340, appointments: 365 },
    { month: 'Agosto', revenue: 7890, appointments: 340 },
    { month: 'Septiembre', revenue: 9120, appointments: 402 },
    { month: 'Octubre (Act.)', revenue: 10450, appointments: 458 }
  ];

  const HOURLY_DEMAND = [
    { hour: '09:00', load: 45 },
    { hour: '10:00', load: 85 },
    { hour: '11:00', load: 95 },
    { hour: '12:00', load: 70 },
    { hour: '15:00', load: 80 },
    { hour: '16:00', load: 100 },
    { hour: '17:00', load: 95 },
    { hour: '18:00', load: 90 },
    { hour: '19:00', load: 60 }
  ];

  const CHAIRS = [
    { id: 'chair-1', name: 'Silla 01 (Master)', barberId: 'carlos', status: 'en_servicio', clientName: 'Gabriel Mendoza', service: 'Corte Clásico Fade', endsAt: '11:15' },
    { id: 'chair-2', name: 'Silla 02 (Clásica)', barberId: 'daniel', status: 'en_servicio', clientName: 'Alejandro Morales', service: 'Barba & Toalla Caliente', endsAt: '11:00' },
    { id: 'chair-3', name: 'Silla 03 (Estudio)', barberId: 'sofia', status: 'proximo', clientName: 'Fernando Castro', service: 'Textura & Color', endsAt: '11:30' },
    { id: 'chair-4', name: 'Silla 04 (Ritual)', barberId: 'javier', status: 'disponible', clientName: null, service: null, endsAt: null }
  ];

  window.AURA_ADMIN_DATA = {
    CLIENTS_CRM,
    MONTHLY_REVENUE,
    HOURLY_DEMAND,
    CHAIRS,
    COMMISSION_RATE: 0.50 // 50% para el barbero, 50% para la barbería
  };
})();
