---
name: skill-twilio-server-routes
description: Crea las server routes de Nuxt para envío y verificación OTP con Twilio Verify SDK. Use ONLY when the user asks to create OTP backend routes or after auth store setup.
---

# skill-twilio-server-routes

Crea las server routes de Nuxt para envío y verificación OTP con Twilio Verify.

## Instrucciones

1. Instala el paquete `twilio` si no está instalado.

2. Crea `server/api/otp/send.post.ts`:
   - Recibe body: `{ phone: string, countryCode: string }`
   - Construye `fullPhone = countryCode + phone`
   - Lee credenciales desde `useRuntimeConfig()`:
     - `twilioAccountSid`
     - `twilioAuthToken`
     - `twilioVerifySid`
   - Crea cliente Twilio y llama:
     ```ts
     client.verify.v2.services(sid).verifications.create({ to: fullPhone, channel: 'sms' })
     ```
   - Retorna: `{ success: true, message: 'Código enviado' }`
   - En error: `{ success: false, message: error.message }` con statusCode 400

3. Crea `server/api/otp/verify.post.ts`:
   - Recibe body: `{ phone: string, countryCode: string, code: string }`
   - Construye `fullPhone = countryCode + phone`
   - Crea cliente Twilio con las mismas credenciales de runtimeConfig
   - Llama:
     ```ts
     client.verify.v2.services(sid).verificationChecks.create({ to: fullPhone, code })
     ```
   - Si `check.status === 'approved'`: retorna `{ success: true }`
   - Si no: retorna `{ success: false, message: 'Código incorrecto o expirado' }` con statusCode 400

4. Valida que el body exista antes de procesar (usa `readBody`).

## Archivos a crear
- `server/api/otp/send.post.ts`
- `server/api/otp/verify.post.ts`
