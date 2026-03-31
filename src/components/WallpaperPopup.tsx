import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface WallpaperPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const newModels = [
  {
    id: 1,
    name: 'Bosque Minimalista',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80',
    tag: 'NUEVO'
  },
  {
    id: 2,
    name: 'Geométrico Ámbar',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80',
    tag: 'TENDENCIA'
  }
];

export default function WallpaperPopup({ isOpen, onClose }: WallpaperPopupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.from('.popup-content', {
        y: 40,
        opacity: 0,
        duration: 0.4, // Reduced from 0.8
        ease: 'power3.out'
      })
      .from('.popup-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.2, // Reduced from 0.4
        ease: 'back.out(1.7)'
      }, '-=0.2')
      .from('.popup-title', {
        y: 20,
        opacity: 0,
        duration: 0.3, // Reduced from 0.6
        ease: 'power2.out'
      }, '-=0.15')
      .from('.popup-model-card', {
        x: 30,
        opacity: 0,
        duration: 0.3, // Reduced from 0.6
        stagger: 0.05, // Reduced from 0.1
        ease: 'power2.out'
      }, '-=0.2');

      // Floating icon animation
      gsap.to('.popup-sparkle', {
        rotate: 360,
        duration: 8,
        repeat: -1,
        ease: 'none'
      });
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} // Reduced from 0.8
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-gray-900 hover:bg-orange-600 hover:text-white transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="popup-content p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -top-10 -left-10 opacity-5 popup-sparkle">
                  <Sparkles className="w-40 h-40 text-orange-600" />
                </div>
                <span className="popup-badge text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Lanzamiento</span>
                <h2 className="popup-title text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-6">
                  Nuevos <br />
                  <span className="text-gray-400">Modelos</span>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Descubre nuestra última colección de lanzamientos exclusivos. Diseños modulares y vanguardistas para transformar tus espacios.
                </p>
                <Link
                  to="/nuevos-modelos"
                  onClick={onClose}
                  className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all group"
                >
                  Ver Nuevos Modelos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-2 p-2 bg-gray-50">
                {newModels.map((model) => (
                  <div key={model.id} className="popup-model-card relative aspect-[4/3] rounded-2xl overflow-hidden group">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                      <span className="text-[9px] font-black bg-orange-600 text-white px-2 py-0.5 rounded w-fit mb-1 tracking-widest">
                        {model.tag}
                      </span>
                      <span className="text-white font-bold text-sm uppercase tracking-tight">
                        {model.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
