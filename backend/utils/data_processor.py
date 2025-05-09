import pandas as pd
from datetime import datetime
import numpy as np

def preprocess_csv(file_path):
    """
    Preprocess the CSV file to ensure it has the required columns and format
    
    Args:
        file_path (str): Path to the CSV file
        
    Returns:
        pd.DataFrame: Processed dataframe
    """
    # Read the CSV file
    df = pd.read_csv(file_path)
    
    # Check for required columns
    required_columns = ['customer_id', 'date', 'feedback_text']
    for col in required_columns:
        if col not in df.columns:
            raise ValueError(f"Required column '{col}' not found in the CSV file")
    
    # Ensure rating column exists, or add it with NaN
    if 'rating' not in df.columns:
        df['rating'] = float('nan')
    else:
        # Convert rating to numeric if possible
        df['rating'] = pd.to_numeric(df['rating'], errors='coerce')
    
    # Ensure product_service column exists, or add it with 'Unknown'
    if 'product_service' not in df.columns:
        df['product_service'] = 'Unknown'
    
    # Ensure category column exists, or add it with 'General'
    if 'category' not in df.columns:
        df['category'] = 'General'
    
    # Add location column if it doesn't exist
    if 'location' not in df.columns:
        df['location'] = 'Unknown'
    
    # Add user_id column if it doesn't exist
    if 'user_id' not in df.columns:
        df['user_id'] = 'Unknown'
    
    # Convert date strings to datetime objects
    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    
    # Handle missing dates by using today's date
    df.loc[df['date'].isna(), 'date'] = pd.Timestamp.now().normalize()
    
    # Sort by date
    df = df.sort_values('date')
    
    # Remove rows with missing feedback_text
    df = df.dropna(subset=['feedback_text'])
    
    # Clean up customer_id
    df['customer_id'] = df['customer_id'].astype(str).str.strip()
    
    # Fill missing categorical data
    df['product_service'] = df['product_service'].fillna('Unknown')
    df['category'] = df['category'].fillna('General')
    df['location'] = df['location'].fillna('Unknown')
    df['user_id'] = df['user_id'].fillna('Unknown')
    
    # Limit text length to prevent issues with analysis
    df['feedback_text'] = df['feedback_text'].astype(str).apply(lambda x: x[:5000])
    
    return df