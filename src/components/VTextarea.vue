<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import { useCssSizeValue } from '@/composables/cssSizeValue';
import VField from '@/components/VField.vue';
import type { ComponentProps } from 'vue-component-type-helpers';

type FieldProps = ComponentProps<typeof VField>;
const props = withDefaults(defineProps<{
  modelValue?: string | number
  label?: FieldProps['label']
  disabled?: FieldProps['disabled']
  readonly?: boolean
  minHeight?: string | number
  maxHeight?: string | number
}>(), {
  modelValue: '',
  minHeight: 24,
  maxHeight: 200,
});
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>();
const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string | number) {
    emit('update:modelValue', value)
  },
});
const oninput = ({ target }: Event) => {
  inputValue.value = (target as HTMLInputElement).value;
}
const { value: minHeight } = useCssSizeValue(() => props.minHeight);
const { value: maxHeight } = useCssSizeValue(() => props.maxHeight);
</script>

<template>
  <VField
    :empty="!!inputValue"
    :label="label"
    :disabled="disabled"
    class="VTextarea"
  >
    <textarea
      :value="inputValue"
      :readonly="readonly"
      class="VTextarea__textarea w-full"
      :style="{ maxHeight, minHeight }"
      @input="oninput"
    ></textarea>
    <template #appendInner>
      <slot name="appendInner"></slot>
    </template>
  </VField>
</template>

<style>
.VTextarea__textarea {
  mask-image: linear-gradient(to bottom, transparent, #000 12px);
  height: 200px;
}
.VTextarea__textarea::-webkit-scrollbar {
  background-color: transparent;
  width: 6px;
}
.VTextarea__textarea::-webkit-scrollbar-thumb {
  @apply bg-slate-400;
}
</style>
