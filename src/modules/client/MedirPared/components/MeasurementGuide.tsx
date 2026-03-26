import { Download } from "lucide-react"

export default function MeasurementGuide() {
  const wallTypes = [
    {
      title: "Pared Simple",
      description: <>Mide el <b>ancho y el alto total</b> del muro, de un extremo al otro, sin tomar en cuenta los guardapolvos.</>,
      visual: (
        <svg width="200" height="220" viewBox="0 0 200 220" className="max-w-full h-auto">
          <defs>
            <marker id="dot" markerWidth="4" markerHeight="4" refX="2" refY="2">
              <circle cx="2" cy="2" r="2" fill="black" />
            </marker>
          </defs>
          <rect x="20" y="30" width="160" height="170" fill="#e67e51" />
          <line x1="20" y1="20" x2="180" y2="20" stroke="black" strokeWidth="1" markerStart="url(#dot)" markerEnd="url(#dot)"/>
          <text x="100" y="15" textAnchor="middle" fontSize="12" fontWeight="bold">ancho</text>
          <text x="10" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" transform="rotate(-90, 10, 115)">alto</text>
        </svg>
      )
    },
    {
      title: "Pared con diferentes alturas",
      description: <>Mide el ancho del muro y el <b>alto de cada parte</b> que tenga distinta altura. Debes medir cada una para calcular los metros cuadrados.</>,
      visual: (
        <svg width="200" height="220" viewBox="0 0 200 220" className="max-w-full h-auto">
          <path d="M20,60 L100,20 L180,60 L180,200 L20,200 Z" fill="#e67e51" />
          <text x="100" y="110" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">alto</text>
          <text x="100" y="215" textAnchor="middle" fontSize="12" fontWeight="bold">ancho</text>
        </svg>
      )
    },
    {
      title: "Pared con puerta",
      description: <>Mide el ancho y el alto de <b>cada sector del muro</b> (A, B y C), de un extremo al otro, sin tomar en cuenta los guardapolvos.</>,
      visual: (
        <svg width="200" height="200" viewBox="0 0 200 200" className="max-w-full h-auto">
          <rect x="10" y="20" width="50" height="160" fill="#e67e51" />
          <rect x="65" y="20" width="70" height="50" fill="#e67e51" />
          <rect x="140" y="20" width="50" height="160" fill="#e67e51" />
          <text x="35" y="100" textAnchor="middle" fontSize="14" fill="white" fontWeight="black">A</text>
          <text x="100" y="50" textAnchor="middle" fontSize="14" fill="white" fontWeight="black">B</text>
          <text x="165" y="100" textAnchor="middle" fontSize="14" fill="white" fontWeight="black">C</text>
        </svg>
      )
    },
    {
      title: "Pared con ventana",
      description: <>Mide el ancho y alto de cada parte (A, B, C, D y E). En el sector E, mide el <b>ancho del interior</b> de la ventana.</>,
      visual: (
        <svg width="200" height="200" viewBox="0 0 200 200" className="max-w-full h-auto">
          <rect x="10" y="10" width="180" height="180" fill="#e67e51" />
          <rect x="60" y="60" width="80" height="80" fill="white" stroke="#e67e51" strokeWidth="2" />
          <text x="35" y="100" textAnchor="middle" fontSize="14" fill="white" fontWeight="black">A</text>
          <text x="100" y="35" textAnchor="middle" fontSize="14" fill="white" fontWeight="black">B</text>
          <text x="165" y="100" textAnchor="middle" fontSize="14" fill="white" fontWeight="black">C</text>
          <text x="100" y="170" textAnchor="middle" fontSize="14" fill="white" fontWeight="black">D</text>
          <text x="100" y="105" textAnchor="middle" fontSize="14" fill="#e67e51" fontWeight="black">E</text>
        </svg>
      )
    }
  ]

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 lg:py-24 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
        {wallTypes.map((wall, index) => (
          <div key={index} className="flex flex-col group">
            <div className="bg-gray-50/50 p-10 rounded-[2.5rem] mb-8 flex justify-center items-center border border-transparent group-hover:border-orange-100 group-hover:bg-orange-50/30 transition-all duration-500">
              {wall.visual}
            </div>
            <div className="space-y-3">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 inline-block border-b-2 border-orange-600 pb-1">
                {wall.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {wall.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 flex flex-col items-center gap-8">
        <div className="h-px w-24 bg-gray-100" />
        <a 
          href="/assets/guia-medidas.png" 
          download 
          className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-2xl shadow-gray-200 group"
        >
          <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          Descargar Guía Completa
        </a>
      </div>
    </section>
  )
}
