/* Aura Barbería — static catalog data (images hotlinked from the Stitch exports) */
window.AURA_DATA = (function () {
  const IMG = {
    logo: 'https://lh3.googleusercontent.com/aida/AEtjO1WEc9DKT2pw-kiXIyJJ1ZXWdCPeTtUyLKwUCUUdQt3Va3izgzxGMFNyHHu6RbpXARNSdFnkXD_p4JuVIeStEuWNhA0jTocCRTBQDxo05l9RkPGCJOzrQMtmEDMZbOtKwOC2pKVb60JzHIhcGkpyYhPQmGouljARvYKTHtzjh-kcTHG0iS-tJ6MX9tMjwYB-BKuQ1NPYlFyivbALGhK5yjr8y4NUD7zKkxXbLVvvn0oQf4l2DOY87efEnyI',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ua-SUY82xGJEFCt9uPgTDjYLIpXO9w2NfyO33nELTIhTFIAnIasf06cIN9dF9W9Oq54fz1Vbv454-I4j3SR1pMYsC-z9swi65M1-H8W29WjjqbIrCgxprDVa7ZG2f7kZ6Kegf1BGE40gy7JqS_xIrbPBXWkLRGMr4JMCtEj1d4hz8vihE7UJI2qjz-D96EoKZWRb8H66qUWva3e8Brz8GDFy9zoTGPEORglIZOY',
    splash: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw2onlyCkLdLBMYjIBEuGWQmyTv1FNCNvWgMvhBxx-3Tba9dK30wgl-wlb8iIZXJiBvGT4tK6go1v6EtutJtByOv0yGu-y6n2UW51DXeWjOHz0rf_ycZWl33JE8vGL5VVBXCw2fgdJd6p5hre8y4zMhdSkn5TwU7SHBZKSBS7iGJvW6yJV736cbqYIBdpBgfbeb7dXr6RQG8W3CE42MY3btYaoMtVNeDaSuTctNak6XVWLOw7V0iDQ',
    registerHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2tu9wr4F1EdREXsVamrl2c2eNRQiK9ip9pgX2_TFW5-FwbgFZN883SVtQukUwf1KjoZUEuifQybE6VvoAbXXoO0xPmbNueh9VHk6E6598rE02eXEzxPyaD-2Z4V27CoT2OyLCFF6xO-jo5ilIUb8IlCMOaaoeHDqYeuBBb7ZCnsUv95Qsy-GUwbvhrhPDCbs5LYTYbm3eEL3cRYeaQxSq5CQl9L0rHlIpVfUsjpgEiRTXpFs6yC5K',
    promo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhDanFr4QYYZTciiUJn-U258WEt2NxHf4wPZ2MDg1Ak_BEwLMM3eW0Zztt6MBFQVSRm7NM6MV6Ea2BhFovt1eRZaZPyLwexfJdg0WZu1NbgAfz_X0jJmlYGjeE2JY-uFQaeXAm13Wn9yqQ1hfhCA2BWWCDlKNEP8kuN-uONzB6i1-9YgZOFJV2_nQ3jKJ5xRjqgM1Aucg5_Qqqz2dSOQnqdlT1PAdMUp1jz1DXYIk',
  };

  const GALLERY = [
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBObL71SeR-acEf62dSsTZY5KBHpTgKbt9UMJajk21W5p76EJUA_nxMC42ILg1YOLDOafKqJjawld_jiRX1qZbYUwWiDURW7ChJyJ4mMgXoADAu6SOjWi4UsEXIK6mLbEo0DNQL4yHQpp4kPeM_UJdb4vJAy7f5SSXQvM1o1ORQinpDle-hqARL-43VSE0rqLDEdBmBoBQXxYHHuluIKVV0RYEliajI13-wXfA45DzSqv0v-TPPxAeJ', alt: 'Perfilado de barba y toalla caliente' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbGdKdsRYVt783xXJJ8YbondqO4u81AuQ6UW07q6YD7OS7mm72sa7E4KU_NYfVZ8abMcxXUcDC0h-sVE2UBOZkUZv1BT0jl2u8x7tS8VgbWe95h83FI8eVONSjZWqC8AsGy7GHmZsRJ_YaYHdzj2wVE4W2NjuJtoZbjFqKmhETTExebEu0M_Er_XKRsvQSf1dxV2Vr9pFk1wLMEAXsW5yaA6rJyGredHR6qw1kns90N8hOv0vt1PDP', alt: 'Texturizado contemporáneo y degradado' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp5FHvpfwvnbmwGYyBBHKhW7algy3FZPBzl0wmL252jTGZaZ4eW4CrtoY-5K3IudTudgpGfb_fA-QQMJ4Ix5SL6wo9zo1pfAgRsFrmSLNMSP8Dsdo2-U4l7t36phrBGnzhxXVGbMravDVZU5dZ8IPXBHMV52cfFvYDTiTr-kEk91f2oNy4q6Tt94L1amihMp0xISkHexh0SJ8cGqx43RA-Ar9C2CCZ7SuV69E9gqzonhgNZXkjpWQI', alt: 'Afeitado clásico y estilo pompadour' },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcwS_f5X5ELmFSmDky9lzeETfBRjZ_6juBcoozIycoz3mtjObNjQskTPTdcMMGM0Ez7rdqF00MuesBU47r4pT8W4QTrq_x5WQBakLXFu7EsOfwmMv0oT6B-dgIK-HZb2Zg9PueBroIfpL6HkRH6xi_1Wp8Ej9dbzYWvg9OJP-hPFNvC6mMFXgyn4ZYAwp3QUXO9HbV1HjVDCk8ory9uN4ayefPuoRxrlMRWMY89Vr0oSKywmw2XqV_', alt: 'Corte clásico con acabado a navaja' },
  ];

  // Barbers. `img` = list/portrait thumbnail, `hero` = large detail image.
  const BARBERS = [
    {
      id: 'carlos', name: 'Carlos Ruiz', fullName: 'Carlos "El Maestro" Ruiz', nickname: 'El Maestro',
      title: 'Barbero Senior', specialty: 'Fade & Diseños artísticos', shortSpecialty: 'Fade & Diseños',
      years: 7, rating: 4.9, reviews: 184, next: '15:30', badge: 'Top #1', categories: ['fade', 'hombres'],
      about: 'Especialista en degradados milimétricos (fades), navaja libre y perfilado de barba clásica. Apasionado del detalle y la estética masculina.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAJ2XGptBqOBhLLQkUCrhz53xVTgj2n479oBLMMUdevYAbUBuIyiJJ0FrroxcslI-NL1xRX1qllldvdxqKDZH0MWWt6vfubrCOjZfvKNTW-oNTnnU308-VWzmqMWdAs64_eUj4Ns42yG0Ez-zwdl4eVBETrFiSkI10EgEFR77yTAk-f6_CcDVwIyLeK0ma_gSpMFPxrOw-tsJtgs2gnIKnKt_sSceehjeBE_BcRsc',
      thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwSmVDrndKZUo3Jz8DlPjqyGlWtqGiYrh-EUSytDlSsugb-IoypW3Krjm2Umn8uns3onqiTf7w9QHKeQyzONAVjj8bAr4Jn0qKzd--JBU085rBLZlxVSY8QG3jaFLYa-ItApG_Za_RfvD7YFGfYktdL-UfgXGz2jkOPwnNNs0p1HHf63bCrHwQOUFbFE8LfBSlSgv3AJGiGl0wI8F7mSg8P3fKk0HjhSxoehz37XI',
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSayL-bTiKKG6GEFjD6lOgWsjVPOSxU6Nw-Fp-63f0SjojlqauKRQBhHU-r1ITrMiCj9hvg0JzIXII05nvGR9C2lsJjjKhyzXQc3Xv6F3kk3NGB2X6lLG27gKrCXQVibr6KMcVo-dPtKIjr211JRHzbuurAvBeezV81bZrruY7XSTXUNR7rNMwGo5Yucdl-ZjMO7YUms7jiqZ81q0fuAgEaGAmEpcD2BvTnfce3jiXZ3UeiM_1ZeDa',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCltWxT4Plv3g2f0uIMQwZvbUPdL5kBo4rOyeFWKouV_byQEA8BoxA9ySJFb0kaRrmQhGbUI_KURMbWngOdXTY_O0_6qHcJisZ-K5oTZ4hXUWMUkT_YgOaGLibLbS0uHE7pkYEgN_bkeHOr7PqEfHWmW1aa801EcMogQfImrKJXlTuJt8tkSlzWGJZRVTPktfBlFkHv_mo7_4r6ZHZ1ju_OFqZNnw77GapLxsD47WGrbTq4CwfjAw5n',
      services: ['fade', 'afeitado', 'signature'],
    },
    {
      id: 'daniel', name: 'Daniel Vargas', fullName: 'Daniel Vargas', nickname: '',
      title: 'Barbero Clásico', specialty: 'Corte clásico, tijera y arreglo de barba', shortSpecialty: 'Corte clásico & Barba',
      years: 5, rating: 4.8, reviews: 120, next: '16:00', badge: '', categories: ['barba', 'hombres'],
      about: 'Maestro de la tijera y el corte clásico de caballero. Su ritual de barba con toalla caliente es uno de los favoritos de la casa.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXwjBr5m3xkLTyHm9hKlmp8BBHOZ7RIS5a1Oq_2give7lgNMaacSUHd6gzuzAkpj4L3wBY9JqxU5JF8alVhMJzBopGfR1HC7KriFZ7k0TjAlhC5qGUiJV91doj3VfQRUSrkSeSFIvsYworjeSuMHpqBHfBbSCpFdCPj8mlRIHKtVB3-tbOdQ5L4K96g1ufI0axfKY58Z__DP6_cRWVbc1kVoEwl8zR5EMzrByy904',
      thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3pn1wGKBlzI71N0kHFbGa0DF1QkMDSO5rBXMdrlVZNrdzr5IxtYl93v8HK1vATZojM4Vwiw6LapgQiRlQ3zHnaFD1HOfPCu0ljcIJKo-ra2e3TDWNzV7EKxZJoegrXKeNiabdZo5xJSDjSP1jl7IoKA0tAl-21v-59M4F1nYTMaKcfDpPlXtMPed_3neVUTMKvFtVLNH5KBc_1F617jGUZYVSh7L8uolneWowK4k',
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXwjBr5m3xkLTyHm9hKlmp8BBHOZ7RIS5a1Oq_2give7lgNMaacSUHd6gzuzAkpj4L3wBY9JqxU5JF8alVhMJzBopGfR1HC7KriFZ7k0TjAlhC5qGUiJV91doj3VfQRUSrkSeSFIvsYworjeSuMHpqBHfBbSCpFdCPj8mlRIHKtVB3-tbOdQ5L4K96g1ufI0axfKY58Z__DP6_cRWVbc1kVoEwl8zR5EMzrByy904',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrrBh7yf1zZRL_WYK9gRcBgAoLHyYafHDnC2hBtfSgNLwh63uAVXr5Qy19eAxQWIbNZiAqfiJDtUxcRSOqgy33LszQc9uyUg4pYZRWZuoGxhcMP_eUvy8l_aV5AIVN9JhhPAccVYKcedR837E_CBEh4paWML8fTxGdRLriX73GylkcS0xBeMewCy082KUfw70YKn7DWMkU-GhWelqR20z2YBQX4gzTNqQE-SkUnk4',
      services: ['fade', 'afeitado', 'perfilado', 'signature'],
    },
    {
      id: 'sofia', name: 'Sofía Morales', fullName: 'Sofía Morales', nickname: '',
      title: 'Estilista Especialista', specialty: 'Texturizado, colorimetría y tijera', shortSpecialty: 'Textura & Color',
      years: 6, rating: 4.9, reviews: 156, next: '17:15', badge: 'Especialista', categories: ['mujeres', 'hombres'],
      about: 'Experta en texturizados contemporáneos y colorimetría natural. Crea looks a medida con técnica de tijera y acabados de autor.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjqkyedQWY5iDHKltYuS9lHSM4rfvqQEYBFtythr1fxqVa0o9Vuxgh4eorInyaLVCaIqK6zMr2Zuhbad5WcxlcU1K4eUN1gz6C6pUyrMjX5uz5wLYezxo3nA7WYmppARCu52kxv0x73OuyOuJgsBHloYVKn6pX9_l5bzHL9doejj0OWEA8P1ZmPr8L7Ckbyg6HZENeuCTt4YD3ZGNPS_i9Qm10ohHwz6iJFAN3wbI',
      services: ['fade', 'canas', 'signature'],
    },
    {
      id: 'javier', name: 'Javier Méndez', fullName: 'Javier Méndez', nickname: '',
      title: 'Maestro Barbero', specialty: 'Afeitado tradicional ritual y toalla caliente', shortSpecialty: 'Afeitado ritual',
      years: 8, rating: 4.9, reviews: 210, next: '18:00', badge: '', categories: ['barba', 'hombres'],
      about: 'Guardián del afeitado tradicional a navaja. Cada servicio es un ritual con vapor, toalla caliente y bálsamos artesanales.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3VcXn14TbxaEfgRAd4_zd1uk59i6EZvCH8oW6ubLa6Tu4oO3QbrZSFGAgGkG7wYRcw84yyB7QOKxqJ7Z0paLnY4y2DsatNxBV2r7Fg_5o3-ktj9ah0LGLRXPPvCk6vdR2DeKFfYgdjMXSfjEhMpcKIGFxuLHdhAj1Mad-mF7F9rwZrWaeU4Z-womEFwCIG_2nrXHLWvT_6bugNmQZlklAFsvQStWpfJnbaxEi-x4',
      services: ['afeitado', 'perfilado', 'signature'],
    },
  ];
  // Fallbacks so every barber has thumb/hero/avatar
  BARBERS.forEach(b => { b.thumb = b.thumb || b.img; b.hero = b.hero || b.img; b.avatar = b.avatar || b.img; });

  // Services (source: 6. Reserva — Seleccionar Servicio)
  const SERVICES = [
    { id: 'fade', name: 'Corte Clásico Fade', price: 18, duration: 40, icon: 'content_cut', category: 'cortes', popular: true,
      desc: 'Degradado limpio a máquina y tijera con lavado refrescante', short: 'Degradado y lavado express' },
    { id: 'afeitado', name: 'Afeitado Ritual con Toalla Caliente', shortName: 'Barba & Toalla Caliente', price: 14, duration: 30, icon: 'face', category: 'barba', popular: true,
      desc: 'Vaporizador, espuma tibia, navaja tradicional y bálsamo hidratante', short: 'Navaja libre y aceites' },
    { id: 'perfilado', name: 'Perfilado de Barba Express', price: 10, duration: 20, icon: 'brush', category: 'barba',
      desc: 'Alineación de contornos y rebaje con trimmer y aceite esencial', short: 'Contornos y trimmer' },
    { id: 'signature', name: 'Aura Signature Pack', shortName: 'Combo Aura', price: 30, duration: 65, icon: 'workspace_premium', category: 'combos', popular: true, recommended: true,
      desc: 'Corte de autor + ritual completo de barba + mascarilla exfoliante', short: 'Corte + Barba + Lavado' },
    { id: 'canas', name: 'Camuflaje de Canas / Color', price: 22, duration: 35, icon: 'palette', category: 'tratamientos',
      desc: 'Tinte sutil para barba o cabello de aspecto 100% natural', short: 'Color natural' },
  ];

  const SERVICE_CATEGORIES = [
    { id: 'todos', label: 'Todos' },
    { id: 'cortes', label: 'Cortes' },
    { id: 'barba', label: 'Barba & Afeitado' },
    { id: 'tratamientos', label: 'Tratamientos' },
    { id: 'combos', label: 'Combos' },
  ];

  const BARBER_CATEGORIES = [
    { id: 'todos', label: 'Todos' },
    { id: 'fade', label: 'Fade Masters' },
    { id: 'barba', label: 'Barba & Afeitado' },
    { id: 'hombres', label: 'Hombres' },
    { id: 'mujeres', label: 'Mujeres' },
  ];

  const TIME_SLOTS = {
    morning: ['09:00', '09:30', '10:00', '10:30', '11:30'],
    afternoon: ['15:00', '15:45', '16:30', '17:15', '18:00'],
  };

  const LOCATION = { name: 'Sede Central', address: 'Calle Serrano 42', cabin: 'Cabina 3' };

  const PROMO_CODES = { AURA20: { pct: 20, label: 'Descuento Bienvenida (20%)' }, RITUAL20: { pct: 20, label: 'Ritual fin de semana (20%)' } };
  const SERVICE_FEE = 0.6;

  const NOTIFICATIONS = [
    { id: 'n1', type: 'citas', group: 'Hoy', icon: 'event_upcoming', tag: 'Cita Próxima', time: 'Hace 2 horas', unread: true,
      title: 'Cita confirmada para mañana', body: '¡Tu cita es mañana a las 10:30 AM con <b>Carlos Ruiz</b>! Recuerda llegar 5 minutos antes para una toalla de cortesía.',
      action: { label: 'Ver detalle de reserva', nav: '#/reservas' } },
    { id: 'n2', type: 'promociones', group: 'Esta semana', icon: 'spa', tag: 'Exclusivo Aura', time: 'Hace 1 día', unread: true,
      title: 'Fin de semana de descanso y perfilado', body: '20% OFF en tratamiento de toalla caliente y perfilado de barba este fin de semana. Aplica reservando en la app.',
      code: 'RITUAL20' },
    { id: 'n3', type: 'club', group: 'Esta semana', icon: 'stars', tag: 'Aura Club', time: 'Hace 3 días', unread: false,
      title: '¡Recompensa acumulada!', body: '¡Ganaste 40 puntos Aura Club por tu última visita! Estás a sólo 60 puntos de un corte de cabello gratuito.',
      progress: { value: 240, max: 300 } },
    { id: 'n4', type: 'club', group: 'Esta semana', icon: 'receipt_long', tag: 'Recibo Digital', time: 'Hace 4 días', unread: false,
      title: 'Comprobante de pago generado', body: 'Tu pago de $15.00 USD ha sido procesado exitosamente mediante tarjeta terminada en 4291. Folio: AUR-89241',
      download: true },
  ];

  const USER = { name: 'Mateo Silva', firstName: 'Mateo', email: 'mateo.silva@email.com', phone: '+1 (555) 234-5678', visits: 12, points: 480, level: 'Diamante' };

  return { IMG, GALLERY, BARBERS, SERVICES, SERVICE_CATEGORIES, BARBER_CATEGORIES, TIME_SLOTS, LOCATION, PROMO_CODES, SERVICE_FEE, NOTIFICATIONS, USER };
})();
