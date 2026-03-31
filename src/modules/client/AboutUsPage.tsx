import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Target, Users, Award, Heart, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Counter({ value, duration = 1.5 }: { value: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const target = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      if (start === end) return;

      const totalFrames = duration * 60; // 60fps
      const increment = end / totalFrames;
      
      let currentCount = 0;
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Animation
    gsap.from('.hero-content', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    });

    // Stats Animation
    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 80%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    });

    // Values Animation
    gsap.from('.value-card', {
      scrollTrigger: {
        trigger: '.values-grid',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Oficina Animarte" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        </div>
        
        <div className="hero-content relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6">
            PASIÓN POR EL <br />
            <span className="text-orange-600">DISEÑO VISUAL</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Desde Santa Cruz de la Sierra, transformamos espacios y marcas con creatividad, tecnología y un compromiso inquebrantable con la excelencia.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Años de Experiencia', value: '10+' },
              { label: 'Proyectos Realizados', value: '500+' },
              { label: 'Clientes Felices', value: '300+' },
              { label: 'Diseños Exclusivos', value: '1000+' }
            ].map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <div className="text-5xl font-black text-gray-900 tracking-tighter mb-2">
                  <Counter value={stat.value} />
                </div>
                <div className="text-xs font-bold text-orange-600 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                  alt="Equipo Animarte" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-400 rounded-2xl flex items-center justify-center text-white">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-400 uppercase tracking-tighter">Nuestra Misión</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Brindar soluciones visuales innovadoras que superen las expectativas de nuestros clientes, utilizando materiales de la más alta calidad y tecnología de vanguardia para transformar cada espacio en una obra de arte.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black text-orange-600 uppercase tracking-tighter">Nuestra Visión</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ser la empresa líder en diseño publicitario y decoración de interiores en Bolivia, reconocida por nuestra creatividad disruptiva, calidad impecable y por inspirar a las personas a través del diseño.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Lo que nos define</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase">Nuestros Valores</h2>
            <div className="h-2 w-24 bg-orange-600 mx-auto mt-6 rounded-full" />
          </div>

          <div className="values-grid grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
            {[
              { 
                icon: Heart, 
                title: 'Pasión', 
                desc: 'Amamos lo que hacemos y eso se refleja en cada detalle de nuestro trabajo.' 
              },
              { 
                icon: ShieldCheck, 
                title: 'Calidad', 
                desc: 'No comprometemos la excelencia. Utilizamos solo los mejores materiales del mercado.' 
              },
              { 
                icon: Award, 
                title: 'Innovación', 
                desc: 'Buscamos constantemente nuevas formas de sorprender y crear impacto visual.' 
              }
            ].map((value, i) => (
              <div key={i} className="value-card p-12 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors duration-300 group flex flex-col">
                <div className="mb-8 shrink-0">
                  <value.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-4">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8">
            ¿LISTO PARA <span className="text-orange-600">TRANSFORMAR</span> TU ESPACIO?
          </h2>
          <p className="text-gray-400 text-xl mb-12">
            Únete a los cientos de clientes que ya han confiado en la visión de Animarte.
          </p>
          <a 
            href="https://wa.link/hfnuto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-orange-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-700 transition-all shadow-2xl shadow-orange-900/20"
          >
            Contáctanos ahora
          </a>
        </div>
      </section>
    </div>
  );
}
