# 💈 AURA BARBERÍA — DOCUMENTACIÓN MAESTRA DE DESARROLLO Y OPERACIONES

> **Estado del Proyecto:** ✅ Desplegado en Producción & 100% Funcional  
> **Versión:** 2.0 (Mobile Client App + Executive CEO Dashboard)  
> **Fecha de Actualización:** Octubre 2026  
> **Equipo / Autor:** Impulso Tech & Google Antigravity Engineering  

---

## 📌 1. Ficha Técnica y Enlaces de Producción

| Recurso | URL / Destino | Descripción |
| :--- | :--- | :--- |
| 🚀 **App Móvil de Clientes** | [stitchbarberabookingapp.vercel.app](https://stitchbarberabookingapp.vercel.app) | Aplicación SPA mobile-first para reserva de citas, selección de barberos, promociones y perfil. |
| 📊 **Panel Ejecutivo / CEO** | [stitchbarberabookingapp.vercel.app/admin](https://stitchbarberabookingapp.vercel.app/admin) | Dashboard empresarial para el dueño: facturación en vivo, ocupación de sillas, agenda, comisiones y CRM. |
| 🐙 **Repositorio GitHub** | [github.com/.../aura-barberia-booking-app](https://github.com/anthonydellasera-glitch/aura-barberia-booking-app) | Código fuente versionado en rama `main`. |
| ⚙️ **Hosting / Edge CDN** | Vercel Serverless Edge Global Network | Despliegue continuo y alta disponibilidad. |

---

## 🎨 2. Sistema de Diseño (Design Tokens)

- **Tipografía:** [Manrope (Google Fonts)](https://fonts.google.com/specimen/Manrope) — Pesos 300 a 800.
- **Paleta de Colores de Autor:**
  - `primary-container` / `aura-green`: `#1F5C46` (Verde Bosque Profundo / Marca principal)
  - `aura-dark`: `#004430` (Acento oscuro para status bars y contrastes)
  - `surface` / `aura-bg`: `#F7F7F4` (Calicó cálido / fondo orgánico)
  - `surface-container-lowest`: `#FFFFFF` (Blanco puro para tarjetas y modales)
  - `text-main`: `#1A1C1B` (Carbón de alto contraste)
  - `gold-accent`: `#C5A880` (Acento de lujo para membresías y Aura Club)
- **Iconografía:** Material Symbols Outlined (Google Icons) con soporte para estado activo relleno (`.fill-1`).

---

## 📱 3. Paso a Paso: Aplicación Móvil del Cliente (`app/`)

### 3.1. Arquitectura y Enrutador SPA
- **Motor:** Vanilla JavaScript SPA reactivo (`app/js/core.js`), sin dependencias de compilación ni frameworks pesados (Zero-build).
- **Mapeo de Rutas:**
  - `#/splash` → Bienvenida y presentación de marca.
  - `#/login` y `#/registro` → Autenticación con persistencia en `localStorage`.
  - `#/inicio` → Home con saludo dinámico, accesos rápidos, barberos destacados y banners promocionales.
  - `#/barberos` y `#/barbero/:id` → Directorio con filtros por categoría y ficha técnica del profesional.
  - `#/servicios` → Catálogo interactivo de servicios con selección múltiple y cotizador dinámico.
  - `#/fecha` → Calendario real con cálculo de disponibilidad y turnos por franja horaria.
  - `#/pago` → Resumen de desglose de costos, cupones (`AURA20`) y métodos de pago.
  - `#/confirmacion/:id` → Voucher digital con código de reserva y exportación a calendario `.ics`.
  - `#/reservas` → Pestañas de citas (Próximas, Pasadas, Canceladas) con opciones de cancelación y reprogramación.
  - `#/perfil` y `#/notificaciones` → Fidelización Aura Club, gestión de datos y notificaciones.

### 3.2. Paso a Paso del Flujo de Reserva
1. **Selección de Servicios (`#/servicios`):** El cliente selecciona uno o más servicios. El pie de página calcula automáticamente la duración total acumulada y el subtotal.
2. **Fecha y Hora (`#/fecha`):** Se despliega el calendario mensual interactivo. Se deshabilitan días pasados y domingos de descanso. Los slots horarios se ajustan en tiempo real.
3. **Asignación de Barbero (`#/barberos?pick=1` o automático):** Si el usuario no eligió barbero previamente, el sistema le permite asignarlo o recomendar el mejor valorado.
4. **Checkout y Confirmación (`#/pago` → `#/confirmacion`):** Se aplica el descuento del cupón `AURA20`, se valida la transacción y se almacena en `localStorage`. Se genera la confirmación descargable.

---

## 💼 4. Paso a Paso: Dashboard Ejecutivo para el CEO / Dueño (`app/admin/`)

Diseñado específicamente para que el propietario del negocio supervise y gestione el local comercial en tiempo real:

### 4.1. Resumen Ejecutivo (Overview)
- **KPIs en tiempo real:**
  - Facturación mensual proyectada vs mes anterior (+14.6%).
  - Total de citas procesadas.
  - Ticket promedio por cliente.
  - Tasa de ocupación en directo (sillas activas / disponibles).
- **Gráfico de Evolución Financiera:** Construido con Chart.js interactivo para ver la tendencia de los últimos 6 meses.
- **Plano de Sillas en Sala (Live Floor):** Muestra el estado de cada sillón de barbero:
  - *Silla 01 (Master)*: Ocupada (termina en turno programado).
  - *Silla 02 (Clásica)*: En atención de cliente.
  - *Silla 03 (Estudio)*: Próximo turno asignado.
  - *Silla 04 (Ritual)*: Libre y desinfectada.

### 4.2. Agenda Operativa & Control de Turnos
- Visualización de la cola del día con orden cronológico.
- Filtrado por estado: Todas, Confirmadas, Completadas o Canceladas.
- **Acciones Rápidas:**
  - Botón **"Completar"**: Factura la cita y acumula comisiones.
  - Botón **"Cancelar"**: Libera el turno de la agenda con advertencia de seguridad.
  - Botón **"Nueva Cita Manual"**: Registro exprés para clientes por llamada o walk-ins.

### 4.3. Barberos & Comisiones (50% / 50%)
- Panel individual por cada maestro barbero (Carlos Ruiz, Daniel Vargas, Sofía Morales, Javier Méndez).
- Desglose de ingresos generados en el mes.
- Cálculo automático de la comisión del barbero (50%) y el margen neto para la barbería (50%).
- Conteo de cortes realizados y valoración de reseñas.

### 4.4. Catálogo de Servicios y Tarifas
- Lista editable de precios y duraciones.
- Botón **"Editar Tarifa"**: Permite ajustar el precio en USD en caliente con sincronización inmediata.
- Botón **"Nuevo Servicio"**: Creación de nuevos paquetes de autor sin tocar código.

### 4.5. CRM de Clientes & Aura Club
- Registro de clientes con número de visitas, gasto acumulado (LTV), nivel de membresía (Diamante, Platino, Oro, Plata, Bronce) y notas de preferencia del barbero.
- Barra de búsqueda reactiva por nombre o correo electrónico.

### 4.6. Finanzas y Canales de Cobro
- Desglose por método de pago: Tarjeta de crédito (60%), Apple Pay (25%), Efectivo en local (15%).
- Auditoría de cupones promocionales aplicados (`AURA20`, `RITUAL20`).

### 4.7. Ajustes de Sede
- Configuración de dirección, teléfonos de contacto, horarios de apertura y selección de sucursales.

---

## 🛠️ 5. Desafíos Técnicos Resueltos y Arquitectura Defensiva

### 5.1. Solución al Bug de Pantalla en Blanco en `/admin`
- **Problema:** Vercel activó `cleanUrls: true`, sirviendo `/admin/index.html` bajo la URL limpia `/admin` (sin barra final). Las rutas relativas de scripts se resolvían como `/admin.js` (404 Not Found), evitando que `Admin.init()` arrancara.
- **Solución implementada:**
  1. Rutas absolutas con fallback dinámico:
     ```html
     <script src="/js/data.js" onerror="this.onerror=null; this.src='../js/data.js';"></script>
     <script src="/admin/data-admin.js" onerror="this.onerror=null; this.src='data-admin.js';"></script>
     <script src="/admin/admin.js" onerror="this.onerror=null; this.src='admin.js';"></script>
     ```
  2. Inicializador asíncrono con sondeo seguro para garantizar carga completa del DOM y módulos.

### 5.2. Semillero de Datos Autónomo (Fallback Seed Bookings)
- Para evitar que un usuario nuevo vea un panel vacío al abrir `/admin` sin haber realizado citas previas en la app cliente, se estructuró un sistema de semillas que inyecta automáticamente citas realistas (`AUR-8942`, `AUR-6512`, `AUR-4409`, `AUR-7710`), asegurando que las métricas y tablas cobren vida desde el primer segundo.

---

## 🚀 6. Guía de Despliegue y Control de Versiones

### 6.1. Clonar y Probar Localmente
```bash
git clone https://github.com/anthonydellasera-glitch/aura-barberia-booking-app.git
cd aura-barberia-booking-app

# Servir con Node.js o cualquier servidor estático:
npx serve app
# o
python -m http.server 8080 --directory app
```

### 6.2. Despliegue en Vercel
```bash
# Despliegue directo a producción con Vercel CLI
vercel --prod --yes
```

---

## 📋 7. Checklist para Copiar / Importar a Notion

Para subir esta documentación a tu espacio de trabajo en Notion:

1. **Opción A (Importación Directa):**
   - En Notion, crea una nueva página titulada **"💈 Aura Barbería — Tech & Operations Hub"**.
   - Haz clic en los tres puntos superiores `...` y selecciona **Import** -> **Markdown & CSV**.
   - Selecciona el archivo `NOTION_DOCUMENTACION_AURA_BARBERIA.md`.
2. **Opción B (Copiar y Pegar):**
   - Abre este archivo en tu editor, copia todo el contenido y pégalo directamente en Notion. Notion convertirá automáticamente las tablas, callouts, bloques de código y enlaces en bloques nativos.
