export type UserRole = 'admin' | 'client';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'estilo' | 'publicidad';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price_base: number;
  category_id: string;
  type: 'estilo' | 'publicidad';
  image_urls: string[];
  created_at: string;
}
