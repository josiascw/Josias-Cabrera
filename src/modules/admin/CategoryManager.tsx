import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { Category } from '../../types';
import { X, Plus, Trash2, Loader2, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface CategoryManagerProps {
  onClose: () => void;
}

export default function CategoryManager({ onClose }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: '', type: 'empapelado' as const });
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name) return;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([newCategory])
        .select()
        .single();
      if (error) throw error;
      setCategories([...categories, data as Category]);
      setNewCategory({ name: '', type: 'empapelado' });
    } catch (err) {
      console.error('Error adding category:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Tag className="w-5 h-5 text-orange-600" />
            Gestionar Categorías
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nombre de categoría..."
                value={newCategory.name}
                onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
              <select
                value={newCategory.type}
                onChange={e => setNewCategory({ ...newCategory, type: e.target.value as any })}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-xs font-bold"
              >
                <option value="empapelado">Empapelado</option>
                <option value="publicidad">Publicidad</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gray-900 text-white py-2 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Añadir Categoría
            </button>
          </form>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
              </div>
            ) : (
              categories.map(category => (
                <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <span className="font-bold text-gray-900">{category.name}</span>
                    <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-gray-400">{category.type}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
            {!loading && categories.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-4">No hay categorías creadas</p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
