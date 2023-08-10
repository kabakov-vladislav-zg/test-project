<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import VCard from '@/components/VCard.vue';
import VInputAvatar from '@/components/VInputAvatar.vue';
import VInputText from '@/components/VInputText.vue';
import VRadio from '@/components/VRadio.vue';
import VBtn from '@/components/VBtn.vue';
import VSelect from '@/components/VSelect.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';

const avatar = ref('');
const nameFirst = ref('');
const nameLast = ref('');
const text = ref('');
const radio = ref(false);
const select = ref('worker');
const items = ref([
  {
    name: 'Работник',
    value: 'worker',
  },
  {
    name: 'Директор',
    value: 'director',
  },
])
</script>

<template>
  <div class="container py-4">
    <VCard
      class="max-w-xl"
    >
      <VInputAvatar
        v-model="avatar"
      />
      <VInputText
        v-model="nameFirst"
        label="Имя"
      />
      <VInputText
        v-model="nameLast"
        label="Фамилия"
      />
      <VInputText
        v-model="text"
        label="Текс"
        textarea
      />
      <VRadio
        v-model="radio"
        label="Показать фамилии"
      />
      <VBtn>
        Кнопка
      </VBtn>
      <VBtn
        disabled
      >
        Кнопка
      </VBtn>
      <VBtn
        ghost
      >
        <IconEdit />
      </VBtn>
      <VBtn
        ghost
      >
        <IconTrash />
      </VBtn>
      <VSelect
        v-model="select"
        :items="items"
        name-key="name"
        value-key="value"
        label="Роль"
      />
    </VCard>
  </div>
</template>

<style>

</style>
