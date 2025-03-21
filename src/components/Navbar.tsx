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
  return <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-6 flex items-center justify-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <Link to="/" className="text-black font-medium">
              Home
              
            </Link>
          </div>
          
          <Link to="/about" className="text-black">
            About us
          </Link>
          
          <Link to="/contact" className="text-black">
            Contact us
          </Link>
        </nav>
        
        <div className="hidden md:block absolute right-10">
          <Button asChild className="bg-black rounded-full px-6 py-2 text-white hover:bg-black/90">
            <Link to="/">Sign up</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-black absolute right-4" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-md animate-fadeIn">
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
            <Button asChild className="bg-black rounded-full w-full mt-4 text-white">
              <Link to="/">Sign up</Link>
            </Button>
          </div>
        </div>}
    </header>;
};
export default Navbar;