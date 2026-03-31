import { UserProfile, UserRole } from '../types';

const MOCK_ADMIN: UserProfile = {
  id: 'admin-id',
  email: 'admin@animarte.com',
  role: 'admin',
  created_at: new Date().toISOString()
};

export const authService = {
  async signIn(email: string, password: string): Promise<UserProfile> {
    // Simple mock sign in
    if (email === 'admin@animarte.com' && password === 'admin123') {
      localStorage.setItem('user', JSON.stringify(MOCK_ADMIN));
      return MOCK_ADMIN;
    }
    
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) throw new Error('Invalid credentials');
    
    const profile: UserProfile = { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      created_at: user.created_at || new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(profile));
    return profile;
  },

  async signUp(email: string, password: string, role: UserRole = 'client'): Promise<UserProfile> {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      role,
      created_at: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const profile: UserProfile = { 
      id: newUser.id, 
      email: newUser.email, 
      role: newUser.role,
      created_at: newUser.created_at
    };
    localStorage.setItem('user', JSON.stringify(profile));
    return profile;
  },

  async signOut() {
    localStorage.removeItem('user');
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
