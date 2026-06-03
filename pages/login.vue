<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
const loading = ref(false);
const errorMessage = ref('');

async function handleContinue() {
  errorMessage.value = '';

  if (!auth.phone || auth.phone.length < 7) {
    errorMessage.value = 'Ingresa un número de teléfono válido';
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch('/api/otp/send', {
      method: 'POST',
      body: {
        phone: auth.phone,
        countryCode: auth.countryCode,
      },
    });

    if (response.success) {
      navigateTo('/verify');
    }
  } catch (error: any) {
    errorMessage.value = error.statusMessage || 'Error al enviar el código';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface">
    <div class="flex flex-1 flex-col px-5 pt-8">
      <!-- Header -->
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold text-primary">Delivery App</h1>
      </div>

      <!-- Hero Image -->
      <div class="mb-8 overflow-hidden rounded-2xl bg-gray-200">
        <img
          src="/images/hero.jpg"
          alt="Repartidor de delivery"
          class="h-48 w-full object-cover"
        />
      </div>

      <!-- Title -->
      <h2 class="mb-2 text-2xl font-bold text-dark">Bienvenido de nuevo</h2>
      <p class="mb-6 text-sm text-gray-500">Ingresa tu número para continuar</p>

      <!-- Role Toggle -->
      <RoleToggle v-model="auth.role" class="mb-4" />

      <!-- Phone Input -->
      <PhoneInput
        v-model="auth.phone"
        v-model:country-code="auth.countryCode"
        class="mb-2"
      />

      <!-- Error Message -->
      <p v-if="errorMessage" class="mb-4 text-sm text-primary">{{ errorMessage }}</p>

      <!-- Continue Button -->
      <button
        type="button"
        class="mb-6 mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-white transition-opacity active:opacity-90 disabled:opacity-50"
        :disabled="loading"
        @click="handleContinue"
      >
        <span v-if="loading">Enviando...</span>
        <span v-else>Continuar</span>
      </button>

      <!-- Divider -->
      <div class="mb-6 flex items-center gap-4">
        <div class="h-px flex-1 bg-border" />
        <span class="text-xs text-gray-400">o continuar con</span>
        <div class="h-px flex-1 bg-border" />
      </div>

      <!-- Social Buttons -->
      <div class="mb-8 flex gap-3">
        <button
          type="button"
          class="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-white text-sm font-medium text-dark transition-colors active:bg-surface"
        >
          <!-- Google SVG -->
          <svg class="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.33v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.11z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          class="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-dark text-sm font-medium text-white transition-colors active:bg-gray-800"
        >
          <!-- Apple SVG -->
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.08-3.11-1.06.05-2.35.71-3.11 1.56-.68.78-1.21 1.99-1.06 3.11 1.14.09 2.32-.64 3.09-1.56"
            />
          </svg>
          Apple
        </button>
      </div>

      <!-- Footer -->
      <p class="mb-8 text-center text-sm text-gray-500">
        ¿No tienes una cuenta?
        <button type="button" class="font-semibold text-primary">Regístrate</button>
      </p>
    </div>
  </div>
</template>
