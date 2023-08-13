import type { InjectionKey, Component } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

export interface ModalOptions<T extends Component> {
  component: T
  bindings?: ComponentProps<T>  | null // TODO If at least one property is specified correctly, any other don't validate. Fixable?
}
export interface ModalProvider {
  open: <T extends Component>(options: ModalOptions<T>) => void
  close: () => void
}
export const modalKey = Symbol() as InjectionKey<ModalProvider>;
