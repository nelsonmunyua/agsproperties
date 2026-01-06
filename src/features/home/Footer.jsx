import React from 'react'
//import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20">
      <div className="container mx-auto px-6 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">AGS Property Services</h2>
            <p className="text-gray-400 mb-4">
              A trusted real estate firm dealing with land and houses for sale and rent across Kenya.
            </p>
            <p className="text-sm text-gray-500">1983-00621 Village Market, Kiambu, Kenya</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#Contact" className="hover:text-yellow-400 transition">Contact Us</a></li>
              <li><a href="#Properties" className="hover:text-yellow-400 transition">Properties</a></li>
              <li><a href="#About" className="hover:text-yellow-400 transition">About Us</a></li>
              <li><a href="#FAQ" className="hover:text-yellow-400 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 <a href="tel:+254700776777" className="hover:text-yellow-400">+254 700 77 67 77</a></li>
              <li>✉️ <a href="mailto:info@agsproperty.co.ke" className="hover:text-yellow-400">info@agsproperty.co.ke</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/agspropertyservicesltd2020/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 text-xl">📷</a>
              <a href="#" className="hover:text-yellow-400 text-xl">📘</a>
              <a href="#" className="hover:text-yellow-400 text-xl">🐦</a>
              <a href="#" className="hover:text-yellow-400 text-xl">💼</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} AGS Property Services. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
