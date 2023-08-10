<script
  setup
  lang="ts"
>
import { computed, ref, provide } from 'vue';
import FormUser from '@/components/FormUser.vue';
import CardUser from '@/components/CardUser.vue';
import VBtn from '@/components/VBtn.vue';
import VModal from '@/components/VModal.vue';
import { useUserStore, } from '@/stores/user'
import { userKey } from '@/keys/user';
import type { UserProvide } from '@/keys/user';

const store = useUserStore();
const users = computed(() => store.users);
const modal = ref(false);
const userId = ref<number | null>(null);
const openModal = (id?: number) => {
  modal.value = true;
  userId.value = id ? id : null;
};
const closeModal = (id = null) => {
  modal.value = false;
};
provide<UserProvide>(userKey, {
  changeUser: openModal,
  deleteUser: store.deleteUser,
})
</script>

<template>
  <div class="container py-4">
    <VBtn
      @click="modal = true"
    >
      Добавить пользователя
    </VBtn>
    <hr class="border-b-1 border-gray-600 my-4">
    <div
      v-if="users.length"
      class="grid grid-cols-1 gap-4"
    >
      <CardUser
        v-for="user in users"
        :key="user.userId"
        :user="user"
      />
    </div>
    <div
      v-else
      class="text-gray-500"
    >
      Некому работать((((
    </div>
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
