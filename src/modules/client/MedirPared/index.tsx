import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import Hero from "./components/Hero"
import MeasurementGuide from "./components/MeasurementGuide"
import MeasurementTips from "./components/MeasurementTips"
import ContactSection from "./components/ContactSection"

export default function MedirPared() {
  return (
    <div className="w-full min-h-screen bg-white font-sans">
      {/* Header Minimalista */}
      <header className="border-b border-gray-100 py-6 px-6 sm:px-12 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-[10px] text-gray-400">Volver al inicio</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">Guía de <span className="text-orange-600">Medición</span></span>
          </div>
          <div className="w-24"></div> {/* Spacer */}
        </div>
      </header>

      <main>
        <Hero />
        <MeasurementGuide />
        <MeasurementTips />
        <ContactSection />
      </main>

      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.5em]">Animarte © 2026</p>
      </footer>
    </div>
  )
}
