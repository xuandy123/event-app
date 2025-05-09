import React from "react";
import Link from "next/link";
import { APP_NAME } from "../constants";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">{APP_NAME}</h2>
          </div>

          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center sm:text-left">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>
            <p>© 2025 {APP_NAME}. All rights reserved.</p>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
