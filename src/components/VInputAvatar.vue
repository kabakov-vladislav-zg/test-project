<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue';
import VAvatar from '@/components/VAvatar.vue';
import IconCamera from '@/components/icons/IconCamera.vue';

const props = withDefaults(defineProps<{
  modelValue?: string
  width?: string | number
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
const isError = ref(false);
const onchange = ({ target }: Event) => {
  if (!target || !(target instanceof HTMLInputElement)) return;
  const { files } = target;
  if (!files) return;
  const file = files[0];
  if (!file || !/\.(jpe?g|png)$/i.test(file.name)) {
    isError.value = true;
  } else {
    isError.value = false;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const result = reader.result;
      if (!result || result instanceof ArrayBuffer) {
        
      } else {
        img.value = result;
      }
    }, { once: true });
    reader.readAsDataURL(file);
  }
}
</script>

<template>
  <div class="VInputAvatar pb-6 relative">
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
            height="auto"
            class="text-slate-600"
          />
        </div>
      </div>
    </VAvatar>
    <div
      class="absolute bottom-0 text-sm"
      :class="{ 'text-red-600': isError }"
    >
      Загрузите изображение в формате jpg, jpeg, png
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
