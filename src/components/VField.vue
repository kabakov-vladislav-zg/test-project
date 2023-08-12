<script
  setup
  lang="ts"
>
import { useSlots, ref } from 'vue';
import { useIsSlotNotEmpty } from '@/composables/isSlotNotEmpty';
import VBtn from '@/components/VBtn.vue';

const props = defineProps<{
  empty: boolean
  label?: string | number
  disabled?: boolean
}>();
const focus = ref(false);
const { appendInner } = useSlots();
const { isNotEmpty: isAppendInnerNotEmpty } = useIsSlotNotEmpty(() => appendInner);
</script>

<template>
  <label
    class="VField block relative w-full py-1 border-b border-slate-200 bg-white"
    :class="[
      focus ? 'border-slate-800' : 'border-slate-200',
      disabled ? 'VField_disabled' : '',
    ]"
    @focusin="focus = true"
    @focusout="focus = false"
  >
    <span
      v-if="label"
      class="VField__label"
      :class="{ 'VField__label_focus' : focus || empty }"
    >
      {{ label }}
    </span>
    <span class="VField__content">
      <span class="mt-6">
        <slot></slot>
      </span>
      <span
        v-if="isAppendInnerNotEmpty"
        class="VField__appendInner"
      >
        <VBtn
          ghost
        >
          <slot name="appendInner"></slot>
        </VBtn>
      </span>
    </span>
  </label>
</template>

<style>
.VField__content {
  display: grid;
  grid-template-columns: 1fr min-content;
}
.VField__appendInner {
  align-self: center;
}
.VField__label {
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
.VField__label.VField__label_focus {
  transform: scale(0.75);
}
.VField_disabled {
  pointer-events: none;
  filter: grayscale(1) opacity(0.5);
}
</style>
