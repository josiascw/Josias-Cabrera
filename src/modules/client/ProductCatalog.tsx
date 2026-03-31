import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import LoadingScreen from '../../components/LoadingScreen';

interface ProductCatalogProps {
  type?: 'empapelado' | 'publicidad';
  category?: string;
}

export default function ProductCatalog({ type, category }: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = category || searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts(type);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [type]);

  const filteredProducts = categoryFilter 
    ? products.filter(p => p.category_id === categoryFilter || p.name.toLowerCase().includes(categoryFilter.toLowerCase()))
    : products;

  if (loading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
            {category ? `Colección ${category}` : (type ? type : 'Nuestro Catálogo')}
          </h2>
          <div className="h-2 w-20 bg-orange-600 mt-4 rounded-full" />
        </div>

        {categoryFilter && !category && (
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl border border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Filtrado por:</span>
            <span className="text-sm font-black text-gray-900 uppercase">{categoryFilter}</span>
            <button 
              onClick={() => setSearchParams({})}
              className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              {product.image_urls?.[0] ? (
                <img 
                  src={product.image_urls[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-200" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                  product.type === 'empapelado' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {product.type}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Desde</span>
                  <span className="text-2xl font-black text-gray-900 tracking-tight">${product.price_base.toLocaleString()}</span>
                </div>
                <button className="p-3 bg-gray-900 text-white rounded-2xl hover:bg-orange-600 transition-colors group/btn">
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400">No hay productos en esta categoría</h3>
        </div>
      )}
    </div>
  );
}
