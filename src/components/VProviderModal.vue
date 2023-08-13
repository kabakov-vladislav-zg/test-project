<script
  setup
  lang="ts"
>
import { reactive, provide, markRaw } from 'vue';
import type { ModalOptions } from '@/keys/modalProvider';
import { modalKey } from '@/keys/modalProvider';
import VModal from '@/components/VModal.vue';
import type { Component } from 'vue'

const modal = reactive<{
  state: boolean,
  component: Component,
  bindings: object | null,
}>({
  state: false,
  component: {},
  bindings: null,
});
const open = <T extends Component>(options: ModalOptions<T>) => {
  modal.component = markRaw(options.component);
  modal.bindings = options.bindings || null;
  modal.state = true;
}
const close = () => {
  modal.state = false;
}
provide(modalKey, { open, close });
</script>

<template>
  <div class="VProviderModal">
    <slot></slot>
    <VModal v-model="modal.state">
      <component
        :is="modal.component"
        v-bind="modal.bindings"
      />
    </VModal>
  </div>
</template>
