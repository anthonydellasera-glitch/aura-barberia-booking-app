# Aura Barbería — Suite Empresarial Completa

Suite integral para el ecosistema de **Aura Barbería**, que incluye tanto la **Aplicación Móvil de Clientes** como el **Dashboard Ejecutivo para el Dueño o CEO**.

---

## 1. Dashboard Ejecutivo para el CEO / Dueño (`app/admin/`)

Panel de control de gestión empresarial diseñado para el propietario o director general de la barbería:

- **Resumen Ejecutivo (Overview)**:
  - KPIs principales: Facturación mensual acumulada, Citas totales, Ticket promedio por cliente y Tasa de ocupación de sillas en tiempo real.
  - Gráfico interactivo con **Chart.js** de evolución de ingresos en los últimos 6 meses.
  - **Sillas en Sala (En Vivo)**: Monitor de las 4 sillas (*Silla 01 Master, Silla 02 Clásica, Silla 03 Estudio, Silla 04 Ritual*) con estado de ocupación, cliente actual y hora de finalización.
- **Agenda Operativa & Citas**:
  - Control de turnos y sincronización en tiempo real con las reservas de la app de clientes.
  - Botones de acción rápida: Marcar cita como *Completada* o *Cancelar*.
  - Modal para programar citas manuales inmediatas (clientes *walk-in* o por llamada).
- **Equipo de Barberos & Liquidación de Comisiones**:
  - Rendimiento individual de Carlos Ruiz, Daniel Vargas, Sofía Morales y Javier Méndez.
  - Cálculo automático de ingresos generados y comisiones al 50% con botón de liquidación.
- **Catálogo & Tarifas de Servicios**:
  - Editor interactivo de precios en USD y duración de los servicios.
  - Creación de nuevos servicios de autor.
- **CRM de Clientes & Aura Club**:
  - Búsqueda de clientes, historial de visitas, LTV (gasto acumulado histórico) y notas técnicas de preferencias de corte.
- **Finanzas & Flujo de Caja**:
  - Ingresos brutos vs. comisiones de personal vs. beneficio neto del dueño (~30% margen).
  - Desglose de ingresos por método de pago (Stripe, Apple Pay, Efectivo en local) y auditoría de cupones (`AURA20`, `RITUAL20`).
- **Ajustes de Sede**:
  - Horarios de apertura y capacidad de sillas de la Sede Central en Calle Serrano 42.

---

## 2. Aplicación Móvil de Clientes (`app/`)

- **Splash / Onboarding (`#/splash`)**: Carrusel con indicadores y acceso directo.
- **Iniciar Sesión (`#/login`)**: Validación, revelación de clave y login social.
- **Registro (`#/registro`)**: Medidor de seguridad de contraseña y aceptación de términos.
- **Inicio (`#/inicio`)**: Saludo personalizado, búsqueda, banner con cupón `AURA20`, servicios populares y barberos recomendados.
- **Barberos (`#/barberos`)**: Filtro por categorías, búsqueda y asignación automática.
- **Detalle de Barbero (`#/barbero/:id`)**: Ficha editorial, favoritos, galería de fotos y reserva.
- **Servicios (`#/servicios`)**: Paso 1 de reserva con selección múltiple y suma en vivo.
- **Fecha y Hora (`#/fecha`)**: Paso 2 con calendario mensual interactivo y turnos mañana/tarde.
- **Confirmar y Pagar (`#/pago`)**: Paso 4 con desglose, motor de cupones y métodos de pago.
- **Confirmación (`#/confirmacion/:id`)**: Ticket receipt con folio, copiado y descarga de archivo `.ics`.
- **Mis Reservas (`#/reservas`)**: Pestañas de citas Próximas, Pasadas y Canceladas, con reprogramación y mapas.
- **Perfil (`#/perfil`)**: Membresía Aura Club, edición de datos personales y notificaciones.
- **Notificaciones (`#/notificaciones`)**: Bandeja con filtros y copiado de códigos.

---

## 🚀 Cómo Ejecutar el Sistema

Inicia el servidor local en el puerto **`8080`**:

```powershell
cd "c:\Users\Administrador\Downloads\Negocio Impulso Tech\stitch_barber_a_booking_app\app"
python -m http.server 8080 --bind 127.0.0.1
```

- **Portal del Dueño / CEO**: 👉 [http://localhost:8080/admin/index.html](http://localhost:8080/admin/index.html)
- **App Móvil de Clientes**: 👉 [http://localhost:8080/index.html](http://localhost:8080/index.html)
