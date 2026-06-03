<script setup lang="ts">
interface Props {
  modelValue: string;
  countryCode: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:countryCode', value: string): void;
}>();

const countries = [
  { flag: '🇩🇴', code: '+1-809', label: 'Rep. Dominicana' },
  { flag: '🇺🇸', code: '+1', label: 'Estados Unidos' },
  { flag: '🇦🇷', code: '+54', label: 'Argentina' },
  { flag: '🇲🇽', code: '+52', label: 'México' },
  { flag: '🇨🇴', code: '+57', label: 'Colombia' },
];

const selectedCountry = computed(() =>
  countries.find((c) => c.code === props.countryCode) || countries[0]
);

const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function selectCountry(country: typeof countries[0]) {
  emit('update:countryCode', country.code);
  showDropdown.value = false;
}

function onPhoneInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const digits = target.value.replace(/\D/g, '');
  emit('update:modelValue', digits);
}

function handleDocumentClick(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<template>
  <div class="flex items-center rounded-xl border border-border bg-white px-4 py-3">
    <div ref="dropdownRef" class="relative">
      <button
        type="button"
        class="flex items-center gap-1 pr-3 text-sm font-medium text-dark"
        @click="showDropdown = !showDropdown"
      >
        <span class="text-lg">{{ selectedCountry.flag }}</span>
        <span>{{ selectedCountry.code }}</span>
        <svg
          class="h-4 w-4 text-gray-400 transition-transform"
          :class="showDropdown ? 'rotate-180' : ''"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        v-if="showDropdown"
        class="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-border bg-white py-1 shadow-lg"
      >
        <button
          v-for="country in countries"
          :key="country.code"
          type="button"
          class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-surface"
          @click="selectCountry(country)"
        >
          <span class="text-lg">{{ country.flag }}</span>
          <span class="font-medium">{{ country.label }}</span>
          <span class="ml-auto text-gray-400">{{ country.code }}</span>
        </button>
      </div>
    </div>
    <div class="mx-3 h-6 w-px bg-border" />
    <input
      :value="modelValue"
      type="tel"
      inputmode="numeric"
      placeholder="Número de teléfono"
      class="flex-1 bg-transparent text-base text-dark outline-none placeholder:text-gray-400"
      @input="onPhoneInput"
    />
  </div>
</template>
