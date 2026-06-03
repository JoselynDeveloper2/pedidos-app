<script setup lang="ts">
const emit = defineEmits<{
  (e: 'press', key: string | 'backspace'): void;
}>();

const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'backspace'],
];

function onPress(key: string | 'backspace') {
  emit('press', key);
}
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <template v-for="(row, rowIndex) in keys" :key="rowIndex">
      <button
        v-for="(key, colIndex) in row"
        :key="`${rowIndex}-${colIndex}`"
        type="button"
        class="flex h-14 items-center justify-center rounded-2xl bg-white text-2xl font-medium text-dark shadow-sm transition-transform active:scale-95 active:bg-surface"
        :class="key === '' ? 'invisible' : ''"
        @click="key !== '' ? onPress(key) : null"
      >
        <span v-if="key === 'backspace'">
          <svg
            class="h-6 w-6 text-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H20a2 2 0 002-2V7a2 2 0 00-2-2h-9.172a2 2 0 00-1.414.586L3 12z"
            />
          </svg>
        </span>
        <span v-else>{{ key }}</span>
      </button>
    </template>
  </div>
</template>
