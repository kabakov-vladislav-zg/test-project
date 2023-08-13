<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue';
import VAvatar from '@/components/VAvatar.vue';
import IconCamera from '@/components/icons/IconCamera.vue';
import { getDataURLs } from '@/utils/files';
import type { ComponentProps } from 'vue-component-type-helpers'

type AvatarProps = ComponentProps<typeof VAvatar>;
const props = withDefaults(defineProps<{
  modelValue?: string
  width?: AvatarProps['width']
}>(), {
  modelValue: '',
});
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();
const img = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value)
  },
});
const errorMessage = ref('');
const setImg = async (files: FileList) => {
  const [file] = await getDataURLs(files, { type: /image\/(jpe?g|png)/i });
  const { data, error, valid, name } = file;
  if (error) {
    errorMessage.value = `Ошибка при загрузке файла ${name}`;
  } else if (!valid) {
    errorMessage.value = `Неверный формат файла ${name}`;
  } else {
    errorMessage.value = '';
    img.value = data;
  }
};
const onchange = ({ target }: Event) => {
  const files = (target as HTMLInputElement).files;
  if (!files) return;
  setImg(files);
}
</script>

<template>
  <div class="VInputAvatar relative">
    <VAvatar
      :img="img"
      class="VInputAvatar__img"
      :width="width"
    >
      <input
        type="file"
        class="h-full w-full opacity-0 absolute cursor-pointer"
        accept=".jpg, .jpeg, .png"
        @change="onchange"
      />
      <div
        class="VInputAvatar__label absolute inset-0 top-auto pointer-events-none"
        :class="{ 'block': !img }"
      >
        <div class="flex justify-center bg-slate-500 bg-opacity-50">
          <IconCamera
            width="25%"
            height="0%"
            class="text-slate-600"
          />
        </div>
      </div>
    </VAvatar>
    <div class="text-sm mt-1">
      Загрузите изображение в формате jpg, jpeg, png
    </div>
    <div
      v-if="errorMessage"
      class="text-red-600"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style>
.VInputAvatar__label {
  display: none;
}
.VInputAvatar__img:hover .VInputAvatar__label {
  display: block;
}
</style>
