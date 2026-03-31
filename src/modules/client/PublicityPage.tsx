import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Maximize, Scissors, Monitor, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'vinil-publicitario',
    name: 'Vinil Publicitario',
    description: 'Acabado elegante y versátil, ideal para interiores y exteriores con alta durabilidad.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80',
    icon: Layers,
    color: 'border-gray-200'
  },
  {
    id: 'corte-troquelado',
    name: 'Corte troquelado de vinil',
    description: 'Precisión milimétrica en cortes de formas personalizadas para logotipos y señalética.',
    image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?auto=format&fit=crop&q=80',
    icon: Scissors,
    color: 'border-gray-200'
  },
  {
    id: 'articulos-publicitarios',
    name: 'Articulos Publicitarios',
    description: 'Soluciones integrales de marca en diversos soportes y materiales de alta calidad.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
    icon: Maximize,
    color: 'border-gray-200'
  },
  {
    id: 'letreros-3d',
    name: 'Letreros 3D acrilicos Luminosos',
    description: 'Letras corpóreas con iluminación LED para una presencia de marca impactante y moderna.',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80',
    icon: Monitor,
    color: 'border-gray-200'
  }
];

export default function PublicityPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.from('.publicity-header', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Service Rows Animation
    gsap.from('.service-row', {
      scrollTrigger: {
        trigger: '.services-container',
        start: 'top 85%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out'
    });

    // Icon floating animation
    gsap.to('.service-icon', {
      y: -5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Minimalist Header */}
      <section className="py-24 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="publicity-header max-w-3xl">
            <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Servicios Profesionales</span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-none">
              Soluciones de <br />
              <span className="text-orange-600">Publicidad</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              Calidad técnica y el impacto visual que busca el cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Modulated Session - Minimalist Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="services-container grid grid-cols-1 gap-1">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-row group flex flex-col md:flex-row items-center gap-12 py-16 ${
                index !== services.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* Image Module */}
              <div className="w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden rounded-[2rem] bg-gray-50">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Module */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="service-icon inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">
                  {service.name}
                </h3>
                <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                  {service.description}
                </p>
                <Link 
                  to={`/publicidad/portafolio/${service.id}`}
                  className="inline-flex items-center gap-4 text-orange-600 font-black uppercase tracking-widest text-xs group/link pt-4"
                >
                  Explorar trabajos
                  <div className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center group-hover/link:bg-orange-600 group-hover/link:text-white group-hover/link:border-orange-600 transition-all">
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimalist CTA */}
      <section className="bg-orange-700 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                ¿Listo para <br />
                <span className="text-orange-200">destacar</span>?
              </h2>
              <p className="text-xl text-orange-100">
                Inicia tu proyecto publicitario hoy mismo con asesoría profesional personalizada.
              </p>
            </div>
            <a 
              href="https://wa.link/hfnuto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-orange-600 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-900 hover:text-white transition-all shadow-2xl shadow-orange-900/40"
            >
              Realizar pedido
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
