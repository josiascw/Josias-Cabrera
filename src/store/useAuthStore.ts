import { create } from 'zustand';
import { UserProfile } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: UserProfile | null) => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user, loading: false, initialized: true }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  refreshProfile: async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) {
      set({ user: null, loading: false, initialized: true });
      return;
    }

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (profile) {
      set({ user: profile as UserProfile, loading: false, initialized: true });
    } else {
      set({ user: null, loading: false, initialized: true });
    }
  }
}));
