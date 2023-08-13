<script
  setup
  lang="ts"
>
import { computed, ref, reactive } from 'vue';
import VInputAvatar from '@/components/VInputAvatar.vue';
import VInputText from '@/components/VInputText.vue';
import VBtn from '@/components/VBtn.vue';
import VSelect from '@/components/VSelect.vue';
import { useUserStore, } from '@/stores/user';
import type { User } from '@/stores/user';

const { userId } = defineProps<{
  userId?: number | null
}>();
const emit = defineEmits<{
  'submit': [],
}>();
const store = useUserStore();
type NewUser = Omit<User, 'userId' | 'role'> & { role: User['role'] | null };
const user = reactive<NewUser>({
  avatar: '',
  nameFirst: '',
  nameLast: '',
  phone: '',
  role: null,
})
if (userId) {
  const savedUser = store.getUser(userId);
  if (savedUser) {
    const { userId, ...currentUser } = savedUser;
    Object.assign(user, currentUser);
  } else {
    console.error('user is undefined');
  }
}
const items = ref([
  {
    name: 'Работник',
    value: 'worker',
  },
  {
    name: 'Директор',
    value: 'director',
  },
]);
const isPhoneAvaible = computed(() => user.role === 'director');
const isValid = computed(() => !!user.nameFirst && !!user.nameLast && !!user.role);
const saveUser = () => {
  if (!isValid.value) return;
  if (userId) {
    store.changeUser({ userId, ...user } as User);
  } else {
    store.saveUser(user as User);
  }
  emit('submit');
};
</script>

<template>
  <div class="FormUser">
    <VInputAvatar
      v-model="user.avatar"
      class="mb-4"
    />
    <VInputText
      v-model="user.nameFirst"
      label="Имя"
      class="mb-4"
    />
    <VInputText
      v-model="user.nameLast"
      label="Фамилия"
      class="mb-4"
    />
    <VInputText
      v-if="isPhoneAvaible"
      v-model="user.phone"
      label="Телефон"
      class="mb-4"
    />
    <VSelect
      v-model="user.role"
      :items="items"
      :disabled="!!userId"
      name-key="name"
      value-key="value"
      label="Роль"
      class="mb-4"
    />
    <VBtn
      block
      :disabled="!isValid"
      @click="saveUser"
    >
      <template v-if="userId">
        Сохранить
      </template>
      <template v-else>
        Создать
      </template>
      работника
    </VBtn>
  </div>
</template>
