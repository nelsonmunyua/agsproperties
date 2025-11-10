import React, { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md py-4 px-6 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          [Your Logo Here]
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8">
            {['Home', 'About', 'Properties', 'Testimonials', 'Services', 'Contacts'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 py-2 text-base lg:text-lg"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 hover:-translate-y-0.5">
            Sign In
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-indigo-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <nav>
            <ul className="space-y-4">
              {['Home', 'About', 'Properties', 'Testimonials', 'Services', 'Contacts'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="block text-gray-700 hover:text-indigo-600 transition-colors duration-300 py-2 text-lg border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col space-y-3 mt-6">
            <button className="w-full py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300">
              Sign In
            </button>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  )
}