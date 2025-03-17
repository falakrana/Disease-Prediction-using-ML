const About = () => {
    return (
      <div className="container" style={{ padding: "60px 0" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>About HealthPredict</h1>
  
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Our Mission</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              HealthPredict is dedicated to making healthcare more accessible and proactive through advanced AI
              technology. Our mission is to empower individuals with the knowledge and tools they need to make informed
              decisions about their health.
            </p>
          </section>
  
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>How It Works</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "20px" }}>
              Our disease prediction system uses machine learning algorithms trained on vast amounts of medical data to
              identify potential health conditions based on symptoms. Here's how it works:
            </p>
  
            <ol style={{ fontSize: "1.1rem", lineHeight: "1.6", paddingLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Input your symptoms</strong> - Tell us what you're experiencing through our user-friendly
                interface.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>AI analysis</strong> - Our advanced algorithms analyze your symptoms and compare them with
                thousands of medical cases.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Receive predictions</strong> - Get a list of potential conditions that match your symptoms, along
                with confidence levels.
              </li>
              <li>
                <strong>Personalized recommendations</strong> - Receive tailored advice on next steps, including when to
                seek medical attention.
              </li>
            </ol>
          </section>
  
          <section>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Our Team</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "20px" }}>
              HealthPredict was founded by a team of healthcare professionals, data scientists, and technology experts
              committed to improving healthcare outcomes through innovation.
            </p>
  
            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
              {["Medical Director", "Chief Data Scientist", "Technology Lead", "User Experience Designer"].map((role) => (
                <div
                  key={role}
                  style={{
                    width: "200px",
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "#e8f0fe",
                      margin: "0 auto 15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                    }}
                  >
                    {role[0]}
                  </div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>{role}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }
  
  export default About
  
  