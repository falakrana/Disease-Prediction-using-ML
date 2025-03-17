# Disease Prediction System

## Overview
The **Disease Prediction System** is a web-based application that predicts diseases based on user-input symptoms using Machine Learning. The system consists of a **Flask backend** for handling the ML model and API requests and a **React frontend** for user interaction.

## Tech Stack
- **Frontend:** React.js, Vite, HTML, CSS, JavaScript
- **Backend:** Flask (Python)
- **Machine Learning:** Scikit-learn, Pandas, NumPy
- **Database:** MongoDB Atlas

## Folder Structure
```
├── backend
│   ├── models/           # ML models
│   ├── utils/            # Helper functions
│   ├── .env.example      # Environment variable example
│   ├── .gitignore        # Ignore unnecessary files
│   ├── app.py            # Main Flask application
│   ├── README.md         # Backend documentation
│   ├── requirements.txt  # Python dependencies
│
├── frontend
│   ├── node_modules/     # Dependencies
│   ├── public/           # Static assets
│   ├── src/              # React source code
│   ├── .gitignore        # Ignore unnecessary files
│   ├── eslint.config.js  # Linting configuration
│   ├── index.html        # Main HTML file
│   ├── package.json      # Frontend dependencies
│   ├── package-lock.json # Package lock file
│   ├── README.md         # Frontend documentation
│   ├── vite.config.js    # Vite configuration
```

## Installation
### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/disease-prediction.git
cd disease-prediction
```

### **2. Backend Setup**
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Run the backend server:
```sh
python app.py
```

### **3. Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```

## Usage
1. Open the frontend in the browser.
2. Enter symptoms and submit.
3. The backend processes input and returns predicted diseases.

## Future Enhancements
- Improve ML model accuracy.
- Implement user authentication.

## Contributing
Feel free to fork this repository and submit pull requests.
