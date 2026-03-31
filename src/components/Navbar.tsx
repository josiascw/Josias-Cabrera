import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User, LayoutDashboard, Calculator, Flower2, Megaphone, Menu, X, Ruler, Sparkles, Instagram, Facebook, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const services = [
    { name: 'Empapelados', path: '/empapelados', icon: Flower2 },
    { name: 'Publicidad', path: '/publicidad', icon: Megaphone },
  ];

  const navLinks = [
    { name: 'Nuevos Modelos', path: '/nuevos-modelos', icon: Sparkles },
    { name: 'Medir Pared', path: '/medir-pared', icon: Ruler },
  ];

  const socialLinks = [
    { 
      name: 'TikTok', 
      url: 'https://www.tiktok.com/@animartepublicidad', 
      icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    },
    { name: 'Instagram', url: 'https://www.instagram.com/animartebolivia/?hl=es-la', icon: Instagram },
    { name: 'Facebook', url: 'https://www.facebook.com/AnimarteBolivia?locale=es_LA', icon: Facebook },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-orange-600 tracking-tighter">ANIMARTE</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publicidad</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/nuevos-modelos"
              className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Nuevos Modelos
            </Link>

            {/* Servicios Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
              >
                Servicios
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      to={service.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/medir-pared"
              className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Medir Pared
            </Link>

            <Link
              to="/sobre-nosotros"
              className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sobre Nosotros
            </Link>

            <div className="flex items-center gap-3 ml-2 border-l border-gray-100 pl-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-orange-600 transition-colors"
                  title={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2" />

            {user && (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-900">{user.email}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{user.role}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Cerrar Sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-orange-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 p-4 space-y-2">
          <Link
            to="/nuevos-modelos"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
          >
            Nuevos Modelos
          </Link>

          {/* Mobile Servicios Accordion */}
          <div className="space-y-1">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
            >
              Servicios
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isServicesOpen && (
              <div className="pl-6 space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.path}
                    onClick={() => {
                      setIsOpen(false);
                      setIsServicesOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/medir-pared"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
          >
            Medir Pared
          </Link>

          <Link
            to="/sobre-nosotros"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
          >
            Sobre Nosotros
          </Link>

          <div className="flex items-center gap-6 px-3 py-4 border-t border-gray-50">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-orange-600 transition-colors"
                title={social.name}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-2 mt-2">
            {user && (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-bold text-orange-600 hover:bg-orange-50"
                  >
                    Panel Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
