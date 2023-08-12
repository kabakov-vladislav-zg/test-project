<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import VCheckbox from '@/components/VCheckbox.vue';

const props = defineProps<{
  modelValue?: boolean
  label?: string | number
}>();
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
</script>

<template>
  <label class="VInputCheckbox">
      <VCheckbox
        v-model="inputValue"
        class="VInputCheckbox__toggler"
      />
      <span class="VInputCheckbox__state"></span>
      <span class="VInputCheckbox__label">
        {{ label }}
      </span>
  </label>
</template>

<style>
.VInputCheckbox {
    display: inline-flex;
    align-items: center;
}
.VInputCheckbox__state {
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
.VInputCheckbox__state::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: transform ease 0.25s;
    @apply bg-white;
}
.VInputCheckbox__toggler:checked + .VInputCheckbox__state {
    @apply bg-blue-600;
}
.VInputCheckbox__toggler:checked + .VInputCheckbox__state::before {
    transform: translateX(20px);
}
</style>
