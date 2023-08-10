<script
  setup
  lang="ts"
>
import { computed, ref, onMounted } from 'vue';
import VInputAvatar from '@/components/VInputAvatar.vue';
import VInputText from '@/components/VInputText.vue';
import VBtn from '@/components/VBtn.vue';
import VSelect from '@/components/VSelect.vue';
import { useUserStore, } from '@/stores/user';
import type { User } from '@/stores/user';

const emit = defineEmits<{
  'submit': [user: User],
}>();
const store = useUserStore()
const props = defineProps<{
  userId?: number | null
}>();
const avatar = ref('');
const nameFirst = ref('');
const nameLast = ref('');
const phone = ref<string | number | undefined>('');
const role = ref<User['role'] | null>(null);
onMounted(() => {
  const id = props.userId;
  if (!id) return;
  const user = store.getUser(id);
  if (!user) return;
  avatar.value = user.avatar || '';
  nameFirst.value = user.nameFirst;
  nameLast.value = user.nameLast;
  phone.value = user.phone;
  role.value = user.role;
});
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
const isPhoneAvaible = computed(() => role.value === 'director');
const isValid = computed(() => !!nameFirst.value && !!nameLast.value && !!role.value);
const saveUser = () => {
  if (!isValid.value || !role.value) return; // TODO Remove role revalidation
  const id = props.userId;
  const user = {
    avatar: avatar.value,
    nameFirst: nameFirst.value,
    nameLast: nameLast.value,
    phone: phone.value,
    role: role.value,
  };
  if (id) {
    const currentUser = {
      userId: id,
      ...user
    }
    store.changeUser(currentUser);
    emit('submit', currentUser);
  } else {
    const id = store.saveUser(user);
    emit('submit', {
      userId: id,
      ...user
    });
  }
};
</script>

<template>
  <div class="FormUser">
    <VInputAvatar
      v-model="avatar"
      class="mb-4"
    />
    <VInputText
      v-model="nameFirst"
      label="Имя"
      class="mb-4"
    />
    <VInputText
      v-model="nameLast"
      label="Фамилия"
      class="mb-4"
    />
    <VInputText
      v-if="isPhoneAvaible"
      v-model="phone"
      label="Телефон"
      class="mb-4"
    />
    <VSelect
      v-model="role"
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

<style>

</style>
