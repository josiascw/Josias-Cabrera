import { Product, Category } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Papel Tapiz Floral',
    description: 'Diseño elegante con motivos florales en tonos pastel.',
    price_base: 45.99,
    image_urls: ['https://picsum.photos/seed/floral/800/600'],
    category_id: '1',
    type: 'empapelado',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Vinilo Publicitario',
    description: 'Vinilo de alta calidad para exteriores.',
    price_base: 120.00,
    image_urls: ['https://picsum.photos/seed/vinyl/800/600'],
    category_id: '3',
    type: 'publicidad',
    created_at: new Date().toISOString()
  }
];

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Clásico', type: 'empapelado' },
  { id: '2', name: 'Moderno', type: 'empapelado' },
  { id: '3', name: 'Gigantografías', type: 'publicidad' },
  { id: '4', name: 'Señalética', type: 'publicidad' }
];

export const productService = {
  async getProducts(type?: 'empapelado' | 'publicidad'): Promise<Product[]> {
    const stored = localStorage.getItem('products');
    let products = stored ? JSON.parse(stored) : MOCK_PRODUCTS;
    if (type) {
      products = products.filter((p: Product) => p.type === type);
    }
    return products;
  },

  async getCategories(type?: 'empapelado' | 'publicidad'): Promise<Category[]> {
    const stored = localStorage.getItem('categories');
    let categories = stored ? JSON.parse(stored) : MOCK_CATEGORIES;
    if (type) {
      categories = categories.filter((c: Category) => c.type === type);
    }
    return categories;
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const stored = localStorage.getItem('products');
    const products = stored ? JSON.parse(stored) : MOCK_PRODUCTS;
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return newProduct as Product;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const stored = localStorage.getItem('products');
    const products = stored ? JSON.parse(stored) : MOCK_PRODUCTS;
    const index = products.findIndex((p: Product) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    products[index] = { ...products[index], ...updates };
    localStorage.setItem('products', JSON.stringify(products));
    return products[index];
  },

  async deleteProduct(id: string): Promise<void> {
    const stored = localStorage.getItem('products');
    const products = stored ? JSON.parse(stored) : MOCK_PRODUCTS;
    const filtered = products.filter((p: Product) => p.id !== id);
    localStorage.setItem('products', JSON.stringify(filtered));
  },

  async uploadImage(file: File): Promise<string> {
    // In a static site, we can't really upload files to a server.
    // We'll return a placeholder URL.
    return URL.createObjectURL(file);
  }
};
