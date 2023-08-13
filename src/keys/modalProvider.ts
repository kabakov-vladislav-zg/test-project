import type { InjectionKey, Component } from 'vue'
import type { ComponentProps, ComponentEmit } from 'vue-component-type-helpers'

export interface ModalOptions<T extends Component> {
  component: T
  bindings?: ComponentProps<T>  | null // TODO Need to merge with attributes interface? What is the interface of attributes?
  events?: object | null // TODO Typing events.
}
export interface ModalProvider {
  open: <T extends Component>(options: ModalOptions<T>) => void
  close: () => void
}
export const modalKey = Symbol() as InjectionKey<ModalProvider>;
