import { create } from 'zustand';
import authService from '../services/authService';

const useAuthStore = create((set) => ({
  isAuthenticated: authService.isAuthenticated(),
  login: async (email, password) => {
    await authService.login(email, password);
    set({ isAuthenticated: true });
  },
  register: async (email, password) => {
    await authService.register(email, password);
    set({ isAuthenticated: true });
  },
  logout: () => {
    authService.logout();
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
