<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import VCard from '@/components/VCard.vue';
import VInputAvatar from '@/components/VInputAvatar.vue';
import VInputText from '@/components/VInputText.vue';

const avatar = ref('');
const nameFirst = ref('');
const nameLast = ref('');
const text = ref('');
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
    </VCard>
  </div>
</template>

<style>

</style>
