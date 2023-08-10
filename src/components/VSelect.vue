<script
  setup
  lang="ts"
  generic="Item extends object"
>
import { computed, ref } from 'vue';
import VInputText from '@/components/VInputText.vue';
import IconDown from '@/components/icons/IconDown.vue';
import VBtn from '@/components/VBtn.vue';

const props = withDefaults(defineProps<{
  modelValue: string | number | null
  label: string | number
  items: Item[]
  nameKey: keyof Item,
  valueKey: keyof Item,
}>(), {});
const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>();
const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string | number | null) {
    emit('update:modelValue', value)
  },
});
const getValue = (item: Item) => {
  return item[props.valueKey];
}
const getName = (item: Item) => {
  return item[props.nameKey];
}
const currentName = computed(() => {
  const value = inputValue.value;
  const current = props.items.find((item) => getValue(item) === value);
  return current ? getName(current) : undefined;
});
const onselect = (item: Item) => {
  inputValue.value = getValue(item) || null;
  open.value = false;
}
const open = ref(false);
</script>

<template>
  <div class="VSelect relative">
    <VInputText
      :modelValue="currentName"
      readonly
      :label="label"
      @click="open = !open"
    >
      <template #appendInner>
        <IconDown
          :class="{ 'transform rotate-180' : open }"
        />
      </template>
    </VInputText>
    <div
      v-show="open"
      class="VSelect__options"
    >
      <VBtn
        v-for="item in items"
        :key="getValue(item)"
        ghost
        block
        @click="onselect(item)"
      >
        {{ getName(item) }}
      </VBtn>
    </div>
  </div>
</template>

<style>
</style>
