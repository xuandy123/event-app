import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
          <span className="text-xl font-bold text-gray-800">EventAlert</span>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#features" className="text-gray-600 hover:text-purple-600 transition">Features</Link></li>
            <li><Link href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition">How It Works</Link></li>
            <li><Link href="#subscribe" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">Subscribe</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;