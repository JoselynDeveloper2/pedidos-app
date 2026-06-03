<script setup lang="ts">
interface Props {
  active: 'home' | 'orders' | 'wallet' | 'profile';
}

defineProps<Props>();

const tabs = [
  {
    key: 'home' as const,
    label: 'Inicio',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    key: 'orders' as const,
    label: 'Pedidos',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    key: 'wallet' as const,
    label: 'Billetera',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  },
  {
    key: 'profile' as const,
    label: 'Perfil',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
];
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white px-4 pb-safe"
  >
    <div class="mx-auto flex max-w-md justify-around py-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-colors"
        :class="
          active === tab.key
            ? 'bg-primary-soft text-primary'
            : 'text-gray-400'
        "
      >
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            :d="tab.icon"
          />
        </svg>
        <span class="text-xs font-medium">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>
