import { Ruler, Info, CheckCircle2 } from "lucide-react"

export default function MeasurementTips() {
  const tips = [
    {
      icon: Ruler,
      title: "Mide en 3 puntos",
      description: "Toma medidas arriba, medio y abajo. Usa la mayor para asegurar cobertura total."
    },
    {
      icon: Info,
      title: "Sin guardapolvos",
      description: "Mide desde el borde superior del guardapolvo hasta el techo."
    },
    {
      icon: CheckCircle2,
      title: "Doble chequeo",
      description: "Vuelve a medir una segunda vez para confirmar que los datos son correctos."
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid grid-cols-1 md:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
      {tips.map((tip, index) => (
        <div key={index} className="space-y-6 group">
          <div className="w-16 h-16 bg-orange-600/5 rounded-3xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
            <tip.icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">{tip.title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium">{tip.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
