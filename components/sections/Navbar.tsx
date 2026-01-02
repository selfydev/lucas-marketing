"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex h-[60px] w-[560px] items-center rounded-[12px] px-[12px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.18))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-[4px] transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#1B1D1E' }}
            aria-label="Lucas AI Home"
          >
            <img
              src="/images/logo.svg"
              alt="Lucas Logo"
              width={14}
              height={20}
              className="object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <div className="mx-[16px] flex flex-1 items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-white transition-opacity hover:opacity-80 focus:outline-none"
                tabIndex={0}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Sign Up & Login */}
          <div className="flex flex-shrink-0 items-center gap-4">
            <Link
              href="#signup"
              className="text-[13px] font-bold text-white transition-opacity hover:opacity-80"
              tabIndex={0}
            >
              Sign up
            </Link>
            <Link
              href="#login"
              className="flex h-[36px] items-center justify-center rounded-[4px] px-6 text-[13px] font-bold text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#FFFFFF' }}
              tabIndex={0}
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Bar */}
        <nav
          className="flex md:hidden h-[52px] w-full max-w-[400px] items-center justify-between rounded-[12px] px-[12px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.18))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
          aria-label="Mobile navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-[4px] transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#1B1D1E' }}
            aria-label="Lucas AI Home"
          >
            <img
              src="/images/logo.svg"
              alt="Lucas Logo"
              width={12}
              height={17}
              className="object-contain"
            />
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] transition-all duration-300 hover:bg-white/10"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 h-[2px] w-5 rounded-full bg-white transition-all duration-300 ease-out ${
                  isMenuOpen ? 'top-[7px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-white transition-all duration-300 ease-out ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 rounded-full bg-white transition-all duration-300 ease-out ${
                  isMenuOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full Screen Mobile Menu - Swipes in from top */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Header with Logo, Buttons, and Close */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-7">
          {/* Logo - Fades in */}
          <Link
            href="/"
            onClick={closeMenu}
            className={`flex h-[36px] w-[36px] items-center justify-center rounded-[4px] transition-all duration-500 ease-out ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundColor: '#1B1D1E',
              transitionDelay: isMenuOpen ? '300ms' : '0ms'
            }}
          >
            <img
              src="/images/logo.svg"
              alt="Lucas Logo"
              width={14}
              height={20}
              className="object-contain"
            />
          </Link>

          {/* Right side - Sign Up, Login, Close */}
          <div 
            className={`flex items-center gap-4 transition-all duration-500 ease-out ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
          >
            <Link
              href="#signup"
              onClick={closeMenu}
              className="text-[15px] font-bold text-gray-900 transition-opacity hover:opacity-70"
            >
              Sign up
            </Link>
            <Link
              href="#login"
              onClick={closeMenu}
              className="flex h-[42px] items-center justify-center rounded-[6px] px-6 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#1B1D1E' }}
            >
              Login
            </Link>
            
            {/* Close Button */}
            <button
              onClick={closeMenu}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[6px] transition-all duration-300 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Centered Navigation Links - both horizontally and vertically */}
        <div className="absolute inset-0 flex items-center justify-center">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`text-[44px] text-gray-900 transition-all ease-out hover:opacity-70 ${
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100 blur-0' 
                    : '-translate-x-16 opacity-0 blur-md'
                }`}
                style={{ 
                  fontFamily: "'HW Cigar', serif",
                  transitionDelay: isMenuOpen ? `${350 + index * 150}ms` : `${(navLinks.length - 1 - index) * 80}ms`,
                  letterSpacing: '-0.02em',
                  transitionDuration: '700ms'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer - Swipes in from bottom last */}
        <div 
          className={`absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 pb-8 transition-all duration-700 ease-out ${
            isMenuOpen 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: isMenuOpen ? '800ms' : '0ms' }}
        >
          {/* Copyright Text - Left */}
          <p className="text-sm text-gray-400" style={{ fontFamily: '"HW Cigar"' }}>
            © Lucas {new Date().getFullYear()}
          </p>

          {/* Social Links - Right */}
          <div className="flex items-center gap-5">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-200 hover:text-gray-900"
              aria-label="Twitter"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-200 hover:text-gray-900"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
