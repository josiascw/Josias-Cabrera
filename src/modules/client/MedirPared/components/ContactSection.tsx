import { MessageCircle } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 lg:py-32 animate-in fade-in slide-in-from-bottom-14 duration-700 delay-500">
      <div className="bg-gray-50 p-12 lg:p-20 rounded-[4rem] border border-gray-100 text-center space-y-10 relative overflow-hidden group">
        <div className="absolute -inset-10 bg-orange-600/5 blur-3xl group-hover:bg-orange-600/10 transition-all duration-1000" />
        <div className="relative space-y-4">
          <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] block">Soporte</span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            ¿Tienes dudas con <br />
            <span className="text-gray-400">tus medidas?</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed font-medium max-w-2xl mx-auto">
            Contáctanos por WhatsApp para asesoría personalizada. Te ayudamos a calcular los metros cuadrados exactos.
          </p>
        </div>
        <div className="relative flex justify-center">
          <a 
            href="https://wa.link/hfnuto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-green-500 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-green-600 transition-all shadow-2xl shadow-green-200 group"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Contactar Asesor
          </a>
        </div>
      </div>
    </section>
  )
}
