import React from 'react';

interface LoadingScreenProps {
  fullScreen?: boolean;
}

export default function LoadingScreen({ fullScreen = true }: LoadingScreenProps) {
  const containerClasses = fullScreen 
    ? "flex items-center justify-center min-h-screen bg-white"
    : "flex items-center justify-center py-20 w-full";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center scale-75 md:scale-100">
        <div className="in-and-out mb-12">
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {fullScreen && (
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-black text-orange-600 tracking-tighter">ANIMARTE</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Cargando Experiencia...</span>
          </div>
        )}
      </div>
    </div>
  );
}
