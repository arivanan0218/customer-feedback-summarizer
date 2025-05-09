import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API configurations
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

# Analysis configurations
SENTIMENT_THRESHOLDS = {
    'positive': 0.2,
    'negative': -0.2
}

# Features to extract
ANALYSIS_FEATURES = [
    'sentiment_distribution',
    'common_themes',
    'key_issues',
    'trend_over_time',
    'rating_distribution',
    'product_distribution',
    'word_frequencies',
    'comparison_data'
]

# Advanced analysis settings
ADVANCED_SETTINGS = {
    'min_theme_occurrence': 2,
    'max_themes': 10,
    'max_keywords_per_theme': 8,
    'min_word_length': 3,
    'exclude_common_words': True,
    'use_stemming': True
}

# Text preprocessing options
TEXT_PREPROCESSING = {
    'remove_punctuation': True,
    'remove_stopwords': True,
    'lowercase': True,
    'min_word_length': 3
}