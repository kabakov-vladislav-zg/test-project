<script
  setup
  lang="ts"
>
import { computed } from 'vue';
const props = withDefaults(defineProps<{
  modelValue?: boolean
  label?: string | number
}>(), {
  modelValue: false,
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>();
const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
});
const oninput = ({ target }: Event) => {
  inputValue.value = (target as HTMLInputElement).checked;
}
</script>

<template>
  <label class="VRadio">
      <input
          :checked="inputValue"
          type="checkbox"
          class="VRadio__input"
          @input="oninput"
      />
      <span class="VRadio__toggle"></span>
      <span class="VRadio__label">
          {{ label }}
      </span>
  </label>
</template>

<style>
.VRadio {
    display: flex;
    align-items: center;
}
.VRadio__input {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
}
.VRadio__toggle {
    width: 44px;
    height: 24px;
    border-radius: 12px;
    display: flex;
    padding: 2px;
    margin-right: 16px;
    margin-bottom: 2px;
    cursor: pointer;
    transition: background-color ease 0.25s;
    @apply bg-gray-200;
}
.VRadio__toggle::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: transform ease 0.25s;
    @apply bg-white;
}
.VRadio__input:checked + .VRadio__toggle {
    @apply bg-blue-600;
}
.VRadio__input:checked + .VRadio__toggle::before {
    transform: translateX(20px);
}
</style>
