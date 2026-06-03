---
name: skill-setup-nuxt-pwa
description: Configura un proyecto Nuxt 3 con Tailwind CSS v3 y PWA usando @vite-pwa/nuxt. Use ONLY when the user asks to set up the initial Nuxt project for the delivery app.
---

# skill-setup-nuxt-pwa

Configura el proyecto Nuxt 3 con Tailwind y PWA.

## Instrucciones

1. Asegúrate de que exista un `package.json` con Nuxt 3. Si no existe, inicializa el proyecto.
2. Instala dependencias:
   - `nuxt`
   - `tailwindcss`
   - `@nuxtjs/tailwindcss`
   - `@vite-pwa/nuxt`
   - `pinia`
   - `@pinia/nuxt`

3. Configura `nuxt.config.ts`:
   - Agrega `@vite-pwa/nuxt` en modules
   - Configura PWA con:
     - name: "Delivery App"
     - short_name: "Delivery"
     - theme_color: "#E3000F"
     - background_color: "#ffffff"
     - display: "standalone"
     - icons básicos 192x192 y 512x512 (puedes usar placeholders públicos o generar SVG base64)
   - Agrega `@pinia/nuxt` en modules
   - Configura runtimeConfig con:
     - twilioAccountSid: ''
     - twilioAuthToken: ''
     - twilioVerifySid: ''

4. Crea/actualiza `tailwind.config.ts` con el color primario extendido:
   ```ts
   primary: {
     DEFAULT: '#E3000F',
     soft: '#F8D7D8',
   }
   ```

5. Crea `.env.example` con las 3 variables de Twilio:
   ```
   NUXT_TWILIO_ACCOUNT_SID=
   NUXT_TWILIO_AUTH_TOKEN=
   NUXT_TWILIO_VERIFY_SID=
   ```

## Archivos a crear/modificar
- `nuxt.config.ts`
- `tailwind.config.ts`
- `.env.example`
- `package.json` (agregar dependencias si hace falta)
