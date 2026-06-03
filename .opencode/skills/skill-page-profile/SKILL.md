---
name: skill-page-profile
description: Crea la página de perfil con inputs de nombre/email, activación de GPS, selector de rol y navegación inferior. Replicando el frame Perfil_y_Datos de Stitch. Use ONLY when the user asks to create the profile page or after OTP verification is ready.
---

# skill-page-profile

Crea la página de perfil replicando el frame `Perfil_y_Datos` de Stitch.

## Componentes a crear

### `components/BottomNav.vue`
- Props: `active: 'home' | 'orders' | 'wallet' | 'profile'`
- UI: 4 tabs con íconos SVG inline (Home, Orders, Wallet, Profile)
- Tab activo: ícono y texto en #E3000F, fondo pill suave (#F8D7D8)
- Fijo al fondo de la pantalla

### `pages/profile.vue`
- Redirige a `/login` si `!store.isAuthenticated`
- Header: flecha atrás + logo "Delivery App"
- Título "Completa tu perfil" + subtítulo descriptivo
- `<RoleToggle>` (reusar de skill-page-login) ligado a `store.role`
- Input "Nombre Completo" placeholder "Ej. Juan Pérez"
- Input "Correo Electrónico" placeholder "juan.perez@ejemplo.com"
- Card ubicación (fondo #F8D7D8, borde suave):
  - Ícono pin en #E3000F
  - Título "Permitir ubicación"
  - Texto descriptivo
  - Botón rojo "Activar GPS":
    - Llama `navigator.geolocation.getCurrentPosition()`
    - En éxito: guarda coords en `store.user.location`, cambia botón a "GPS Activado ✓"
    - En error: muestra "No se pudo obtener ubicación"
- Botón negro "Guardar Perfil":
  - Valida que nombre y email no estén vacíos
  - `store.setUser({ name, email })`
  - `navigateTo('/home')`
- `<BottomNav active="profile" />`

## Archivos a crear
- `pages/profile.vue`
- `components/BottomNav.vue`
