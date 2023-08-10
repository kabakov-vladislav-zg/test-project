import type { InjectionKey } from 'vue'

export const userKey = Symbol() as InjectionKey<string>;
export interface UserProvide {
  changeUser: (id?: number) => void
  deleteUser: (id: number) => void
}