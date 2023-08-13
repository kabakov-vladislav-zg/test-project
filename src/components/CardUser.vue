<script
  setup
  lang="ts"
>
import { inject } from 'vue';
import VCard from '@/components/VCard.vue';
import VAvatar from '@/components/VAvatar.vue';
import VBtn from '@/components/VBtn.vue';
import FormUser from '@/components/FormUser.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import type { User } from '@/stores/user';
import { useUserStore, } from '@/stores/user';
import { modalKey } from '@/keys/modalProvider';

const props = defineProps<{
  user: User
  showLastName: boolean
}>();
const { deleteUser } = useUserStore();
const modal = inject(modalKey, { open(){}, close(){} });
const openModal = () => {
  const component = FormUser;
  const { userId } = props.user;
  const bindings = {
    userId,
    onSubmit() {
      modal.close();
    },
  };
  modal.open({ component, bindings })
};
</script>

<template>
  <VCard
    class="CardUser"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
      <div>
        <VAvatar
          :img="user.avatar"
        />
      </div>
      <div>
        <div>
          Имя: {{ user.nameFirst }}
        </div>
        <div v-if="showLastName">
          Фамилия: {{ user.nameLast }}
        </div>
        <div v-if="user.phone">
          Телефон: {{ user.phone }}
        </div>
      </div>
      <div class="absolute top-0 right-0">
        <VBtn
          ghost
          class="mr-4"
          @click="openModal"
        >
          <IconEdit />
        </VBtn>
        <VBtn
          ghost
          @click="deleteUser(user.userId)"
        >
          <IconTrash />
        </VBtn>
      </div>
    </div>
  </VCard>
</template>