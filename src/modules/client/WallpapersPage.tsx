import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flower2, Baby, Shapes, Layers, Image as ImageIcon, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const styles = [
  {
    id: 'floral',
    name: 'Floral',
    description: 'Diseños inspirados en la naturaleza, perfectos para ambientes frescos y elegantes.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80',
    icon: Flower2,
    color: 'from-pink-500/20 to-rose-500/20'
  },
  {
    id: 'infantil',
    name: 'Infantil',
    description: 'Colores vibrantes y personajes mágicos para transformar las habitaciones de los más pequeños.',
    image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80',
    icon: Baby,
    color: 'from-blue-400/20 to-cyan-400/20'
  },
  {
    id: 'geometrico',
    name: 'Geométrico',
    description: 'Patrones modernos y simétricos que aportan orden y sofisticación a cualquier espacio.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80',
    icon: Shapes,
    color: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    id: 'textura',
    name: 'Textura',
    description: 'Efectos visuales que imitan materiales como piedra, madera o concreto con realismo asombroso.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80',
    icon: Layers,
    color: 'from-amber-500/20 to-orange-500/20'
  },
  {
    id: 'fotomural',
    name: 'Fotomural',
    description: 'Paisajes y fotografías a gran escala que crean una ventana a otros mundos en tu pared.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
    icon: ImageIcon,
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 'personalizado',
    name: 'Personalizado',
    description: 'Tus propias ideas, fotos o diseños convertidos en una obra de arte única para tu hogar.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
    icon: Sparkles,
    color: 'from-gray-500/20 to-slate-500/20'
  }
];

export default function WallpapersPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animation
    gsap.from('.hero-content', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Style Cards Animation
    gsap.from('.style-card', {
      scrollTrigger: {
        trigger: '.styles-grid',
        start: 'top 85%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out'
    });

    // Icon floating animation
    gsap.to('.style-icon', {
      y: -5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Wallpapers background"
          />
        </div>
        <div className="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
            Nuestros <span className="text-orange-600">Empapelados</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explora nuestra colección de empapelados diseñados para dar vida a tus espacios. Desde lo clásico hasta lo vanguardista.
          </p>
        </div>
      </section>

      {/* Styles Grid - Modulated Session */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="styles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {styles.map((style) => (
            <div 
              key={style.id} 
              className="style-card group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${style.color} opacity-60`} />
                <div className="style-icon absolute top-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg">
                  <style.icon className="w-6 h-6 text-gray-900" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
                  {style.name}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                  {style.description}
                </p>
                
                <Link 
                  to={`/empapelados/${style.id}`}
                  className="inline-flex items-center gap-2 text-gray-900 font-black uppercase tracking-widest text-sm hover:text-orange-600 transition-colors group/link"
                >
                  Ver Diseños 
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-6">
              ¿Tienes una idea <span className="text-orange-600">especial</span>?
            </h2>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Nuestro equipo de diseño puede crear cualquier diseño que imagines. Cuéntanos tu proyecto y lo haremos realidad.
            </p>
            <a 
              href="https://wa.link/hfnuto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-gray-200"
            >
              Realizar pedido
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
