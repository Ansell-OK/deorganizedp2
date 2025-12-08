
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'News', id: 'news' },
    { label: 'Shows', id: 'shows' },
    { label: 'Events', id: 'events' },
    { label: 'Creators', id: 'creators' },
    { label: 'Market', id: 'home' } // Keeping Market as home placeholder for now
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-canvas/80 backdrop-blur-md border-borderSubtle py-4 shadow-sm'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => handleNavClick('home')}
        >
          <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-ink tracking-tight">
            De<span className="text-gold">organized</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                 currentPage === item.id 
                 ? 'text-gold' 
                 : 'text-inkLight hover:text-gold'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button 
             onClick={() => handleNavClick('dashboard')}
             className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
               currentPage === 'dashboard' ? 'text-gold' : 'text-ink hover:text-gold'
             }`}
          >
             <LayoutDashboard className="w-4 h-4" />
             Studio
          </button>
          <button 
            onClick={() => handleNavClick('user-profile')}
            className={`bg-white border hover:border-gold/50 hover:bg-surface px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm ${
              currentPage === 'user-profile' ? 'border-gold text-gold ring-1 ring-gold/20' : 'border-borderSubtle text-ink'
            }`}
          >
            <User className="w-4 h-4" />
            My Profile
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ink"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-canvas border-b border-borderSubtle p-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className={`text-lg font-medium text-left ${
                currentPage === item.id ? 'text-gold' : 'text-ink hover:text-gold'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-borderSubtle my-2" />
          <button
             onClick={() => handleNavClick('dashboard')}
             className={`text-lg font-medium text-left ${
               currentPage === 'dashboard' ? 'text-gold' : 'text-ink hover:text-gold'
             }`}
          >
             Creator Studio
          </button>
          <button
             onClick={() => handleNavClick('user-profile')}
             className={`text-lg font-medium text-left ${
               currentPage === 'user-profile' ? 'text-gold' : 'text-ink hover:text-gold'
             }`}
          >
             My Profile
          </button>
          
        </div>
      )}
    </nav>
  );
};
