import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Info + Social */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-2">Studdy</h2>
          <p className="text-sm text-gray-400 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex gap-4 text-gray-400">
            <a href="#" aria-label="Twitter"><FaTwitter className="hover:text-white" /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF className="hover:text-white" /></a>
            <a href="#" aria-label="Instagram"><FaInstagram className="hover:text-white" /></a>
            <a href="#" aria-label="YouTube"><FaYoutube className="hover:text-white" /></a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-400">
            732 Despard St, Atlanta
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Phone: +1 234 567 890
          </p>
          <p className="text-sm text-gray-400">
            Email: arymail@gmail.com
          </p>
          <p className="text-sm text-gray-400">
            Hours: 08:00 - 17:00
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer">Home</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer">About</Link></li>
              <li><Link to="/faqs" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer">FAQs</Link></li>
              <li><Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer">Blog</Link></li>
              <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer">Contact</Link></li>
              <li><Link to="/help" onClick={() => window.scrollTo(0, 0)} className="hover:text-white cursor-pointer">Help Center</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
          <p className="text-sm text-gray-400 mb-4">
            Get updates on new courses and offers.
          </p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              required
              placeholder="Your Email"
              className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-12 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} ASK Project. All rights reserved. &nbsp;
        <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms & Services</a>
      </div>
    </footer>
  );
};

export default Footer;
