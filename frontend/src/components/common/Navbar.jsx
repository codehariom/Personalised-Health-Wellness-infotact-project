import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
        pathname === to
          ? "bg-emerald-600 text-white shadow-sm"
          : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center h-16">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-emerald-700 tracking-tight hover:scale-105 transition-transform"
        >
          Wellness & <span className="text-emerald-500">Fitness</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-1">
          <NavLink to="/">Home</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/data-input">Data Input</NavLink>
              <NavLink to="/community">Community</NavLink>
              <NavLink to="/gamification">Gamification</NavLink>
              <NavLink to="/notifications">Notifications</NavLink>
            </>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <button
              onClick={logout}
              className="px-5 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 hover:shadow-md transition-all"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-emerald-600 text-emerald-700 rounded-full font-medium hover:bg-emerald-50 hover:shadow-sm transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 hover:shadow-md transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-emerald-700 rounded-md hover:bg-emerald-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <span className="text-xl">✖</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-emerald-100 animate-slideDown">
          <div className="flex flex-col px-5 py-4 space-y-2">
            <NavLink to="/">Home</NavLink>
            {user && (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/data-input">Data Input</NavLink>
                <NavLink to="/community">Community</NavLink>
                <NavLink to="/gamification">Gamification</NavLink>
                <NavLink to="/notifications">Notifications</NavLink>
              </>
            )}

            <div className="border-t border-gray-200 pt-3 flex flex-col space-y-2">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 font-medium transition-all"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-2 border border-emerald-600 text-emerald-700 rounded-full font-medium hover:bg-emerald-50 transition-all text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-all text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}