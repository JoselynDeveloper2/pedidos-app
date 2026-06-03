export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2026-06-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'netlify',
  },
  runtimeConfig: {
    twilioAccountSid: process.env.NUXT_TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.NUXT_TWILIO_AUTH_TOKEN || '',
    twilioVerifySid: process.env.NUXT_TWILIO_VERIFY_SID || '',
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Delivery App',
      short_name: 'Delivery',
      theme_color: '#E3000F',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
});
