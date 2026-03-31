import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';

export const productService = {
  async getProducts(type?: 'empapelado' | 'publicidad'): Promise<Product[]> {
    let query = supabase.from('products').select('*');
    if (type) {
      query = query.eq('type', type);
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data as Product[];
  },

  async getCategories(type?: 'empapelado' | 'publicidad'): Promise<Category[]> {
    let query = supabase.from('categories').select('*');
    if (type) {
      query = query.eq('type', type);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Category[];
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    if (error) throw error;
    return data as Product;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Product;
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  },

  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  }
};
