import type { MaybeRefOrGetter } from 'vue';
import { computed, toValue } from 'vue';

export function useCssSizeValue(size: MaybeRefOrGetter) {
  const value = computed(() => {
    let value = toValue(size);
    if (Number(value)) {
      return `${value}px`;
    } else {
      return value;
    }
  });
  return { value };
}