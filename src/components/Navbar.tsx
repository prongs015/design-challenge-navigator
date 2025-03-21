
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-black">
          DesignChallenge
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'font-medium' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'font-medium' : ''}`}>
            About us
          </Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'font-medium' : ''}`}>
            Contact us
          </Link>
        </nav>
        
        <div className="hidden md:block">
          <Button asChild className="btn-primary">
            <Link to="/">Sign up</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-md animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="nav-link py-3 border-b border-gray-100">
              Home
            </Link>
            <Link to="/about" className="nav-link py-3 border-b border-gray-100">
              About us
            </Link>
            <Link to="/contact" className="nav-link py-3 border-b border-gray-100">
              Contact us
            </Link>
            <Button asChild className="btn-primary w-full mt-4">
              <Link to="/">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
