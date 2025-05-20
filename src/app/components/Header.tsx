"use client";

import Link from "next/link";
import { FC, useState } from "react";
import Image from "next/image";

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="relative max-w-6xl mx-auto px-4 py-8 flex items-center justify-between">
        {/* Centered Logo (absolute center on mobile) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/full_logo.png"
              width={128}
              height={64}
              alt="Dibs Chicago"
            />
          </Link>
        </div>

        {/* Desktop Navigation (Right side on desktop) */}
        <nav className="hidden md:flex items-center space-x-6 ml-auto">
          <Link
            href="/events"
            className="text-gray-800 hover:text-red-600 transition"
          >
            Events
          </Link>
          <button
            onClick={() =>
              (
                window as unknown as Window & {
                  openSubscriptionModal: () => void;
                }
              ).openSubscriptionModal?.()
            }
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-medium"
          >
            Sign Up Now
          </button>
        </nav>

        {/* Mobile Menu Button (right side) */}
        <div className="md:hidden ml-auto">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-t">
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="block text-gray-800 hover:text-red-600 transition py-1"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="block text-gray-800 hover:text-red-600 transition py-1"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="block text-gray-800 hover:text-red-600 transition py-1"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="block text-gray-800 hover:text-red-600 transition py-1"
                >
                  FAQ
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="#signup"
                  className="block w-full text-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium"
                >
                  Sign Up Now
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
