import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioData: Record<string, { title: string, subtitle: string, works: { id: number, image: string, title: string }[] }> = {
  'vinil-publicitario': {
    title: 'Vinil Publicitario',
    subtitle: 'Impresiones',
    works: [
      { id: 1, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80', title: 'Vinil Mate Pared' },
      { id: 2, image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80', title: 'Vinil Brillo Vitrina' },
      { id: 3, image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80', title: 'Decoración Comercial' },
      { id: 4, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80', title: 'Diseño de Interiores' },
    ]
  },
  'corte-troquelado': {
    title: 'Corte Troquelado',
    subtitle: 'Precisión en Vinil',
    works: [
      { id: 1, image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?auto=format&fit=crop&q=80', title: 'Logotipo Troquelado' },
      { id: 2, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80', title: 'Señalética de Oficina' },
      { id: 3, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80', title: 'Vinil de Corte' },
      { id: 4, image: 'https://images.unsplash.com/photo-1572375927902-d62360355c57?auto=format&fit=crop&q=80', title: 'Gráficos para Pared' },
    ]
  },
  'articulos-publicitarios': {
    title: 'Artículos Publicitarios',
    subtitle: 'Merchandising y Branding',
    works: [
      { id: 1, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80', title: 'Lonas de Gran Formato' },
      { id: 2, image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80', title: 'Banners Publicitarios' },
      { id: 3, image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80', title: 'Material POP' },
      { id: 4, image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80', title: 'Exhibidores' },
    ]
  },
  'letreros-3d': {
    title: 'Letreros 3D',
    subtitle: 'Acrílicos Luminosos',
    works: [
      { id: 1, image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80', title: 'Letras de Acrílico' },
      { id: 2, image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&q=80', title: 'Iluminación LED' },
      { id: 3, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80', title: 'Logos Corpóreos' },
      { id: 4, image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80', title: 'Fachadas Modernas' },
    ]
  }
};

export default function PortfolioPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const data = category ? portfolioData[category] : null;

  useGSAP(() => {
    if (!data) return;

    // Header Animation
    gsap.from('.portfolio-header', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Grid Items Animation
    gsap.from('.portfolio-item', {
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 85%',
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }, { scope: containerRef, dependencies: [category] });

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Categoría no encontrada</h2>
          <button 
            onClick={() => navigate('/publicidad')}
            className="text-orange-600 font-bold uppercase tracking-widest text-xs hover:underline"
          >
            Volver a Publicidad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-900 font-black uppercase tracking-widest text-xs mb-12 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        
        <div className="portfolio-header mb-16">
          <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">{data.subtitle}</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            <span className="text-gray-400">{data.title}</span>
          </h1>
        </div>
      </div>

      <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {data.works.map((work) => (
          <div key={work.id} className="portfolio-item relative aspect-square overflow-hidden group">
            <img 
              src={work.image} 
              alt={work.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
