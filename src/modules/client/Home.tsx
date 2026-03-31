import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Megaphone, Calculator, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import WallpaperPopup from '../../components/WallpaperPopup';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show popup on mount
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 300); // Reduced delay for faster appearance
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Hero Section Animation
    const heroTl = gsap.timeline();
    heroTl
      .from('.hero-title', { y: 100, opacity: 0, duration: 1.2, ease: 'power4.out' })
      .from('.hero-p', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.8')
      .from('.hero-btns', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, '-=0.6');

    // Features Animation
    gsap.from('.feature-item', {
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 85%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    });

    // Icon floating animation
    gsap.to('.floating-icon', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-20 pb-20">
      <WallpaperPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Hero background"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="hero-title text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              DISEÑO QUE <br />
              <span className="text-orange-600">IMPULSA</span> TU <br />
              NEGOCIO
            </h1>
            <p className="hero-p text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
              Soluciones creativas en publicidad y empapelados para marcas que buscan destacar en un mercado competitivo.
            </p>
            <div className="hero-btns flex flex-wrap gap-4">
              <Link 
                to="/empapelados" 
                className="bg-white/5 backdrop-blur-md text-white hover:bg-orange-600 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl border border-white/20 w-full sm:w-56 justify-center flex items-center"
              >
                Empapelados
              </Link>
              <Link 
                to="/publicidad" 
                className="bg-white/5 backdrop-blur-md text-white hover:bg-orange-600 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl border border-white/20 w-full sm:w-56 justify-center flex items-center"
              >
                Publicidad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">¿Por qué elegirnos?</h2>
            <div className="h-1.5 w-16 bg-orange-600 mx-auto mt-4 rounded-full" />
          </div>
          
            <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: Zap, title: 'Rapidez', desc: 'Entregas en tiempo récord sin sacrificar calidad.' },
                { icon: Star, title: 'Calidad Premium', desc: 'Materiales y diseños de alto impacto visual.' },
                { icon: Shield, title: 'Garantía', desc: 'Respaldo total en cada uno de nuestros trabajos.' },
              ].map((feature) => (
                <div key={feature.title} className="feature-item text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-600 group-hover:bg-gray-700 transition-all duration-300 shadow-lg mb-6">
                    <feature.icon className="floating-icon w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>
      {/* Visit Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover"
              alt="Office background"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
              Visítanos en nuestras <br />
              <span className="text-orange-600">oficinas</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Somos una empresa familiar en Santa Cruz, encuentra en un solo lugar todo lo que necesitas para tu hogar o negocio.
            </p>
            <a 
              href="https://maps.app.goo.gl/f4EKSu5ixnf6Tj9c7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 hover:text-white transition-all duration-300"
            >
              Llega sin perderte
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
