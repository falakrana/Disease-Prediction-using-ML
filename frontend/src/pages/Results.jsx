"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const Results = () => {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Get result from session storage
    const storedResult = sessionStorage.getItem("predictionResult")

    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult))
      } catch (err) {
        setError("Failed to load prediction results")
      }
    } else {
      setError("No prediction results found")
    }

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="prediction-container" style={{ textAlign: "center" }}>
        <LoadingSpinner size="large" />
        <p>Loading your results...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="prediction-container">
        <h1 className="prediction-title">Results</h1>
        <div className="error-message" style={{ textAlign: "center", marginBottom: "20px" }}>
          {error}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/predict" className="btn btn-primary">
            Start New Assessment
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="prediction-container">
      <h1 className="prediction-title">Assessment Results</h1>

      <div className="prediction-result">
        <h2 className="result-title">Prediction Result</h2>
        <p>
          <strong>Possible condition:</strong> {result.prediction}
        </p>
        <p>
          <strong>Confidence:</strong> {result.confidence}%
        </p>

        <div style={{ marginTop: "20px" }}>
          <strong>Recommendations:</strong>
          <ul style={{ marginTop: "10px" }}>
            {result.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "30px" }}>
          <strong>Disclaimer:</strong>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            This prediction is based on the symptoms you provided and should not be considered as a medical diagnosis.
            Please consult with a healthcare professional for proper diagnosis and treatment.
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="/predict" className="btn btn-secondary" style={{ marginRight: "15px" }}>
          Start New Assessment
        </Link>
        <button className="btn btn-primary" onClick={() => window.print()}>
          Print Results
        </button>
      </div>
    </div>
  )
}

export default Results

