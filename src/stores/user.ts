import { defineStore } from 'pinia'

export interface User {
  userId: number
  avatar: string
  nameFirst: string
  nameLast: string
  role: 'worker' | 'director'
  phone: number | string
}
export interface State {
  users: User[],
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    users: [],
  }),
  actions: {
    saveUser(user: Omit<User, 'userId'>) {
      const userId = Math.random(); // get from backend in prodaction
      const newUser = Object.assign(user, { userId });
      this.users.push(newUser);
      return userId;
    },
    deleteUser(id: number) {
      const userLength = this.users.length;
      this.users = this.users.filter(({ userId }) => id !== userId);
      if (userLength === this.users.length) {
        console.error('No user found with this userId');
      }
    },
    changeUser(user: User) {
      const index = this.users.findIndex(({ userId }) => userId === user.userId);
      if (index < 0) {
        console.error('No user found with this userId');
        return;
      }
      this.users[index] = user;
    },
    getUser(id: number) {
      return this.users.find(({ userId }) => id === userId);
    },
  }
})
