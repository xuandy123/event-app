import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/full_logo.png"
                width={128}
                height={64}
                alt="Dibs Chicago"
              />
            </Link>
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
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
