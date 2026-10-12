/* Aura Barbería — Executive & CEO Business Data Layer */
(function () {
  const DEFAULT_BARBERS = [
    {
      id: 'carlos', name: 'Carlos Ruiz', fullName: 'Carlos "El Maestro" Ruiz', nickname: 'El Maestro',
      title: 'Barbero Senior', specialty: 'Fade & Diseños artísticos', shortSpecialty: 'Fade & Diseños',
      years: 7, rating: 4.9, reviews: 184, next: '15:30',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAJ2XGptBqOBhLLQkUCrhz53xVTgj2n479oBLMMUdevYAbUBuIyiJJ0FrroxcslI-NL1xRX1qllldvdxqKDZH0MWWt6vfubrCOjZfvKNTW-oNTnnU308-VWzmqMWdAs64_eUj4Ns42yG0Ez-zwdl4eVBETrFiSkI10EgEFR77yTAk-f6_CcDVwIyLeK0ma_gSpMFPxrOw-tsJtgs2gnIKnKt_sSceehjeBE_BcRsc',
      thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwSmVDrndKZUo3Jz8DlPjqyGlWtqGiYrh-EUSytDlSsugb-IoypW3Krjm2Umn8uns3onqiTf7w9QHKeQyzONAVjj8bAr4Jn0qKzd--JBU085rBLZlxVSY8QG3jaFLYa-ItApG_Za_RfvD7YFGfYktdL-UfgXGz2jkOPwnNNs0p1HHf63bCrHwQOUFbFE8LfBSlSgv3AJGiGl0wI8F7mSg8P3fKk0HjhSxoehz37XI',
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSayL-bTiKKG6GEFjD6lOgWsjVPOSxU6Nw-Fp-63f0SjojlqauKRQBhHU-r1ITrMiCj9hvg0JzIXII05nvGR9C2lsJjjKhyzXQc3Xv6F3kk3NGB2X6lLG27gKrCXQVibr6KMcVo-dPtKIjr211JRHzbuurAvBeezV81bZrruY7XSTXUNR7rNMwGo5Yucdl-ZjMO7YUms7jiqZ81q0fuAgEaGAmEpcD2BvTnfce3jiXZ3UeiM_1ZeDa',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCltWxT4Plv3g2f0uIMQwZvbUPdL5kBo4rOyeFWKouV_byQEA8BoxA9ySJFb0kaRrmQhGbUI_KURMbWngOdXTY_O0_6qHcJisZ-K5oTZ4hXUWMUkT_YgOaGLibLbS0uHE7pkYEgN_bkeHOr7PqEfHWmW1aa801EcMogQfImrKJXlTuJt8tkSlzWGJZRVTPktfBlFkHv_mo7_4r6ZHZ1ju_OFqZNnw77GapLxsD47WGrbTq4CwfjAw5n',
    },
    {
      id: 'daniel', name: 'Daniel Vargas', fullName: 'Daniel Vargas', nickname: '',
      title: 'Barbero Clásico', specialty: 'Corte clásico, tijera y arreglo de barba', shortSpecialty: 'Corte clásico & Barba',
      years: 5, rating: 4.8, reviews: 120, next: '16:00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXwjBr5m3xkLTyHm9hKlmp8BBHOZ7RIS5a1Oq_2give7lgNMaacSUHd6gzuzAkpj4L3wBY9JqxU5JF8alVhMJzBopGfR1HC7KriFZ7k0TjAlhC5qGUiJV91doj3VfQRUSrkSeSFIvsYworjeSuMHpqBHfBbSCpFdCPj8mlRIHKtVB3-tbOdQ5L4K96g1ufI0axfKY58Z__DP6_cRWVbc1kVoEwl8zR5EMzrByy904',
      thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3pn1wGKBlzI71N0kHFbGa0DF1QkMDSO5rBXMdrlVZNrdzr5IxtYl93v8HK1vATZojM4Vwiw6LapgQiRlQ3zHnaFD1HOfPCu0ljcIJKo-ra2e3TDWNzV7EKxZJoegrXKeNiabdZo5xJSDjSP1jl7IoKA0tAl-21v-59M4F1nYTMaKcfDpPlXtMPed_3neVUTMKvFtVLNH5KBc_1F617jGUZYVSh7L8uolneWowK4k',
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXwjBr5m3xkLTyHm9hKlmp8BBHOZ7RIS5a1Oq_2give7lgNMaacSUHd6gzuzAkpj4L3wBY9JqxU5JF8alVhMJzBopGfR1HC7KriFZ7k0TjAlhC5qGUiJV91doj3VfQRUSrkSeSFIvsYworjeSuMHpqBHfBbSCpFdCPj8mlRIHKtVB3-tbOdQ5L4K96g1ufI0axfKY58Z__DP6_cRWVbc1kVoEwl8zR5EMzrByy904',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrrBh7yf1zZRL_WYK9gRcBgAoLHyYafHDnC2hBtfSgNLwh63uAVXr5Qy19eAxQWIbNZiAqfiJDtUxcRSOqgy33LszQc9uyUg4pYZRWZuoGxhcMP_eUvy8l_aV5AIVN9JhhPAccVYKcedR837E_CBEh4paWML8fTxGdRLriX73GylkcS0xBeMewCy082KUfw70YKn7DWMkU-GhWelqR20z2YBQX4gzTNqQE-SkUnk4',
    },
    {
      id: 'sofia', name: 'Sofía Morales', fullName: 'Sofía Morales', nickname: '',
      title: 'Estilista Especialista', specialty: 'Texturizado, colorimetría y tijera', shortSpecialty: 'Textura & Color',
      years: 6, rating: 4.9, reviews: 156, next: '17:15',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjqkyedQWY5iDHKltYuS9lHSM4rfvqQEYBFtythr1fxqVa0o9Vuxgh4eorInyaLVCaIqK6zMr2Zuhbad5WcxlcU1K4eUN1gz6C6pUyrMjX5uz5wLYezxo3nA7WYmppARCu52kxv0x73OuyOuJgsBHloYVKn6pX9_l5bzHL9doejj0OWEA8P1ZmPr8L7Ckbyg6HZENeuCTt4YD3ZGNPS_i9Qm10ohHwz6iJFAN3wbI',
      thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjqkyedQWY5iDHKltYuS9lHSM4rfvqQEYBFtythr1fxqVa0o9Vuxgh4eorInyaLVCaIqK6zMr2Zuhbad5WcxlcU1K4eUN1gz6C6pUyrMjX5uz5wLYezxo3nA7WYmppARCu52kxv0x73OuyOuJgsBHloYVKn6pX9_l5bzHL9doejj0OWEA8P1ZmPr8L7Ckbyg6HZENeuCTt4YD3ZGNPS_i9Qm10ohHwz6iJFAN3wbI',
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjqkyedQWY5iDHKltYuS9lHSM4rfvqQEYBFtythr1fxqVa0o9Vuxgh4eorInyaLVCaIqK6zMr2Zuhbad5WcxlcU1K4eUN1gz6C6pUyrMjX5uz5wLYezxo3nA7WYmppARCu52kxv0x73OuyOuJgsBHloYVKn6pX9_l5bzHL9doejj0OWEA8P1ZmPr8L7Ckbyg6HZENeuCTt4YD3ZGNPS_i9Qm10ohHwz6iJFAN3wbI',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjqkyedQWY5iDHKltYuS9lHSM4rfvqQEYBFtythr1fxqVa0o9Vuxgh4eorInyaLVCaIqK6zMr2Zuhbad5WcxlcU1K4eUN1gz6C6pUyrMjX5uz5wLYezxo3nA7WYmppARCu52kxv0x73OuyOuJgsBHloYVKn6pX9_l5bzHL9doejj0OWEA8P1ZmPr8L7Ckbyg6HZENeuCTt4YD3ZGNPS_i9Qm10ohHwz6iJFAN3wbI',
    },
    {
      id: 'javier', name: 'Javier Méndez', fullName: 'Javier Méndez', nickname: '',
      title: 'Maestro Barbero', specialty: 'Afeitado tradicional ritual y toalla caliente', shortSpecialty: 'Afeitado ritual',
      years: 8, rating: 4.9, reviews: 210, next: '18:00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3VcXn14TbxaEfgRAd4_zd1uk59i6EZvCH8oW6ubLa6Tu4oO3QbrZSFGAgGkG7wYRcw84yyB7QOKxqJ7Z0paLnY4y2DsatNxBV2r7Fg_5o3-ktj9ah0LGLRXPPvCk6vdR2DeKFfYgdjMXSfjEhMpcKIGFxuLHdhAj1Mad-mF7F9rwZrWaeU4Z-womEFwCIG_2nrXHLWvT_6bugNmQZlklAFsvQStWpfJnbaxEi-x4',
      thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3VcXn14TbxaEfgRAd4_zd1uk59i6EZvCH8oW6ubLa6Tu4oO3QbrZSFGAgGkG7wYRcw84yyB7QOKxqJ7Z0paLnY4y2DsatNxBV2r7Fg_5o3-ktj9ah0LGLRXPPvCk6vdR2DeKFfYgdjMXSfjEhMpcKIGFxuLHdhAj1Mad-mF7F9rwZrWaeU4Z-womEFwCIG_2nrXHLWvT_6bugNmQZlklAFsvQStWpfJnbaxEi-x4',
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3VcXn14TbxaEfgRAd4_zd1uk59i6EZvCH8oW6ubLa6Tu4oO3QbrZSFGAgGkG7wYRcw84yyB7QOKxqJ7Z0paLnY4y2DsatNxBV2r7Fg_5o3-ktj9ah0LGLRXPPvCk6vdR2DeKFfYgdjMXSfjEhMpcKIGFxuLHdhAj1Mad-mF7F9rwZrWaeU4Z-womEFwCIG_2nrXHLWvT_6bugNmQZlklAFsvQStWpfJnbaxEi-x4',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3VcXn14TbxaEfgRAd4_zd1uk59i6EZvCH8oW6ubLa6Tu4oO3QbrZSFGAgGkG7wYRcw84yyB7QOKxqJ7Z0paLnY4y2DsatNxBV2r7Fg_5o3-ktj9ah0LGLRXPPvCk6vdR2DeKFfYgdjMXSfjEhMpcKIGFxuLHdhAj1Mad-mF7F9rwZrWaeU4Z-womEFwCIG_2nrXHLWvT_6bugNmQZlklAFsvQStWpfJnbaxEi-x4',
    }
  ];

  const DEFAULT_SERVICES = [
    { id: 'fade', name: 'Corte Clásico Fade', price: 18, duration: 40, icon: 'content_cut', category: 'cortes', popular: true, desc: 'Degradado limpio a máquina y tijera con lavado refrescante' },
    { id: 'afeitado', name: 'Afeitado Ritual con Toalla Caliente', price: 14, duration: 30, icon: 'face', category: 'barba', popular: true, desc: 'Vaporizador, espuma tibia, navaja tradicional y bálsamo hidratante' },
    { id: 'perfilado', name: 'Perfilado de Barba Express', price: 10, duration: 20, icon: 'brush', category: 'barba', desc: 'Alineación de contornos y rebaje con trimmer y aceite esencial' },
    { id: 'signature', name: 'Aura Signature Pack', price: 30, duration: 65, icon: 'workspace_premium', category: 'combos', popular: true, recommended: true, desc: 'Corte de autor + ritual completo de barba + mascarilla exfoliante' },
    { id: 'canas', name: 'Camuflaje de Canas / Color', price: 22, duration: 35, icon: 'palette', category: 'tratamientos', desc: 'Tinte sutil para barba o cabello de aspecto 100% natural' }
  ];

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
    DEFAULT_BARBERS,
    DEFAULT_SERVICES,
    CLIENTS_CRM,
    MONTHLY_REVENUE,
    HOURLY_DEMAND,
    CHAIRS,
    COMMISSION_RATE: 0.50
  };
})();
