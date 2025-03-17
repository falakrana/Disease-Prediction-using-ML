"use client"

const Resources = () => {
  const articles = [
    {
      title: "Understanding AI in Healthcare",
      excerpt: "Learn how artificial intelligence is transforming healthcare diagnosis and treatment.",
      date: "March 10, 2025",
      category: "Technology",
    },
    {
      title: "The Importance of Early Disease Detection",
      excerpt: "Discover why identifying diseases in their early stages can significantly improve treatment outcomes.",
      date: "February 28, 2025",
      category: "Health",
    },
    {
      title: "Common Symptoms You Shouldn't Ignore",
      excerpt: "Some symptoms may seem minor but could indicate serious health conditions. Here's what to watch for.",
      date: "February 15, 2025",
      category: "Wellness",
    },
    {
      title: "How Machine Learning Improves Diagnostic Accuracy",
      excerpt: "Explore the ways machine learning algorithms are helping doctors make more accurate diagnoses.",
      date: "January 30, 2025",
      category: "Technology",
    },
    {
      title: "Preventive Health Measures Everyone Should Take",
      excerpt: "Simple steps you can take today to prevent common diseases and maintain optimal health.",
      date: "January 22, 2025",
      category: "Wellness",
    },
    {
      title: "The Future of Personalized Medicine",
      excerpt: "How AI and genetic testing are paving the way for truly personalized healthcare approaches.",
      date: "January 10, 2025",
      category: "Research",
    },
  ]

  const faqs = [
    {
      question: "How accurate are the disease predictions?",
      answer:
        "Our AI model has been trained on millions of medical cases and achieves an accuracy rate of over 85% for common conditions. However, it's important to remember that our tool is meant to be informative, not diagnostic. Always consult with a healthcare professional for proper diagnosis.",
    },
    {
      question: "Is my health data secure?",
      answer:
        "Yes, we take data security very seriously. All your health information is encrypted and stored securely. We are HIPAA compliant and never share your personal health information with third parties without your explicit consent.",
    },
    {
      question: "Can I use HealthPredict instead of seeing a doctor?",
      answer:
        "No, HealthPredict is designed to be a supplementary tool, not a replacement for professional medical care. Our predictions can help you better understand potential conditions and when to seek medical attention, but they should not be used for self-diagnosis or treatment.",
    },
    {
      question: "How often should I use the symptom checker?",
      answer:
        "You can use our symptom checker whenever you experience concerning symptoms. However, for ongoing or worsening symptoms, we recommend consulting with a healthcare provider rather than repeatedly using our tool.",
    },
  ]

  return (
    <div className="container" style={{ padding: "60px 0" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "50px", textAlign: "center" }}>Health Resources</h1>

      {/* Articles Section */}
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "30px" }}>Latest Articles</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {articles.map((article, index) => (
            <div
              key={index}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <div
                style={{
                  height: "160px",
                  backgroundColor: "#e8f0fe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-color)",
                  fontSize: "1.5rem",
                }}
              >
                {article.category}
              </div>
              <div style={{ padding: "20px" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    marginBottom: "10px",
                  }}
                >
                  {article.date}
                </span>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>{article.title}</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>{article.excerpt}</p>
                <a
                  href="#"
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: "500",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Read more
                  <span style={{ marginLeft: "5px" }}>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "30px" }}>Frequently Asked Questions</h2>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                  color: "var(--primary-color)",
                }}
              >
                {faq.question}
              </h3>
              <p style={{ color: "var(--text-secondary)" }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Resources

