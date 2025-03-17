// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import LoadingSpinner from "../components/LoadingSpinner"

// const commonSymptoms = [
//   "Fever",
//   "Cough",
//   "Fatigue",
//   "Shortness of breath",
//   "Headache",
//   "Sore throat",
//   "Muscle pain",
//   "Chills",
//   "Nausea",
//   "Vomiting",
//   "Diarrhea",
//   "Loss of taste",
//   "Loss of smell",
//   "Rash",
//   "Joint pain",
//   "Chest pain",
//   "Abdominal pain",
//   "Dizziness",
//   "Confusion",
// ]

// const Predict = ({ user }) => {
//   const [selectedSymptoms, setSelectedSymptoms] = useState([])
//   const [otherSymptoms, setOtherSymptoms] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [result, setResult] = useState(null)
//   const [error, setError] = useState("")
//   const navigate = useNavigate()

//   const handleSymptomToggle = (symptom) => {
//     if (selectedSymptoms.includes(symptom)) {
//       setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
//     } else {
//       setSelectedSymptoms([...selectedSymptoms, symptom])
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (selectedSymptoms.length === 0 && !otherSymptoms.trim()) {
//       setError("Please select at least one symptom")
//       return
//     }

//     setIsLoading(true)
//     setError("")

//     // Combine selected symptoms with other symptoms
//     const allSymptoms = [
//       ...selectedSymptoms,
//       ...otherSymptoms
//         .split(",")
//         .map((s) => s.trim())
//         .filter((s) => s),
//     ]

//     try {
//       const response = await fetch("/api/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ symptoms: allSymptoms }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to get prediction")
//       }

//       setResult(data)

//       // Store result in session storage to display on results page
//       sessionStorage.setItem("predictionResult", JSON.stringify(data))

//       // Navigate to results page
//       navigate("/results")
//     } catch (error) {
//       setError(error.message)
//       setResult(null)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="prediction-container">
//       <h1 className="prediction-title">Symptom Assessment</h1>

//       {error && (
//         <div className="error-message" style={{ marginBottom: "20px", textAlign: "center" }}>
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Select your symptoms:</label>
//           <div className="symptoms-grid">
//             {commonSymptoms.map((symptom) => (
//               <div key={symptom} className="symptom-checkbox">
//                 <input
//                   type="checkbox"
//                   id={symptom}
//                   checked={selectedSymptoms.includes(symptom)}
//                   onChange={() => handleSymptomToggle(symptom)}
//                 />
//                 <label htmlFor={symptom}>{symptom}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="otherSymptoms">Other symptoms (comma separated):</label>
//           <textarea
//             id="otherSymptoms"
//             className="form-control"
//             value={otherSymptoms}
//             onChange={(e) => setOtherSymptoms(e.target.value)}
//             placeholder="Enter any other symptoms separated by commas"
//             rows={3}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={isLoading}>
//           {isLoading ? <LoadingSpinner size="small" /> : "Get Prediction"}
//         </button>
//       </form>

//       {result && (
//         <div className="prediction-result">
//           <h2 className="result-title">Prediction Result</h2>
//           <p>
//             <strong>Possible condition:</strong> {result.prediction}
//           </p>
//           <p>
//             <strong>Confidence:</strong> {result.confidence}%
//           </p>
//           <div>
//             <strong>Recommendations:</strong>
//             <ul>
//               {result.recommendations.map((rec, index) => (
//                 <li key={index}>{rec}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Predict



"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const commonSymptoms = [
  "Fever",
  "Cough",
  "Fatigue",
  "Shortness of breath",
  "Headache",
  "Sore throat",
  "Muscle pain",
  "Chills",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Loss of taste",
  "Loss of smell",
  "Rash",
  "Joint pain",
  "Chest pain",
  "Abdominal pain",
  "Dizziness",
  "Confusion",
]

const Predict = ({ user }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [otherSymptoms, setOtherSymptoms] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSymptomToggle = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedSymptoms.length === 0 && !otherSymptoms.trim()) {
      setError('Please select at least one symptom');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    // Combine selected symptoms with other symptoms
    const allSymptoms = [
      ...selectedSymptoms,
      ...otherSymptoms.split(',').map(s => s.trim()).filter(s => s)
    ];
  
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ symptoms: allSymptoms })
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get prediction');
      }
    
      setResult(data);
    
      // Store result in session storage to display on results page
      sessionStorage.setItem('predictionResult', JSON.stringify(data));
    
      // Navigate to results page
      navigate('/results');
    
    } catch (error) {
      setError(error.message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <h1 className="prediction-title">Symptom Assessment</h1>

      {error && (
        <div className="error-message" style={{ marginBottom: "20px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select your symptoms:</label>
          <div className="symptoms-grid">
            {commonSymptoms.map((symptom) => (
              <div key={symptom} className="symptom-checkbox">
                <input
                  type="checkbox"
                  id={symptom}
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                />
                <label htmlFor={symptom}>{symptom}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="otherSymptoms">Other symptoms (comma separated):</label>
          <textarea
            id="otherSymptoms"
            className="form-control"
            value={otherSymptoms}
            onChange={(e) => setOtherSymptoms(e.target.value)}
            placeholder="Enter any other symptoms separated by commas"
            rows={3}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="small" /> : "Get Prediction"}
        </button>
      </form>

      {result && (
        <div className="prediction-result">
          <h2 className="result-title">Prediction Result</h2>
          <p>
            <strong>Possible condition:</strong> {result.prediction}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}%
          </p>
          <div>
            <strong>Recommendations:</strong>
            <ul>
              {result.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Predict
