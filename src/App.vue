<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import FormUser from '@/components/FormUser.vue';
import VBtn from '@/components/VBtn.vue';
import VModal from '@/components/VModal.vue';

const modal = ref(false);
const userId = ref(null);
const openModal = (id = null) => {
  modal.value = true;
  userId.value = id;
}
const closeModal = (id = null) => {
  modal.value = false;
}
</script>

<template>
  <div class="container py-4">
    <VBtn
      @click="modal = true"
    >
      Кнопка
    </VBtn>
    <VModal v-model="modal">
      <FormUser
        :userId="userId"
        @submit="closeModal()"
      />
    </VModal>
  </div>
</template>

<style>

</style>
