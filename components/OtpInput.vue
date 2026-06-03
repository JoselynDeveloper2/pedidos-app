<script setup lang="ts">
interface Props {
  modelValue: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'complete'): void;
}>();

const inputRefs = ref<(HTMLInputElement | null)[]>([]);
const localValue = computed(() => {
  const arr = [...props.modelValue];
  while (arr.length < 6) arr.push('');
  return arr;
});

function updateDigit(index: number, value: string) {
  const digit = value.replace(/\D/g, '').slice(-1);
  const newValue = [...localValue.value];
  newValue[index] = digit;
  emit('update:modelValue', newValue);

  if (digit && index < 5) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus();
    });
  }

  if (newValue.every((v) => v !== '') && newValue.length === 6) {
    emit('complete');
  }
}

function onKeyDown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace') {
    event.preventDefault();
    const newValue = [...localValue.value];

    if (newValue[index]) {
      newValue[index] = '';
      emit('update:modelValue', newValue);
    } else if (index > 0) {
      newValue[index - 1] = '';
      emit('update:modelValue', newValue);
      nextTick(() => {
        inputRefs.value[index - 1]?.focus();
      });
    }
  }
}

function onPaste(event: ClipboardEvent) {
  event.preventDefault();
  const pasted = event.clipboardData?.getData('text') || '';
  const digits = pasted.replace(/\D/g, '').split('').slice(0, 6);
  const newValue = [...digits];
  while (newValue.length < 6) newValue.push('');
  emit('update:modelValue', newValue);

  if (digits.length === 6) {
    emit('complete');
  }
}

function focusInput(index: number) {
  inputRefs.value[index]?.focus();
}

watch(
  () => props.modelValue,
  (val) => {
    if (val.length === 6 && val.every((v) => v !== '')) {
      emit('complete');
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="flex justify-center gap-3">
    <div
      v-for="(digit, index) in 6"
      :key="index"
      class="flex h-14 w-11 items-center justify-center rounded-xl border-2 text-center text-2xl font-bold transition-colors"
      :class="
        localValue[index]
          ? 'border-primary text-dark'
          : 'border-border text-gray-300'
      "
      @click="focusInput(index)"
    >
      <input
        :ref="(el) => { inputRefs[index] = el as HTMLInputElement }"
        :value="localValue[index]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="h-full w-full bg-transparent text-center outline-none"
        @input="(e) => updateDigit(index, (e.target as HTMLInputElement).value)"
        @keydown="(e) => onKeyDown(index, e as KeyboardEvent)"
        @paste="onPaste"
      />
    </div>
  </div>
</template>
