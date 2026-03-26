import { supabase } from '../lib/supabase';
import { UserProfile, UserRole } from '../types';

export const authService = {
  async signIn(email: string, password: string): Promise<UserProfile> {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;
    return profile as UserProfile;
  },

  async signUp(email: string, password: string, role: UserRole = 'client'): Promise<UserProfile> {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert([
        { id: authData.user.id, email, role }
      ])
      .select()
      .single();

    if (profileError) throw profileError;
    return profile as UserProfile;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return null;

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    return profile as UserProfile;
  }
};
