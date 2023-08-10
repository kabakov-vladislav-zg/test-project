<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue';
import { useCssSizeValue } from '@/composables/cssSizeValue';
import VCard from '@/components/VCard.vue';
import VBtn from '@/components/VBtn.vue';
import IconClose from '@/components/icons/IconClose.vue';

const props = withDefaults(defineProps<{
  modelValue?: boolean
  width?: string | number
  minHeight?: string | number
}>(), {
  modelValue: false,
  width: 500,
  minHeight: 600,
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>();
const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
});
const { value: width } = useCssSizeValue(() => props.width);
const { value: minHeight } = useCssSizeValue(() => props.minHeight);
</script>

<template>
  <div
    v-if="isOpen"
    class="VModal"
    @click.self="isOpen = false"
  >
    <VCard
      class="VModal__content"
      :style="{
        width,
        minHeight,
      }"
    >
      <div class="relative">
        <VBtn
          ghost
          class="absolute top-0 right-0 z-10"
          @click="isOpen = false"
        >
          <IconClose />
        </VBtn>
        <slot></slot>
      </div>
    </VCard>
  </div>
</template>

<style>
.VModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow-y: auto;
    z-index: 100;
}
.VModal::before,
.VModal::after {
    content: '';
}
.VModal__content {
  max-width: 100%;
}
@media (max-width: 464px) {
  .VModal__content {
    border-radius: 0!important;
  }
  .VModal__content {
    min-height: 100%!important;
  }
}
</style>
