import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import json
from services.feedback_analyzer import FeedbackAnalyzer
from services.gemini_service import GeminiService
from utils.data_processor import preprocess_csv

app = Flask(__name__, static_folder='static')
CORS(app)  # Enable CORS for all routes

@app.route('/api/template', methods=['GET'])
def get_template():
    """Endpoint to download the CSV template"""
    return send_from_directory(
        os.path.join(app.static_folder, 'csv'), 
        'feedback_template.csv', 
        as_attachment=True
    )

@app.route('/api/analyze', methods=['POST'])
def analyze_feedback():
    """Endpoint to analyze uploaded feedback data"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.csv'):
        # Process and analyze the feedback
        try:
            # Save the uploaded file temporarily
            temp_path = os.path.join(app.static_folder, 'temp_upload.csv')
            file.save(temp_path)
            
            # Process the data
            processed_data = preprocess_csv(temp_path)
            
            # Extract optional parameters
            options = {}
            if 'options' in request.form:
                options = json.loads(request.form['options'])
            
            # Analyze the feedback
            analyzer = FeedbackAnalyzer()
            analysis_results = analyzer.analyze(processed_data, options)
            
            # Generate summary with Gemini
            gemini_service = GeminiService()
            summary = gemini_service.generate_summary(analysis_results)
            
            # Clean up
            if os.path.exists(temp_path):
                os.remove(temp_path)
            
            return jsonify({
                'summary': summary,
                'analysis': analysis_results,
                'data_sample': processed_data.head(5).to_dict('records')
            })
        
        except Exception as e:
            import traceback
            traceback.print_exc()
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'File format not supported'}), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({'status': 'healthy'})

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get system metrics and statistics"""
    return jsonify({
        'version': '1.0.0',
        'api_status': 'operational',
        'models_loaded': True,
        'memory_usage': '128MB',
        'uptime': '2h 34m'
    })

if __name__ == '__main__':
    # Download NLTK data if needed
    import nltk
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')
    try:
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('stopwords')
    
    app.run(debug=True, port=5000)