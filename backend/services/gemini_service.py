import os
import google.generativeai as genai
from config import GEMINI_API_KEY

class GeminiService:
    def __init__(self):
        """Initialize the Gemini service with API key"""
        genai.configure(api_key=GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-2.0-flash')
    
    def generate_summary(self, analysis_results):
        """
        Generate a natural language summary of the feedback analysis
        
        Args:
            analysis_results (dict): Results from the feedback analysis
            
        Returns:
            str: Generated summary
        """
        # Extract key metrics for the prompt
        sentiment_dist = analysis_results['sentiment_distribution']['percentages']
        date_range = analysis_results['date_range']
        sample_size = analysis_results['sample_size']
        
        # Extract themes
        themes = []
        for topic in analysis_results['common_themes'][:5]:  # Limit to top 5 themes
            themes.append(', '.join(topic['keywords']))
        
        # Extract product distribution
        product_dist = []
        for product, count in analysis_results['product_distribution']['counts'].items():
            product_dist.append(f"{product}: {count} mentions")
        
        # Extract key issues if available
        key_issues = []
        if analysis_results.get('key_issues'):
            for issue in analysis_results['key_issues'][:3]:  # Limit to top 3 issues
                product = issue['product']
                keywords = ', '.join(issue['keywords'][:5])
                key_issues.append(f"{product}: {keywords}")
        
        # Include comparison data if available
        comparison_text = ""
        if analysis_results.get('comparison_data'):
            comp_data = analysis_results['comparison_data']
            sentiment_change = comp_data['changes']['sentiment']
            change_direction = "improved" if sentiment_change > 0 else "declined"
            
            comparison_text = f"""
            Comparison between periods:
            - Period 1: {comp_data['period1']['date_range']['start']} to {comp_data['period1']['date_range']['end']}
            - Period 2: {comp_data['period2']['date_range']['start']} to {comp_data['period2']['date_range']['end']}
            - Overall sentiment has {change_direction} by {abs(sentiment_change)} points
            - Positive feedback: {comp_data['changes']['distribution']['positive']}% change
            - Negative feedback: {comp_data['changes']['distribution']['negative']}% change
            """
        
        # Create the prompt for Gemini
        prompt = f"""
        You are an ERP system's AI summarizer. Generate a concise, business-friendly summary of customer feedback analysis with the following data:
        
        Date Range: {date_range['start']} to {date_range['end']}
        Sample Size: {sample_size} feedback entries
        
        Sentiment Distribution:
        - Positive: {sentiment_dist.get('positive', 0)}%
        - Neutral: {sentiment_dist.get('neutral', 0)}%
        - Negative: {sentiment_dist.get('negative', 0)}%
        
        Common Themes:
        {chr(10).join([f"- Theme {i+1}: {theme}" for i, theme in enumerate(themes)])}
        
        Product Distribution:
        {chr(10).join([f"- {product}" for product in product_dist])}
        
        {f"Key Issues Identified:\\n{chr(10).join([f'- {issue}' for issue in key_issues])}" if key_issues else ""}
        
        {comparison_text if comparison_text else ""}
        
        Your summary should:
        1. Start with a high-level overview of sentiment and main findings
        2. Highlight key themes and patterns
        3. Mention any notable product-specific feedback
        4. Note any significant changes or trends if comparison data is available
        5. Be 3-5 paragraphs long
        6. Use business-appropriate language
        7. Include specific percentages and metrics
        8. End with actionable insights based on the data
        
        The summary should be written directly as if it will be shown on a dashboard, without mentioning this prompt.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error generating summary: {str(e)}")
            return "Unable to generate summary. Please check the Gemini API configuration and try again."