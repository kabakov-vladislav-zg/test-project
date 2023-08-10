<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: string | number
  label?: string | number
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
const focus = ref(false);
</script>

<template>
  <label
    class="VInputText block w-full py-1 border-b border-slate-200 bg-white"
    @focusin="focus = true"
    @focusout="focus = false"
  >
    <span
      v-if="label"
      class="VInputText__label"
      :class="{ 'VInputText__label_focus' : focus || inputValue }"
    >
      {{ label }}
    </span>
    <input
      type="text"
      :value="inputValue"
      class="VInputText__input w-full block"
      @input="oninput"
    />
  </label>
</template>

<style>
.VInputText__label {
    position: relative;
    display: block;
    pointer-events: none;
    transition: transform .25s;
    transform-origin: left center;
    transform: translateY(100%);
}
.VInputText__label.VInputText__label_focus {
  transform: scale(0.75);
}
.VInputText__input {
  outline: none!important;
}
</style>
