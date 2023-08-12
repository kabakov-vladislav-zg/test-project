<script
  setup
  lang="ts"
>
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: boolean
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
  <input
    :checked="inputValue"
    type="checkbox"
    class="VCheckbox"
    @change="inputValue = !inputValue"
  />
</template>

<style>
.VCheckbox {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
}
</style>
