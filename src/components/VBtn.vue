<script
  setup
  lang="ts"
>
const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ghost?: boolean
  block?: boolean
}>(), {
  type: 'button',
  disabled: false,
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="VBtn rounded-lg"
    :class="{
      'VBtn_ghost' : ghost,
      'block w-full' : block,
    }"
  >
    <slot></slot>
  </button>
</template>

<style>
.VBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
  @apply bg-blue-600 text-white px-4 py-2;
}
.VBtn_ghost {
  justify-content: flex-start;
  text-align: left;
  color: inherit;
  @apply bg-transparent text-inherit p-2;
}
.VBtn:disabled {
  cursor: auto;
  pointer-events: none;
  filter: grayscale(1) brightness(220%);
}
</style>
