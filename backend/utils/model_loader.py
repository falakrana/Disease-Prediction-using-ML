import pickle
import numpy as np
import os



import pickle
import numpy as np
import os

def load_models():
    """
    Load all machine learning models and related files
    """
    models = {}
    models_dir = os.path.join(os.path.dirname(__file__), "../backend/models/")  # ✅ Ensure correct path

    try:
        # Load models safely, ignoring missing custom functions
        def safe_load(file_path):
            with open(file_path, 'rb') as f:
                return pickle.load(f, fix_imports=True, encoding="latin1", errors="ignore")

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

def symptoms_to_input(symptom_list, symptom_index):
    """
    Convert list of symptoms to model input format
    
    Args:
        symptom_list (list): List of symptoms as strings
        symptom_index (dict): Mapping of symptoms to indices
        
    Returns:
        numpy.ndarray: Input array for model prediction
    """
    # Initialize input array with zeros
    input_data = np.zeros(len(symptom_index))
    
    # Set 1 for each symptom present
    for symptom in symptom_list:
        if symptom.lower() in symptom_index:
            input_data[symptom_index[symptom.lower()]] = 1
    
    return input_data.reshape(1, -1)

def get_majority_prediction(predictions):
    """
    Get majority vote prediction from multiple models
    
    Args:
        predictions (list): List of predictions from different models
        
    Returns:
        str: Majority prediction
    """
    return max(set(predictions), key=predictions.count)

