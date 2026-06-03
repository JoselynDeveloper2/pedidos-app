<script setup lang="ts">
interface Props {
  modelValue: 'cliente' | 'repartidor';
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'cliente' | 'repartidor'): void;
}>();

const roles = [
  { label: 'Soy Cliente', value: 'cliente' as const },
  { label: 'Soy Repartidor', value: 'repartidor' as const },
];
</script>

<template>
  <div class="flex rounded-xl border border-border bg-white p-1">
    <button
      v-for="role in roles"
      :key="role.value"
      type="button"
      class="flex-1 rounded-lg py-3 text-sm font-semibold transition-colors duration-200"
      :class="
        modelValue === role.value
          ? 'bg-dark text-white'
          : 'text-dark hover:bg-surface'
      "
      @click="emit('update:modelValue', role.value)"
    >
      {{ role.label }}
    </button>
  </div>
</template>
