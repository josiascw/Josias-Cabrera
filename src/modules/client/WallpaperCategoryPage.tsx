import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { Loader2, ArrowLeft, Sparkles, X, Maximize2, Flower2, Baby, Shapes, Layers, Image as ImageIcon } from 'lucide-react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Design {
  id: number;
  name: string;
  before: string;
  after: string;
  thumbnail: string;
}

const categoryData: Record<string, { 
  name: string; 
  description: string; 
  designs: Design[];
  icon: any 
}> = {
  floral: {
    name: 'Floral',
    description: 'Transforma tus espacios con la delicadeza de la naturaleza. Diseños que aportan frescura y elegancia atemporal.',
    designs: [
      {
        id: 1,
        name: 'Jardín de Rosas',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80'
      },
      {
        id: 2,
        name: 'Hojas de Otoño',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80'
      },
      {
        id: 3,
        name: 'Lirios Blancos',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80'
      }
    ],
    icon: Flower2
  },
  infantil: {
    name: 'Infantil',
    description: 'Crea mundos mágicos para los más pequeños. Colores y personajes que estimulan la imaginación.',
    designs: [
      {
        id: 1,
        name: 'Aventura Espacial',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80'
      },
      {
        id: 2,
        name: 'Bosque Encantado',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80'
      }
    ],
    icon: Baby
  },
  geometrico: {
    name: 'Geométrico',
    description: 'Orden, simetría y modernidad. Patrones que definen el carácter de tus paredes con sofisticación.',
    designs: [
      {
        id: 1,
        name: 'Hexágonos Ámbar',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80'
      },
      {
        id: 2,
        name: 'Líneas Abstractas',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80'
      }
    ],
    icon: Shapes
  },
  textura: {
    name: 'Textura',
    description: 'El realismo de los materiales naturales sin complicaciones. Piedra, madera y concreto en tu pared.',
    designs: [
      {
        id: 1,
        name: 'Mármol Carrara',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80'
      },
      {
        id: 2,
        name: 'Concreto Industrial',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80'
      }
    ],
    icon: Layers
  },
  fotomural: {
    name: 'Fotomural',
    description: 'Ventanas a otros mundos. Paisajes a gran escala que expanden los límites de tu habitación.',
    designs: [
      {
        id: 1,
        name: 'Bosque de Niebla',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80'
      }
    ],
    icon: ImageIcon
  },
  personalizado: {
    name: 'Personalizado',
    description: 'Tu visión, tu diseño. Convertimos tus ideas y fotografías en obras de arte únicas para tu hogar.',
    designs: [
      {
        id: 1,
        name: 'Arte Abstracto',
        before: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80'
      }
    ],
    icon: Sparkles
  }
};

export default function WallpaperCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const data = categoryId ? categoryData[categoryId] : null;

  useGSAP(() => {
    if (!data) return;

    // Header Animation
    gsap.from('.category-header', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Cards Animation
    gsap.from('.design-card', {
      scrollTrigger: {
        trigger: '.designs-grid',
        start: 'top 85%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out'
    });

    // Icon floating animation
    gsap.to('.category-icon', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, { scope: containerRef, dependencies: [categoryId] });

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">Categoría no encontrada</h2>
          <Link to="/empapelados" className="text-orange-600 font-bold hover:underline">Volver a Empapelados</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={data.designs[0]?.after} className="w-full h-full object-cover blur-sm" alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link 
            to="/empapelados" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Volver a Empapelados</span>
          </Link>
          
          <div className="category-header flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="category-icon w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white">
                  <data.icon className="w-6 h-6" />
                </div>
                <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-xs">Categoría</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                Estilo <span className="text-orange-600">{data.name}</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 space-y-24">
        {/* Gallery Section */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="designs-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.designs.map((design) => (
              <div 
                key={design.id}
                onClick={() => setSelectedDesign(design)}
                className="design-card group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={design.thumbnail} 
                  alt={design.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{design.name}</h4>
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest">
                    <Maximize2 className="w-4 h-4" />
                    Ver Comparación
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-2">Instalación Limpia</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Proceso rápido y sin suciedad para una renovación inmediata.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-2">Alta Durabilidad</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Materiales de primera calidad que resisten el paso del tiempo.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-2">Diseño Único</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Patrones exclusivos que no encontrarás en ningún otro lugar.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Before/After Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDesign(null)}
              className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute top-6 right-6 z-20">
                <button 
                  onClick={() => setSelectedDesign(null)}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-gray-900 hover:bg-orange-600 hover:text-white transition-all shadow-xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3">
                  <BeforeAfterSlider 
                    beforeImage={selectedDesign.before}
                    afterImage={selectedDesign.after}
                  />
                </div>
                <div className="p-8 lg:p-12 lg:w-1/3 flex flex-col justify-center">
                  <div className="mb-8">
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Transformación Real</span>
                    <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">{selectedDesign.name}</h3>
                    <p className="text-gray-500 leading-relaxed">Observa cómo este diseño {data.name} redefine por completo el espacio, aportando profundidad y estilo único.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Material Premium</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Resistente al Sol</span>
                    </div>
                  </div>

                  <div className="mt-12">
                    <a 
                      href="https://wa.link/hfnuto" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-orange-600 transition-all shadow-lg shadow-gray-200"
                    >
                      Realizar pedido
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
