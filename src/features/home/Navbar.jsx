import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">AgsProperties</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Properties', 'About', 'Services', 'Contact'].map((item) => (
              <a 
                key={item}
                href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/signin">
              <button className="px-5 py-2.5 text-slate-700 font-semibold hover:text-emerald-600 transition-colors">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <nav className="px-4 py-4 space-y-2">
              {['Home', 'Properties', 'About', 'Services', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href="#"
                  className="block text-slate-700 font-medium py-2 border-b border-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="px-4 pb-4 flex flex-col gap-3">
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full py-3 text-slate-700 font-semibold border border-slate-300 rounded-lg">
                  Sign In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

