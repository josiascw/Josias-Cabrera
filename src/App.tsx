import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './modules/admin/AdminDashboard';
import ProductCatalog from './modules/client/ProductCatalog';
import WallpapersPage from './modules/client/WallpapersPage';
import WallpaperCategoryPage from './modules/client/WallpaperCategoryPage';
import PublicityPage from './modules/client/PublicityPage';
import PortfolioPage from './modules/client/PortfolioPage';
import Home from './modules/client/Home';
import MedirPared from './modules/client/MedirPared';
import NewModelsPage from './modules/client/NewModelsPage';
import AboutUsPage from './modules/client/AboutUsPage';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const { refreshProfile, initialized } = useAuthStore();

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/empapelados" element={<WallpapersPage />} />
            <Route path="/empapelados/:categoryId" element={<WallpaperCategoryPage />} />
            <Route path="/publicidad" element={<PublicityPage />} />
            <Route path="/publicidad/catalogo" element={<ProductCatalog type="publicidad" />} />
            <Route path="/publicidad/portafolio/:category" element={<PortfolioPage />} />
            <Route path="/medir-pared" element={<MedirPared />} />
            <Route path="/nuevos-modelos" element={<NewModelsPage />} />
            <Route path="/sobre-nosotros" element={<AboutUsPage />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <WhatsAppButton />
        
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6 gap-2">
                  <div className="flex flex-col leading-none">
                    <span className="text-2xl font-black text-orange-600 tracking-tighter">ANIMARTE</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publicidad</span>
                  </div>
                </div>
                <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
                  Transformamos tus ideas en realidades visuales. Expertos en diseño publicitario, branding y soluciones creativas para tu negocio.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.tiktok.com/@animartepublicidad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-gray-400 hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/animartebolivia/?hl=es-la" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-gray-400 hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/AnimarteBolivia?locale=es_LA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-gray-400 hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-600">Enlaces</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link to="/empapelados" className="hover:text-white transition-colors">Empapelados</Link></li>
                  <li><Link to="/publicidad" className="hover:text-white transition-colors">Publicidad</Link></li>
                  <li><Link to="/nuevos-modelos" className="hover:text-white transition-colors">Nuevos Modelos</Link></li>
                  <li><Link to="/sobre-nosotros" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-orange-600">Contacto</h4>
                <ul className="space-y-4 text-gray-400">
                  <li>info@animartepublicidad.com</li>
                  <li>
                    <a href="https://wa.me/59179480188" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      WhatsApp: +591 79480188
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/f4EKSu5ixnf6Tj9c7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      Santa Cruz de la Sierra, Bolivia
                    </a>
                  </li>
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
