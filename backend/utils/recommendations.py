def generate_recommendations(disease):
    """
    Generate recommendations based on predicted disease
    
    Args:
        disease (str): Predicted disease
        
    Returns:
        list: List of recommendations
    """
    # Basic recommendations for common diseases
    # In a production system, these would be more comprehensive and medically reviewed
    recommendations = {
        "Common Cold": [
            "Rest and stay hydrated",
            "Take over-the-counter cold medications",
            "Use a humidifier to ease congestion",
            "Consult a doctor if symptoms persist beyond a week"
        ],
        "Influenza": [
            "Rest and stay hydrated",
            "Take fever-reducing medications",
            "Isolate to prevent spreading the virus",
            "Consult a doctor, especially if you're in a high-risk group"
        ],
        "Pneumonia": [
            "Seek immediate medical attention",
            "Take prescribed antibiotics if bacterial",
            "Rest and stay hydrated",
            "Follow up with your doctor after treatment"
        ],
        "Diabetes": [
            "Consult a doctor for proper diagnosis",
            "Monitor blood sugar levels",
            "Maintain a healthy diet and exercise regularly",
            "Take prescribed medications as directed"
        ],
        "Hypertension": [
            "Consult a doctor for proper diagnosis",
            "Reduce sodium intake",
            "Exercise regularly and maintain a healthy weight",
            "Take prescribed medications as directed"
        ],
        "Migraine": [
            "Rest in a quiet, dark room",
            "Apply cold compresses to your head",
            "Take pain relievers as recommended",
            "Consult a doctor for recurring migraines"
        ],
        "Gastroenteritis": [
            "Stay hydrated with clear fluids",
            "Eat bland, easy-to-digest foods",
            "Rest and avoid dairy products",
            "Seek medical attention if symptoms are severe or persistent"
        ],
        "Asthma": [
            "Use prescribed inhalers as directed",
            "Avoid known triggers",
            "Follow your asthma action plan",
            "Seek emergency care for severe attacks"
        ],
        "Bronchitis": [
            "Rest and stay hydrated",
            "Use a humidifier to ease breathing",
            "Take over-the-counter pain relievers for discomfort",
            "Consult a doctor if symptoms worsen or last more than 3 weeks"
        ],
        "Tuberculosis": [
            "Seek immediate medical attention",
            "Complete the full course of prescribed antibiotics",
            "Isolate to prevent spreading the infection",
            "Follow up with your doctor regularly during treatment"
        ],
        "Malaria": [
            "Seek immediate medical attention",
            "Take prescribed antimalarial medications",
            "Rest and stay hydrated",
            "Use mosquito nets and repellents to prevent reinfection"
        ],
        "Dengue": [
            "Seek medical attention",
            "Rest and stay hydrated",
            "Take acetaminophen for fever (avoid aspirin)",
            "Monitor for warning signs of severe dengue"
        ],
        "Typhoid": [
            "Seek medical attention",
            "Take prescribed antibiotics",
            "Rest and stay hydrated",
            "Practice good hygiene to prevent spreading"
        ],
        "Hepatitis": [
            "Consult a doctor for proper diagnosis and treatment",
            "Rest and avoid alcohol",
            "Maintain a healthy diet",
            "Get vaccinated for hepatitis A and B if not infected"
        ],
        "Jaundice": [
            "Consult a doctor for proper diagnosis",
            "Rest and stay hydrated",
            "Follow a low-fat diet",
            "Avoid alcohol and certain medications"
        ]
    }
    
    # Default recommendations if disease not in our list
    default_recommendations = [
        "Consult a healthcare professional for proper diagnosis",
        "Rest and stay hydrated",
        "Monitor your symptoms",
        "Seek immediate medical attention if symptoms worsen"
    ]
    
    return recommendations.get(disease, default_recommendations)

