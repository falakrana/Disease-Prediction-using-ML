"use client"

const Services = () => {
  const services = [
    {
      title: "Disease Prediction",
      description:
        "Our core service uses AI to analyze your symptoms and predict potential health conditions with high accuracy.",
      icon: "🔍",
    },
    {
      title: "Health Risk Assessment",
      description:
        "Get a comprehensive evaluation of your health risks based on your medical history, lifestyle, and genetic factors.",
      icon: "📊",
    },
    {
      title: "Personalized Health Plans",
      description:
        "Receive customized health recommendations and prevention strategies tailored to your specific needs.",
      icon: "📝",
    },
    {
      title: "Telemedicine Consultations",
      description: "Connect with healthcare professionals for virtual consultations based on your prediction results.",
      icon: "👨‍⚕️",
    },
    {
      title: "Health Monitoring",
      description: "Track your health metrics over time and receive alerts about potential concerns.",
      icon: "📱",
    },
    {
      title: "Medical Research Participation",
      description: "Opt-in to contribute anonymized data to advance medical research and improve healthcare outcomes.",
      icon: "🔬",
    },
  ]

  return (
    <div className="container" style={{ padding: "60px 0" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "15px", textAlign: "center" }}>Our Services</h1>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "50px",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto 50px",
        }}
      >
        HealthPredict offers a range of services designed to help you understand, monitor, and improve your health.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)"
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>{service.icon}</div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>{service.title}</h2>
            <p style={{ color: "var(--text-secondary)" }}>{service.description}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "60px",
          padding: "30px",
          borderRadius: "8px",
          backgroundColor: "#f0f4ff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Ready to get started?</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "30px", maxWidth: "600px", margin: "0 auto 30px" }}>
          Take the first step towards better health management with our AI-powered prediction tools.
        </p>
        <button className="btn btn-primary">Start Assessment</button>
      </div>
    </div>
  )
}

export default Services

