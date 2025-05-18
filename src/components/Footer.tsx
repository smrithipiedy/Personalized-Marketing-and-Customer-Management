import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">Personify</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Personalized marketing solutions powered by AI to enhance your customer engagement.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/preferences" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Preferences
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  AI Chatbot
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Newsletter</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Personify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;