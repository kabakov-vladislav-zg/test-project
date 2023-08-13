import type { InjectionKey, Component } from 'vue'

export interface ModalOptions {
  component: Component
  bindings?: object | null
  events?: object | null
}
export interface ModalProvider {
  open: (options: ModalOptions) => void
  close: () => void
}
export const modalKey = Symbol() as InjectionKey<ModalProvider>;
