import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-copyright">
          © {currentYear} HealthPredict |{" "}
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/terms" className="footer-link">
            Terms of Service
          </Link>
        </div>

        <div className="footer-badges">
          <div className="badge">
            <span>HIPAA Compliant</span>
          </div>
          <div className="badge">
            <span>SSL Secure</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

