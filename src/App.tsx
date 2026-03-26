import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './modules/auth/LoginForm';
import RegisterForm from './modules/auth/RegisterForm';
import AdminDashboard from './modules/admin/AdminDashboard';
import ProductCatalog from './modules/client/ProductCatalog';
import StylesPage from './modules/client/StylesPage';
import PublicityPage from './modules/client/PublicityPage';
import Home from './modules/client/Home';
import MedirPared from './modules/client/MedirPared';
import { Loader2 } from 'lucide-react';

export default function App() {
  const { refreshProfile, initialized } = useAuthStore();

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Animarte Logo" className="w-16 h-16 mb-4 object-contain animate-pulse" referrerPolicy="no-referrer" />
          <Loader2 className="w-8 h-8 text-orange-600 animate-spin mb-4" />
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Cargando Animarte...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/estilos" element={<StylesPage />} />
            <Route path="/estilos/catalogo" element={<ProductCatalog type="estilo" />} />
            <Route path="/publicidad" element={<PublicityPage />} />
            <Route path="/publicidad/catalogo" element={<ProductCatalog type="publicidad" />} />
            <Route path="/medir-pared" element={<MedirPared />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6 gap-2">
                  <img src="/logo.png" alt="Animarte Logo" className="h-12 w-12 object-contain" referrerPolicy="no-referrer" />
                  <div className="flex flex-col leading-none">
                    <span className="text-2xl font-black text-orange-600 tracking-tighter">ANIMARTE</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publicidad</span>
                  </div>
                </div>
                <p className="text-gray-400 max-w-sm leading-relaxed">
                  Transformamos tus ideas en realidades visuales. Expertos en diseño publicitario, branding y soluciones creativas para tu negocio.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-600">Enlaces</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link to="/estilos" className="hover:text-white transition-colors">Estilos</Link></li>
                  <li><Link to="/publicidad" className="hover:text-white transition-colors">Publicidad</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-600">Contacto</h4>
                <ul className="space-y-4 text-gray-400">
                  <li>info@animarte.com</li>
                  <li>
                    <a href="https://wa.link/hfnuto" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      WhatsApp: +1 234 567 890
                    </a>
                  </li>
                  <li>Ciudad de México, MX</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Animarte Publicidad. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
