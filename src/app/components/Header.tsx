"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { APP_NAME } from "../constants";

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="">
          <Link href={"/"} className="flex items-center space-x-2">
            <div className="text-red-600 w-6 h-6">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-xl font-bold">{APP_NAME}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                href="/events"
                className="text-gray-800 hover:text-red-600 transition"
              >
                Events
              </Link>
            </li>
            <button
              onClick={() =>
                (
                  window as unknown as Window & {
                    openSubscriptionModal: () => void;
                  }
                ).openSubscriptionModal?.()
              }
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-medium hover:cursor-pointer"
            >
              Sign Up Now
            </button>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
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
