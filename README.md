# Kiwi Login — Delivery App

PWA de delivery construida con Nuxt 3 + Tailwind CSS + Twilio Verify.

## Stack

- **Nuxt 3** + Vue 3 Composition API + TypeScript
- **Tailwind CSS** v3
- **Pinia** para estado global
- **Twilio Verify** para OTP (6 dígitos)
- **@vite-pwa/nuxt** para PWA

## Flujo de Onboarding

1. **Login** (`/login`) — Ingresa número de teléfono + selecciona rol
2. **Verificación OTP** (`/verify`) — Ingresa código de 6 dígitos vía keypad numérico
3. **Perfil** (`/profile`) — Completar nombre, email y activar GPS

## Configuración

Crear archivo `.env` con:

```
NUXT_TWILIO_ACCOUNT_SID=tu_account_sid
NUXT_TWILIO_AUTH_TOKEN=tu_auth_token
NUXT_TWILIO_VERIFY_SID=tu_verify_sid
```

## Scripts

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build
```

## Diseño

Basado en frames de **Stitch by Google**:
- `Login_Universal`
- `Validacion_OTP`
- `Perfil_y_Datos`

## Colores

| Token | Valor |
|-------|-------|
| Primary | `#E3000F` |
| Primary soft | `#F8D7D8` |
| Dark | `#1A1A1A` |
| Surface | `#F5F5F5` |
| Border | `#E0E0E0` |
