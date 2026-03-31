import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const newModels = [
  {
    id: 1,
    name: 'Bosque Minimalista',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80',
    tag: 'NUEVO',
    size: 'large'
  },
  {
    id: 2,
    name: 'Geométrico Ámbar',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80',
    tag: 'TENDENCIA',
    size: 'small'
  },
  {
    id: 3,
    name: 'Mármol Carrara',
    image: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80',
    tag: 'NUEVO',
    size: 'small'
  },
  {
    id: 4,
    name: 'Selva Tropical',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80',
    tag: 'EXCLUSIVO',
    size: 'medium'
  },
  {
    id: 5,
    name: 'Concreto Industrial',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80',
    tag: 'NUEVO',
    size: 'medium'
  },
  {
    id: 6,
    name: 'Acuarela Etérea',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80',
    tag: 'TENDENCIA',
    size: 'large'
  }
];

export default function NewModelsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hide header on scroll and reveal only at top
    ScrollTrigger.create({
      start: 'top top',
      onUpdate: (self) => {
        if (self.scroll() > 100) {
          gsap.to('.scroll-header', { 
            y: -100, 
            opacity: 0, 
            duration: 0.3, 
            ease: 'power2.inOut',
            pointerEvents: 'none'
          });
        } else {
          gsap.to('.scroll-header', { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            ease: 'power3.out',
            pointerEvents: 'auto'
          });
        }
      }
    });

    // Header Animation
    const headerTl = gsap.timeline();
    headerTl
      .from('.header-badge', { scale: 0.8, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' })
      .from('.header-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .from('.header-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

    // Sparkles rotation animation
    gsap.to('.sparkle-icon', {
      rotate: 360,
      duration: 8,
      repeat: -1,
      ease: 'none'
    });

    // Cards Grid Animation
    gsap.from('.model-card', {
      scrollTrigger: {
        trigger: '.grid-container',
        start: 'top 85%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#d6d6d6]">
      {/* Header */}
      <header className="scroll-header bg-white/80 backdrop-blur-md sticky top-16 z-40 border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="header-badge flex items-center gap-3 mb-2">
                <Sparkles className="sparkle-icon w-6 h-6 text-orange-600" />
                <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">Lanzamientos 2026</span>
              </div>
              <h1 className="header-title text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                Nuevos <br />
                <span className="text-gray-600">Modelos</span>
              </h1>
            </div>
            <p className="header-desc text-gray-500 max-w-sm text-sm leading-relaxed">
              Explora nuestra selección más reciente de diseños exclusivos. Cada modelo ha sido curado para ofrecer la máxima calidad visual y estilo.
            </p>
          </div>
        </div>
      </header>

      {/* Modular Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-dense">
          {newModels.map((model) => (
            <div
              key={model.id}
              className={`model-card relative overflow-hidden rounded-3xl group ${
                model.size === 'large' ? 'md:row-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              } ${
                model.size === 'medium' ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="aspect-[4/5] w-full h-full">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24 mt-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-6">¿Te gusta lo que ves?</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Nuestros asesores están listos para ayudarte a elegir el modelo perfecto para tu espacio y presupuesto.
          </p>
          <a 
            href="https://wa.link/hfnuto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-orange-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl shadow-orange-200"
          >
            Realizar pedido
          </a>
        </div>
      </section>
    </div>
  );
}
