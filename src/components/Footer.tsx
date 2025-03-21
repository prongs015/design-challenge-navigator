
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold tracking-tight text-black">
              DesignChallenge
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Master your design whiteboard challenges with real-world scenarios from top tech companies.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-black transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-black transition-colors">Terms</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-black transition-colors">Privacy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-black transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DesignChallenge. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-black transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
