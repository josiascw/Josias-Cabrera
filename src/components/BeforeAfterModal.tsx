import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BeforeAfterSlider from './BeforeAfterSlider';

interface BeforeAfterModalProps {
  isOpen: boolean;
  onClose: () => void;
  beforeImage: string;
  afterImage: string;
  title?: string;
}

export default function BeforeAfterModal({ isOpen, onClose, beforeImage, afterImage, title }: BeforeAfterModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute top-6 right-6 z-10">
            <button 
              onClick={onClose}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl transition-colors border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
            {/* Slider Area */}
            <div className="flex-1 bg-gray-100 min-h-[400px]">
              <BeforeAfterSlider 
                beforeImage={beforeImage}
                afterImage={afterImage}
              />
            </div>

            {/* Info Area */}
            <div className="w-full lg:w-80 p-8 lg:p-12 flex flex-col justify-center bg-white">
              <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Transformación</span>
              <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-6">
                {title || 'Resultado Final'}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Desliza para apreciar el cambio radical en el ambiente. Nuestros empapelados de alta gama redefinen cada rincón de tu hogar.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-900">
                  <div className="w-2 h-2 rounded-full bg-orange-600" />
                  Instalación en el día
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-900">
                  <div className="w-2 h-2 rounded-full bg-orange-600" />
                  Sin obras ni suciedad
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-900">
                  <div className="w-2 h-2 rounded-full bg-orange-600" />
                  Garantía de satisfacción
                </div>
              </div>

              <button 
                onClick={onClose}
                className="mt-12 w-full py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-colors"
              >
                Cerrar Galería
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
