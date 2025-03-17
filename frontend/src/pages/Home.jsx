"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading for demo purposes
  setTimeout(() => {
    setIsLoading(false)
  }, 1500)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content">
          <h1 className="hero-title">Predict. Prevent. Protect</h1>
          <h2 className="hero-subtitle">Advanced disease prediction using AI and medical data</h2>
          <Link to="/predict" className="btn btn-primary">
            Start Assessment
          </Link>
        </div>
        <div className="hero-animation">
          {isLoading ? (
            <LoadingSpinner size="large" />
          ) : (
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="AI-powered health analysis"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon symptom">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 4V20M4 12H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Symptom Analysis</h3>
              <p className="feature-description">Analyze your symptoms with our advanced AI system</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon risk">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.4 12.9C20.4 17.3 16.8 20.9 12.4 20.9C8 20.9 4.4 17.3 4.4 12.9C4.4 8.5 8 4.9 12.4 4.9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.4 8.9V12.9L14.4 14.9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 4.9L15.4 8.9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.4 4.9V8.9H19.4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Risk Assessment</h3>
              <p className="feature-description">Get personalized health risk evaluations</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon prevention">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Prevention Tips</h3>
              <p className="feature-description">Receive customized prevention strategies</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

