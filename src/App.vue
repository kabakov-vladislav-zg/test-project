<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import VCard from '@/components/VCard.vue';
import VInputAvatar from '@/components/VInputAvatar.vue';

const avatar = ref('');
</script>

<template>
  <div class="container py-4">
    <VCard
      class="max-w-xl"
    >
      <VInputAvatar
        v-model="avatar"
      />
    </VCard>
  </div>
</template>

<style>

</style>
