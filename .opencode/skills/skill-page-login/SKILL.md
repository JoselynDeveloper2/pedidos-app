---
name: skill-page-login
description: Crea la página de login con selector de rol, input de teléfono con país, y botón de continuar que envía OTP. Replicando el frame Login_Universal de Stitch. Use ONLY when the user asks to create the login page or after OTP routes are ready.
---

# skill-page-login

Crea la página de login replicando el frame `Login_Universal` de Stitch.

## Componentes a crear

### `components/RoleToggle.vue`
- Props: `modelValue: 'cliente' | 'repartidor'`
- UI: dos tabs pill con borde gris, activo fondo negro texto blanco
- Emits: `update:modelValue`

### `components/PhoneInput.vue`
- Props: `modelValue` (phone string), `countryCode` (string)
- UI: selector de país (bandera emoji + código) + input numérico
- Emits: `update:modelValue`, `update:countryCode`
- Países mínimos:
  - DO 🇩🇴 +1-809
  - US 🇺🇸 +1
  - AR 🇦🇷 +54
  - MX 🇲🇽 +52
  - CO 🇨🇴 +57

### `pages/login.vue`
- Header: logo "Delivery App" color primary (#E3000F)
- Hero image: placeholder con bg-gray-200 o imagen de repartidor (URL estático de unsplash)
- Título "Bienvenido de nuevo" + subtítulo
- `<RoleToggle>` ligado al store auth
- `<PhoneInput>` ligado al store auth
- Botón rojo "Continuar":
  - Valida que phone no esté vacío
  - Llama `$fetch('/api/otp/send', { method: 'POST', body: { phone, countryCode } })`
  - En éxito: `navigateTo('/verify')`
  - Muestra loading state en el botón
- Separador "o continuar con"
- Botón Google (SVG inline, fondo #1A1A1A)
- Botón Apple (SVG inline, fondo negro)
- Link "¿No tienes una cuenta? Regístrate" (Regístrate en #E3000F)

## Archivos a crear
- `pages/login.vue`
- `components/RoleToggle.vue`
- `components/PhoneInput.vue`
