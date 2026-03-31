import { create } from 'zustand';
import { UserProfile } from '../types';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: UserProfile | null) => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user, loading: false, initialized: true }),
  signOut: async () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
  refreshProfile: async () => {
    const user = localStorage.getItem('user');
    if (user) {
      set({ user: JSON.parse(user) as UserProfile, loading: false, initialized: true });
    } else {
      set({ user: null, loading: false, initialized: true });
    }
  }
}));
