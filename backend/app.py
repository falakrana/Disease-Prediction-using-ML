from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import pickle
import numpy as np
import os
from datetime import timedelta
import re
import urllib.parse
from pymongo import MongoClient
import pandas as pd

username = "falakrana_30"
password = "@qwerty1"  # If it has @, #, $, & etc., it needs encoding
encoded_password = urllib.parse.quote_plus(password)
app = Flask(__name__)
CORS(app)

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)

# MongoDB Atlas Connection
MONGO_URI = f"mongodb+srv://{username}:{encoded_password}@disease.ef7kz.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client.disease_prediction
users_collection = db.users


def load_models():
    models = {}
    models_dir = os.path.join(os.path.dirname(__file__), "models/")  # ✅ Fixed path

    try:
        def safe_load(file_path):
            with open(file_path, 'rb') as f:
                return pickle.load(f, fix_imports=True, encoding="latin1", errors="ignore")  # ✅ Ignore unknown attributes

        models['nb_model'] = safe_load(os.path.join(models_dir, 'final_nb_model.pkl'))
        models['rf_model'] = safe_load(os.path.join(models_dir, 'final_rf_model.pkl'))
        models['svm_model'] = safe_load(os.path.join(models_dir, 'final_svm_model.pkl'))
        models['prediction_classes'] = safe_load(os.path.join(models_dir, 'predictions_classes.pkl'))
        models['symptom_index'] = safe_load(os.path.join(models_dir, 'symptom_index.pkl'))

        print("✅ All models loaded successfully!")
        return models

    except AttributeError as e:
        print(f"❌ Attribute error loading models: {e}. Try re-saving models without 'predictDisease'.")
        return None
    except Exception as e:
        print(f"❌ Error loading models: {e}")
        return None




# Load models at startup
models = load_models()

# Helper function to convert symptoms to model input format
def symptoms_to_input(symptom_list, symptom_index):
    input_data = np.zeros(len(symptom_index))
    for symptom in symptom_list:
        if symptom.lower() in symptom_index:
            input_data[symptom_index[symptom.lower()]] = 1

    # Convert NumPy array to DataFrame with correct feature names
    df_input = pd.DataFrame([input_data], columns=list(symptom_index.keys()))
    
    return df_input  # Return DataFrame instead of NumPy array
from collections import Counter
# Helper function to get majority vote prediction
def get_majority_prediction(predictions):
    # return max(set(predictions), key=predictions.count)
    
    prediction_counts = Counter(predictions)  # Count occurrences
    most_common = prediction_counts.most_common()  # List of (prediction, count) sorted

    # If we have a clear majority (e.g., 2+ votes), return it
    if most_common[0][1] > 1:
        return most_common[0][0]
    
    # If there's no clear majority (e.g., all different), return the first model's prediction
    return predictions[0]  # Default fallback to Naive Bayes prediction



# Email validation function
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

# Password validation function
def is_valid_password(password):
    # At least 8 characters, containing letters and numbers
    return len(password) >= 8 and any(c.isalpha() for c in password) and any(c.isdigit() for c in password)

# Routes

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Disease Prediction API! Use the /api endpoints."})

@app.route('/api/predict', methods=['POST'])
@jwt_required()
def predict():
    if not models:
        return jsonify({"error": "Models not loaded"}), 500
    
    # Get current user
    current_user = get_jwt_identity()
    
    # Get symptoms from request
    data = request.get_json()
    if not data or 'symptoms' not in data:
        return jsonify({"error": "No symptoms provided"}), 400
    
    symptoms = data['symptoms']
    if not symptoms or not isinstance(symptoms, list):
        return jsonify({"error": "Symptoms must be a non-empty list"}), 400
    
    try:
        # Convert symptoms to model input format
        input_data = symptoms_to_input(symptoms, models['symptom_index'])
        
        # Get predictions from all models
        nb_prediction = models['nb_model'].predict(input_data)[0]
        rf_prediction = models['rf_model'].predict(input_data)[0]
        svm_prediction = models['svm_model'].predict(input_data)[0]
        
        # Get prediction labels
        # nb_disease = models['prediction_classes'][nb_prediction]
        # rf_disease = models['prediction_classes'][rf_prediction]
        # svm_disease = models['prediction_classes'][svm_prediction]

        
        nb_disease = models['prediction_classes'].inverse_transform([nb_prediction])[0]
        rf_disease = models['prediction_classes'].inverse_transform([rf_prediction])[0]
        svm_disease = models['prediction_classes'].inverse_transform([svm_prediction])[0]


        
        # Get majority vote
        predictions = [nb_disease, rf_disease, svm_disease]
        final_prediction = get_majority_prediction(predictions)
        
        # Calculate confidence (percentage of models that agree)
        confidence = (predictions.count(final_prediction) / len(predictions)) * 100
        
        # Generate recommendations based on the predicted disease
        recommendations = generate_recommendations(final_prediction)
        print(f"Naive Bayes Prediction: {nb_disease}")
        print(f"Random Forest Prediction: {rf_disease}")
        print(f"SVM Prediction: {svm_disease}")
        print(f"Final Prediction: {final_prediction}")

        # Return prediction result
        return jsonify({
            "prediction": final_prediction,
            "confidence": confidence,
            "model_predictions": {
                "naive_bayes": nb_disease,
                "random_forest": rf_disease,
                "svm": svm_disease
            },
            "recommendations": recommendations
        }), 200
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": "Error making prediction"}), 500

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate input
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Email and password are required"}), 400
    
    email = data['email'].lower()
    password = data['password']
    
    # Validate email format
    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400
    
    # Validate password strength
    if not is_valid_password(password):
        return jsonify({"error": "Password must be at least 8 characters and contain both letters and numbers"}), 400
    
    # Check if user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409
    
    # Hash password
    hashed_password = generate_password_hash(password)
    
    # Create user document
    user = {
        "email": email,
        "password": hashed_password,
        "created_at": datetime.datetime.utcnow()
    }
    
    try:
        # Insert user into database
        result = users_collection.insert_one(user)
        
        # Create access token
        access_token = create_access_token(identity=email)
        
        return jsonify({
            "message": "User registered successfully",
            "token": access_token,
            "user": {"email": email}
        }), 201
    
    except Exception as e:
        print(f"Registration error: {e}")
        return jsonify({"error": "Error registering user"}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Email and password are required"}), 400
    
    email = data['email'].lower()
    password = data['password']
    
    # Find user in database
    user = users_collection.find_one({"email": email})
    
    # Check if user exists and password is correct
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid email or password"}), 401
    
    # Create access token
    access_token = create_access_token(identity=email)
    
    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {"email": email}
    }), 200

@app.route('/api/validate-token', methods=['POST'])
@jwt_required()
def validate_token():
    # Get current user
    current_user = get_jwt_identity()
    
    # Find user in database
    user = users_collection.find_one({"email": current_user})
    
    if not user:
        return jsonify({"valid": False}), 401
    
    return jsonify({
        "valid": True,
        "user": {"email": current_user}
    }), 200

# Helper function to generate recommendations based on predicted disease
def generate_recommendations(disease):
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

# Add missing import
import datetime

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

