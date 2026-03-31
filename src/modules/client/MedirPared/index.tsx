import Hero from "./components/Hero"
import MeasurementGuide from "./components/MeasurementGuide"
import MeasurementTips from "./components/MeasurementTips"
import ContactSection from "./components/ContactSection"

export default function MedirPared() {
  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <main>
        <Hero />
        <MeasurementGuide />
        <MeasurementTips />
        <ContactSection />
      </main>
    </div>
  )
}
