import type { MaybeRefOrGetter } from 'vue';
import { computed, toValue } from 'vue';

export function useCssSizeValue(size: MaybeRefOrGetter<string | number>) {
  const value = computed(() => {
    let value = toValue(size);
    if (Number(value)) {
      return `${value}px`;
    } else {
      return String(value); // TODO perhaps should adding validation
    }
  });
  return { value };
}
