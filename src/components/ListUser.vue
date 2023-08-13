<script
  setup
  lang="ts"
>
import { computed, ref, inject } from 'vue';
import FormUser from '@/components/FormUser.vue';
import CardUser from '@/components/CardUser.vue';
import VBtn from '@/components/VBtn.vue';
import VInputCheckbox from '@/components/VInputCheckbox.vue';
import { useUserStore, } from '@/stores/user';
import { modalKey } from '@/keys/modalProvider';

const store = useUserStore();
const users = computed(() => store.users);
const isShowLastName = ref(true);
const modal = inject(modalKey, { open(){}, close(){} });
const openModal = () => {
  const component = FormUser;
  const bindings = {
    onSubmit() {
      modal.close();
    },
  };
  modal.open({ component, bindings })
};
</script>

<template>
  <div class="ListUser">
    <div class="flex items-center">
      <VBtn
        @click="openModal"
      >
        Добавить пользователя
      </VBtn>
      <VInputCheckbox
        v-model="isShowLastName"
        label="Показать фамилии"
        class="ml-4"
      />
    </div>
    <hr class="border-b-1 border-gray-600 my-4">
    <div
      v-if="users.length"
      class="grid grid-cols-1 gap-4"
    >
      <CardUser
        v-for="user in users"
        :key="user.userId"
        :user="user"
        :show-last-name="isShowLastName"
      />
    </div>
    <div
      v-else
      class="text-gray-500"
    >
      Некому работать((((
    </div>
  </div>
</template>
