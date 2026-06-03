<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
const otpCode = ref<string[]>(['', '', '', '']);
const loading = ref(false);
const errorMessage = ref('');
const countdown = ref(120);
const canResend = computed(() => countdown.value === 0);

// Redirect if no phone
onMounted(() => {
  if (!auth.phone) {
    navigateTo('/login');
    return;
  }
  startCountdown();
});

let timer: ReturnType<typeof setInterval> | null = null;

function startCountdown() {
  countdown.value = 120;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

async function resendCode() {
  if (!canResend.value) return;
  errorMessage.value = '';

  try {
    await $fetch('/api/otp/send', {
      method: 'POST',
      body: {
        phone: auth.phone,
        countryCode: auth.countryCode,
      },
    });
    startCountdown();
  } catch (error: any) {
    errorMessage.value = error.statusMessage || 'Error al reenviar código';
  }
}

async function verifyCode() {
  errorMessage.value = '';
  const code = otpCode.value.join('');

  if (code.length !== 4) {
    errorMessage.value = 'Ingresa los 4 dígitos del código';
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch('/api/otp/verify', {
      method: 'POST',
      body: {
        phone: auth.phone,
        countryCode: auth.countryCode,
        code,
      },
    });

    if (response.success) {
      auth.setVerified(true);
      navigateTo('/profile');
    }
  } catch (error: any) {
    errorMessage.value = error.statusMessage || 'Código incorrecto';
    otpCode.value = ['', '', '', ''];
  } finally {
    loading.value = false;
  }
}

function onKeypadPress(key: string | 'backspace') {
  const currentIndex = otpCode.value.findIndex((v) => v === '');

  if (key === 'backspace') {
    const filledIndices = otpCode.value
      .map((v, i) => (v !== '' ? i : -1))
      .filter((i) => i !== -1);
    if (filledIndices.length > 0) {
      const lastIndex = filledIndices[filledIndices.length - 1];
      otpCode.value[lastIndex] = '';
    }
    return;
  }

  if (currentIndex !== -1) {
    const newValue = [...otpCode.value];
    newValue[currentIndex] = key;
    otpCode.value = newValue;
  }
}

const isComplete = computed(() => otpCode.value.length === 4 && otpCode.value.every((v) => v !== ''));
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface">
    <div class="flex flex-1 flex-col px-5 pt-6">
      <!-- Header -->
      <div class="mb-6 flex items-center gap-3">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
          @click="navigateTo('/login')"
        >
          <svg
            class="h-5 w-5 text-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 class="text-lg font-bold text-primary">Verificación</h1>
      </div>

      <!-- Title -->
      <h2 class="mb-2 text-2xl font-bold text-dark">Verifica tu número</h2>
      <p class="mb-8 text-sm text-gray-500">
        Ingresa el código enviado a {{ auth.fullPhone }}
      </p>

      <!-- OTP Input -->
      <OtpInput v-model="otpCode" class="mb-4" />

      <!-- Check Icon -->
      <div class="mb-6 flex justify-center">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          :class="isComplete ? 'bg-green-500' : 'bg-gray-300'"
        >
          <svg
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="mb-4 text-center text-sm text-primary">{{ errorMessage }}</p>

      <!-- Countdown / Resend -->
      <p class="mb-6 text-center text-sm text-gray-500">
        <span v-if="!canResend">
          Reenviar código en 00:{{ countdown.toString().padStart(2, '0') }}
        </span>
        <button
          v-else
          type="button"
          class="font-semibold text-primary"
          @click="resendCode"
        >
          Reenviar código
        </button>
      </p>

      <!-- Numeric Keypad -->
      <NumericKeypad class="mb-6" @press="onKeypadPress" />

      <!-- Verify Button -->
      <button
        type="button"
        class="mb-8 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-white transition-opacity active:opacity-90 disabled:opacity-50"
        :disabled="!isComplete || loading"
        @click="verifyCode"
      >
        <span v-if="loading">Verificando...</span>
        <span v-else>Verificar Código</span>
      </button>
    </div>
  </div>
</template>
