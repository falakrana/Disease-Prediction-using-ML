from werkzeug.security import generate_password_hash, check_password_hash
import re
from datetime import datetime

def is_valid_email(email):
    """
    Validate email format
    
    Args:
        email (str): Email to validate
        
    Returns:
        bool: True if email is valid, False otherwise
    """
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def is_valid_password(password):
    """
    Validate password strength
    
    Args:
        password (str): Password to validate
        
    Returns:
        bool: True if password is valid, False otherwise
    """
    # At least 8 characters, containing letters and numbers
    return len(password) >= 8 and any(c.isalpha() for c in password) and any(c.isdigit() for c in password)

def hash_password(password):
    """
    Hash password using Werkzeug's generate_password_hash
    
    Args:
        password (str): Password to hash
        
    Returns:
        str: Hashed password
    """
    return generate_password_hash(password)

def verify_password(hashed_password, password):
    """
    Verify password against hash
    
    Args:
        hashed_password (str): Hashed password from database
        password (str): Password to verify
        
    Returns:
        bool: True if password matches hash, False otherwise
    """
    return check_password_hash(hashed_password, password)

def create_user_document(email, hashed_password):
    """
    Create user document for MongoDB
    
    Args:
        email (str): User email
        hashed_password (str): Hashed password
        
    Returns:
        dict: User document
    """
    return {
        "email": email.lower(),
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }

