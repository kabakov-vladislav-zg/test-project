<script
  setup
  lang="ts"
  generic="Item extends object"
>
import { computed, ref } from 'vue';
import VInputText from '@/components/VInputText.vue';
import IconDown from '@/components/icons/IconDown.vue';
import VBtn from '@/components/VBtn.vue';
import type { PickByValue, $Keys } from 'utility-types';
import type { ComponentProps } from 'vue-component-type-helpers'

type Value = string | number;
type ModelValue = Value | null;
type PickKeysByValue<T, ValueType> = $Keys<PickByValue<T, ValueType>>;
type ValueKey = PickKeysByValue<Item, Value>;
type InputProps = ComponentProps<typeof VInputText>;
type CurrentName = Exclude<InputProps['modelValue'], undefined>
type NameKey = PickKeysByValue<Item, CurrentName>;
type Disabled = InputProps['disabled'];
type Label = InputProps['label'];
const props = defineProps<{
  modelValue: ModelValue,
  items: Item[],
  valueKey: ValueKey,
  nameKey: NameKey,
  disabled?: Disabled,
  label?: Label,
}>();
const emit = defineEmits<{
  'update:modelValue': [value: ModelValue]
}>();
const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: ModelValue) {
    emit('update:modelValue', value)
  },
});
const getValue = (item: Item) => {
  return item[props.valueKey];
}
const getName = (item: Item) => {
  return item[props.nameKey];
}
const currentName = computed<CurrentName>(() => {
  const value = inputValue.value;
  const current = props.items.find((item) => getValue(item) === value);
  return current ? getName(current) : '';
});
const onselect = (item: Item) => {
  inputValue.value = getValue(item);
  open.value = false;
}
const open = ref(false);
</script>

<template>
  <div class="VSelect relative">
    <VInputText
      :modelValue="currentName"
      :disabled="disabled"
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
