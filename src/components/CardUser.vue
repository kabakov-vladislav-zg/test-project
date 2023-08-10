<script
  setup
  lang="ts"
>
import { inject } from 'vue';
import VCard from '@/components/VCard.vue';
import VAvatar from '@/components/VAvatar.vue';
import VBtn from '@/components/VBtn.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import { userKey } from '@/keys/user';
import type { UserProvide } from '@/keys/user';
import type { User } from '@/stores/user';

defineProps<{
  user: User
}>();

// я бы сделал через события, но не придумал куда ещё provide/inject засунуть, как в тз требуется
const { changeUser, deleteUser } = inject<UserProvide>(userKey, {
  changeUser(id?: number) {},
  deleteUser(id: number) {},
});
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
        <div>
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
          @click="changeUser(user.userId)"
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