import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Megaphone, Calculator, ArrowRight, Star, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
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
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              DISEÑO QUE <br />
              <span className="text-orange-600">IMPULSA</span> TU <br />
              NEGOCIO
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
              Soluciones creativas en publicidad y estilo para marcas que buscan destacar en un mercado competitivo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/publicidad" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-orange-900/20 flex items-center gap-2"
              >
                Ver Publicidad
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/estilos" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all"
              >
                Explorar Estilos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              title: 'Estilos', 
              desc: 'Diseño de identidad, branding y estética visual.', 
              icon: Palette, 
              color: 'bg-purple-600',
              path: '/estilos'
            },
            { 
              title: 'Publicidad', 
              desc: 'Campañas, impresiones y material POP.', 
              icon: Megaphone, 
              color: 'bg-blue-600',
              path: '/publicidad'
            },
          ].map((item) => (
            <Link 
              key={item.title} 
              to={item.path}
              className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`${item.color} w-16 h-16 rounded-3xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight uppercase">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              <div className="mt-6 flex items-center text-gray-900 font-bold gap-2 group-hover:text-orange-600 transition-colors">
                Explorar <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">¿Por qué elegirnos?</h2>
            <div className="h-1.5 w-16 bg-orange-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: 'Rapidez', desc: 'Entregas en tiempo récord sin sacrificar calidad.' },
              { icon: Star, title: 'Calidad Premium', desc: 'Materiales y diseños de alto impacto visual.' },
              { icon: Shield, title: 'Garantía', desc: 'Respaldo total en cada uno de nuestros trabajos.' },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-6">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
