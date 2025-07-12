import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
    name: '测试用户',
    dept: '运维部',
    avatar: 'https://via.placeholder.com/40'
  }),
  actions: {
    login(username: string, password: string) {
      if (username && password) {
        this.loggedIn = true;
        return true;
      }
      return false;
    },
    logout() {
      this.loggedIn = false;
    }
  }
});
