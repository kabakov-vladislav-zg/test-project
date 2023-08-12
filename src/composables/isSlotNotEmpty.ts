import { computed, toValue } from 'vue';
import type { Slot, MaybeRefOrGetter } from 'vue';

/**
 * Checking if the slot is not empty. Required because nested slots are wrongly defined as true in $slots.
 * @param slot
 * @beta
 */
export function useIsSlotNotEmpty(slot: MaybeRefOrGetter<Slot | undefined>) {
  // TODO Check on all types of slots (text, component, comment, etc).
  const isNotEmpty = computed(() => {
    const slotValue = toValue(slot);
    return (typeof slotValue === 'function') && !!slotValue()[0].children?.length
  });
  return { isNotEmpty };
}
