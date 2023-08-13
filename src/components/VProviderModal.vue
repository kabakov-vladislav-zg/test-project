<script
  setup
  lang="ts"
>
import { reactive, provide, markRaw } from 'vue';
import type { ModalOptions } from '@/keys/modalProvider';
import { modalKey } from '@/keys/modalProvider';
import VModal from '@/components/VModal.vue';

const modal = reactive<ModalOptions & { state: boolean }>({
  state: false,
  component: {},
  bindings: null,
  events: null,
});
const open = (options: ModalOptions) => {
  modal.component = markRaw(options.component);
  modal.bindings = options.bindings || null;
  modal.events = options.events || null;
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
        v-on="modal.events"
      />
    </VModal>
  </div>
</template>
