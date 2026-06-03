---
name: skill-page-verify-otp
description: Crea la página de verificación OTP con input de 4 dígitos, keypad numérico, countdown y verificación vía Twilio. Replicando el frame Validacion_OTP de Stitch. Use ONLY when the user asks to create the OTP verify page or after login page is ready.
---

# skill-page-verify-otp

Crea la página de verificación OTP replicando el frame `Validacion_OTP` de Stitch.

## Componentes a crear

### `components/OtpInput.vue`
- Props: `modelValue` (string[4])
- UI: 4 cuadros individuales, borde gris (#E0E0E0), activo borde #E3000F
- Comportamiento:
  - Auto-avanza al siguiente campo al ingresar dígito
  - Backspace retrocede al campo anterior
  - No acepta input no numérico
- Emits: `update:modelValue`, `complete` (cuando los 4 están llenos)

### `components/NumericKeypad.vue`
- UI: grid 3x4 con teclas 1-9, 0, backspace (ícono ←)
- Emits: `press(key: string | 'backspace')`
- Teclas con fondo blanco, sombra suave, rounded-2xl

### `pages/verify.vue`
- Redirige a `/login` si no hay `phone` en el store
- Header: flecha atrás (`navigateTo('/login')`) + "Verificación" en primary
- Título "Verifica tu número"
- Subtítulo con `store.fullPhone` dinámico
- `<OtpInput>` ligado a ref `otpCode` (array de 4 strings)
- Ícono check debajo: gris por defecto, verde cuando `otpCode` está completo
- Countdown "Reenviar código en 00:XX":
  - Inicia en 25 segundos al montar (use `setInterval`)
  - Al llegar a 0: muestra "Reenviar código" clickeable que llama `/api/otp/send` y reinicia el countdown
- `<NumericKeypad>` que controla el `otpCode`
- Botón "Verificar Código" (rojo/rosa):
  - Deshabilitado si `otpCode.length < 4`
  - Llama `$fetch('/api/otp/verify')` con `{ phone, countryCode, code: otpCode.join('') }`
  - En éxito: `store.setVerified(true)`, `navigateTo('/profile')`
  - En error: muestra mensaje bajo los inputs, shake animation en los cuadros

## Archivos a crear
- `pages/verify.vue`
- `components/OtpInput.vue`
- `components/NumericKeypad.vue`
