<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

const name = ref(auth.user.name || '');
const email = ref(auth.user.email || '');
const gpsActive = ref(false);
const gpsError = ref('');
const loading = ref(false);
const saving = ref(false);

// Redirect if not authenticated
onMounted(() => {
  if (!auth.isAuthenticated) {
    navigateTo('/login');
  }
});

function activateGPS() {
  gpsError.value = '';
  loading.value = true;

  if (!navigator.geolocation) {
    gpsError.value = 'Geolocalización no soportada en este dispositivo';
    loading.value = false;
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      auth.setUser({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
      gpsActive.value = true;
      loading.value = false;
    },
    (error) => {
      gpsError.value = 'No se pudo obtener ubicación. Verifica los permisos.';
      loading.value = false;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function saveProfile() {
  if (!name.value.trim() || !email.value.trim()) {
    return;
  }

  saving.value = true;
  auth.setUser({
    name: name.value.trim(),
    email: email.value.trim(),
  });

  setTimeout(() => {
    saving.value = false;
    navigateTo('/home');
  }, 500);
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface pb-24">
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
        <h1 class="text-lg font-bold text-primary">Delivery App</h1>
      </div>

      <!-- Title -->
      <h2 class="mb-2 text-2xl font-bold text-dark">Completa tu perfil</h2>
      <p class="mb-6 text-sm text-gray-500">
        Completa tus datos para comenzar a usar la app
      </p>

      <!-- Role Toggle -->
      <label class="mb-2 text-sm font-semibold text-dark">Tipo de cuenta</label>
      <RoleToggle v-model="auth.role" class="mb-6" />

      <!-- Name Input -->
      <label class="mb-2 text-sm font-semibold text-dark">Nombre Completo</label>
      <div class="mb-4 rounded-xl border border-border bg-white px-4 py-3">
        <input
          v-model="name"
          type="text"
          placeholder="Ej. Juan Pérez"
          class="w-full bg-transparent text-base text-dark outline-none placeholder:text-gray-400"
        />
      </div>

      <!-- Email Input -->
      <label class="mb-2 text-sm font-semibold text-dark">Correo Electrónico</label>
      <div class="mb-6 rounded-xl border border-border bg-white px-4 py-3">
        <input
          v-model="email"
          type="email"
          placeholder="juan.perez@ejemplo.com"
          class="w-full bg-transparent text-base text-dark outline-none placeholder:text-gray-400"
        />
      </div>

      <!-- Location Card -->
      <div class="mb-6 rounded-2xl border border-primary-soft bg-primary-soft p-5">
        <div class="mb-3 flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <svg
              class="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-dark">Permitir ubicación</h3>
            <p class="text-xs text-gray-500">Necesitamos tu ubicación para entregas</p>
          </div>
        </div>

        <button
          type="button"
          class="flex h-10 w-full items-center justify-center rounded-xl text-sm font-semibold transition-colors"
          :class="
            gpsActive
              ? 'bg-green-500 text-white'
              : 'bg-primary text-white active:opacity-90'
          "
          :disabled="loading"
          @click="activateGPS"
        >
          <span v-if="loading">Obteniendo ubicación...</span>
          <span v-else-if="gpsActive">GPS Activado ✓</span>
          <span v-else>Activar GPS</span>
        </button>
        <p v-if="gpsError" class="mt-2 text-xs text-primary">{{ gpsError }}</p>
      </div>

      <!-- Save Button -->
      <button
        type="button"
        class="mb-8 flex h-12 w-full items-center justify-center rounded-xl bg-dark text-base font-semibold text-white transition-opacity active:opacity-90 disabled:opacity-50"
        :disabled="!name.trim() || !email.trim() || saving"
        @click="saveProfile"
      >
        <span v-if="saving">Guardando...</span>
        <span v-else>Guardar Perfil</span>
      </button>
    </div>

    <!-- Bottom Navigation -->
    <BottomNav active="profile" />
  </div>
</template>
