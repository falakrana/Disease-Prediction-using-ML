// "use client"

// import { useState } from "react"
// import { Link } from "react-router-dom"
// import LoadingSpinner from "../components/LoadingSpinner"

// const SignIn = ({ login }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [errors, setErrors] = useState({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [apiError, setApiError] = useState("")

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })

//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       })
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     setIsLoading(true)
//     setApiError("")

//     try {
//       const response = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to sign in")
//       }

//       // Call the login function from App.jsx to set authentication state
//       login(data.token, data.user)
//     } catch (error) {
//       setApiError(error.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="auth-container">
//       <h1 className="auth-title">Sign In</h1>

//       {apiError && (
//         <div className="error-message" style={{ marginBottom: "20px", textAlign: "center" }}>
//           {apiError}
//         </div>
//       )}

//       <form className="auth-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="form-control"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//           />
//           {errors.email && <div className="error-message">{errors.email}</div>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="form-control"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//           />
//           {errors.password && <div className="error-message">{errors.password}</div>}
//         </div>

//         <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={isLoading}>
//           {isLoading ? <LoadingSpinner size="small" /> : "Sign In"}
//         </button>
//       </form>

//       <div className="auth-footer">
//         Don't have an account? <Link to="/signup">Sign Up</Link>
//       </div>
//     </div>
//   )
// }

// export default SignIn




"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const SignIn = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  setIsLoading(true);
  setApiError('');
  
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to sign in');
    }
    
    // Call the login function from App.jsx to set authentication state
    login(data.token, data.user);
    
  } catch (error) {
    setApiError(error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="auth-container">
      <h1 className="auth-title">Sign In</h1>

      {apiError && (
        <div className="error-message" style={{ marginBottom: "20px", textAlign: "center" }}>
          {apiError}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="small" /> : "Sign In"}
        </button>
      </form>

      <div className="auth-footer">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default SignIn
