<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import VField from '@/components/VField.vue';
import type { ComponentProps } from 'vue-component-type-helpers';

type FieldProps = ComponentProps<typeof VField>;
const props = withDefaults(defineProps<{
  modelValue?: string | number
  label?: FieldProps['label']
  disabled?: FieldProps['disabled']
  readonly?: boolean
}>(), {
  modelValue: '',
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
</script>

<template>
  <VField
    :empty="!!inputValue"
    :label="label"
    :disabled="disabled"
    class="VInputText"
  >
    <input
      :value="inputValue"
      :readonly="readonly"
      type="text"
      class="VInputText__input w-full"
      @input="oninput"
    />
    <template #appendInner>
      <slot name="appendInner"></slot>
    </template>
  </VField>
</template>
