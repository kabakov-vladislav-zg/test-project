<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue';
import { useCssSizeValue } from '@/composables/cssSizeValue';

const props = withDefaults(defineProps<{
  modelValue?: string | number
  label?: string | number
  textarea?: boolean
  height?: string | number
  maxHeight?: string | number
}>(), {
  modelValue: '',
  height: 200,
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
const focus = ref(false);
const { value: height } = useCssSizeValue(() => props.height);
const { value: maxHeight } = useCssSizeValue(() => props.maxHeight);
</script>

<template>
  <label
    class="VInputText relative block w-full py-1 border-b border-slate-200 bg-white"
    :class="[focus ? 'border-slate-800' : 'border-slate-200']"
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
    <textarea
      v-if="textarea"
      :value="inputValue"
      class="VInputText__input VInputText__textarea w-full block"
      :style="{ maxHeight, height }"
      @input="oninput"
    ></textarea>
    <input
      v-else
      type="text"
      :value="inputValue"
      class="VInputText__input w-full block"
      @input="oninput"
    />
  </label>
</template>

<style>
.VInputText__label {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
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
  margin-top: 24px;
  outline: none!important;
}
.VInputText__textarea {
  mask-image: linear-gradient(to bottom, transparent, #000 12px);
  min-height: 24px;
}
.VInputText__textarea::-webkit-scrollbar {
  background-color: transparent;
  width: 6px;
}
.VInputText__textarea::-webkit-scrollbar-thumb {
    background-color: #B5B7C0;
}
</style>
