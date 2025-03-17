// "use client"

// import { useState, useEffect } from "react"
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"
// import Home from "./pages/Home"
// import About from "./pages/About"
// import Services from "./pages/Services"
// import Resources from "./pages/Resources"
// import SignIn from "./pages/SignIn"
// import SignUp from "./pages/SignUp"
// import Predict from "./pages/Predict"
// import Results from "./pages/Results"
// import "./App.css"

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Check if user is logged in (token exists in localStorage)
//     const token = localStorage.getItem("token")
//     if (token) {
//       // Validate token with backend
//       fetch("/api/validate-token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.valid) {
//             setIsAuthenticated(true)
//             setUser(data.user)
//           } else {
//             localStorage.removeItem("token")
//           }
//           setLoading(false)
//         })
//         .catch((err) => {
//           console.error("Error validating token:", err)
//           localStorage.removeItem("token")
//           setLoading(false)
//         })
//     } else {
//       setLoading(false)
//     }
//   }, [])

//   const login = (token, userData) => {
//     localStorage.setItem("token", token)
//     setIsAuthenticated(true)
//     setUser(userData)
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     setIsAuthenticated(false)
//     setUser(null)
//   }

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <Router>
//       <div className="app">
//         <Navbar isAuthenticated={isAuthenticated} logout={logout} />
//         <main className="main-content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/resources" element={<Resources />} />
//             <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SignIn login={login} />} />
//             <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp login={login} />} />
//             <Route path="/predict" element={isAuthenticated ? <Predict user={user} /> : <Navigate to="/signin" />} />
//             <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/signin" />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   )
// }

// export default App





"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Resources from "./pages/Resources"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Predict from "./pages/Predict"
import Results from "./pages/Results"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (token exists in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend
      fetch('http://localhost:5000/api/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error validating token:', err);
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token)
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setUser(null)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SignIn login={login} />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp login={login} />} />
            <Route path="/predict" element={isAuthenticated ? <Predict user={user} /> : <Navigate to="/signin" />} />
            <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/signin" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
