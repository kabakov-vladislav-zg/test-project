<script
  setup
  lang="ts"
>
import { useCssSizeValue } from '@/composables/cssSizeValue';
import IconAvatar from '@/components/icons/IconAvatar.vue';

const props = withDefaults(defineProps<{
  img?: string
  width?: string | number
}>(), {
  width: 100
});
const { value: width } = useCssSizeValue(() => props.width);
</script>

<template>
  <div
    class="relative aspect-square rounded-full bg-slate-100 overflow-hidden"
    :style="{ width }"
  >
    <div class="absolute inset-0">
      <img
        v-if="img"
        :src="img"
        alt="аватар"
        class="object-cover w-full h-full"
      >
      <IconAvatar
        v-else
        class="w-full h-auto text-slate-200"
      />
    </div>
    <div
      v-if="$slots.default"
      class="absolute inset-0"
    >
      <slot></slot>
    </div>
  </div>
</template>
