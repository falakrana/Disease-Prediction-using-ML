"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar = ({ isAuthenticated, logout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <div className="logo-icon"></div>
          HealthPredict
        </Link>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className={`nav-link ${location.pathname === "/services" ? "active" : ""}`}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/resources" className={`nav-link ${location.pathname === "/resources" ? "active" : ""}`}>
              Resources
            </Link>
          </li>
        </ul>

        <div className={`auth-buttons ${mobileMenuOpen ? "active" : ""}`}>
          {isAuthenticated ? (
            <>
              <Link to="/predict" className="btn btn-secondary">
                Predict
              </Link>
              <button onClick={logout} className="btn btn-primary">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-secondary">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

