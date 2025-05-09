import pandas as pd
import numpy as np
from textblob import TextBlob
from collections import Counter
import re
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation, NMF
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from config import SENTIMENT_THRESHOLDS, ADVANCED_SETTINGS, TEXT_PREPROCESSING

class FeedbackAnalyzer:
    def __init__(self):
        """Initialize the FeedbackAnalyzer class"""
        self.stop_words = set(stopwords.words('english'))
        self.common_words = set(['the', 'and', 'is', 'in', 'to', 'of', 'a', 'for', 'with', 'on', 'that', 'this'])
        self.stemmer = PorterStemmer()
        
        # Add domain-specific words to stop words
        self.stop_words.update(['erp', 'system', 'module', 'feature', 'software'])
    
    def analyze(self, dataframe, options=None):
        """
        Analyze the feedback data
        
        Args:
            dataframe (pd.DataFrame): Processed dataframe containing feedback data
            options (dict, optional): Analysis options
            
        Returns:
            dict: Analysis results
        """
        if options is None:
            options = {}
        
        # Preprocess text data for better analysis
        dataframe['processed_text'] = dataframe['feedback_text'].apply(
            lambda x: self._preprocess_text(x)
        )
        
        # Calculate sentiment for each feedback
        dataframe['sentiment'] = dataframe['feedback_text'].apply(self._calculate_sentiment)
        
        # Calculate sentiment category
        dataframe['sentiment_category'] = dataframe['sentiment'].apply(
            lambda x: self._categorize_sentiment(x, options.get('sentiment_thresholds', SENTIMENT_THRESHOLDS))
        )
        
        # Extract themes and common words
        themes = self._extract_themes(
            dataframe['processed_text'],
            num_topics=options.get('num_topics', ADVANCED_SETTINGS['max_themes']),
            num_words=options.get('num_words', ADVANCED_SETTINGS['max_keywords_per_theme'])
        )
        
        # Extract key phrases (important n-grams)
        key_phrases = self._extract_key_phrases(dataframe['processed_text'])
        
        # Word frequency analysis
        word_frequencies = self._analyze_word_frequencies(dataframe['processed_text'])
        
        # Calculate time series data
        time_series = self._calculate_time_series(dataframe)
        
        # Calculate ratings distribution if available
        ratings_distribution = self._calculate_ratings(dataframe)
        
        # Calculate sentiment distribution
        sentiment_distribution = self._calculate_sentiment_distribution(dataframe)
        
        # Calculate product/service distribution
        product_distribution = self._calculate_product_distribution(dataframe)
        
        # Extract key issues (negative feedback)
        key_issues = self._extract_key_issues(dataframe)
        
        # Compare different time periods if enough data
        comparison_data = self._compare_time_periods(dataframe)
        
        # Calculate category correlations
        category_correlations = self._calculate_category_correlations(dataframe)
        
        # Compile all results
        results = {
            'sentiment_distribution': sentiment_distribution,
            'ratings_distribution': ratings_distribution,
            'common_themes': themes,
            'key_phrases': key_phrases,
            'key_issues': key_issues,
            'word_frequencies': word_frequencies,
            'time_series': time_series,
            'product_distribution': product_distribution,
            'category_correlations': category_correlations,
            'comparison_data': comparison_data,
            'sample_size': len(dataframe),
            'date_range': {
                'start': dataframe['date'].min().strftime('%Y-%m-%d'),
                'end': dataframe['date'].max().strftime('%Y-%m-%d')
            }
        }
        
        return results
    
    def _preprocess_text(self, text):
        """Preprocess text for analysis"""
        if TEXT_PREPROCESSING['lowercase']:
            text = text.lower()
        
        if TEXT_PREPROCESSING['remove_punctuation']:
            text = re.sub(r'[^\w\s]', ' ', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords
        if TEXT_PREPROCESSING['remove_stopwords']:
            tokens = [token for token in tokens if token not in self.stop_words]
        
        # Remove short words
        tokens = [token for token in tokens if len(token) >= TEXT_PREPROCESSING['min_word_length']]
        
        # Stemming if enabled
        if ADVANCED_SETTINGS['use_stemming']:
            tokens = [self.stemmer.stem(token) for token in tokens]
        
        return ' '.join(tokens)
    
    def _calculate_sentiment(self, text):
        """Calculate sentiment score for a text"""
        return TextBlob(text).sentiment.polarity
    
    def _categorize_sentiment(self, score, thresholds=None):
        """Categorize sentiment score"""
        if thresholds is None:
            thresholds = SENTIMENT_THRESHOLDS
            
        if score > thresholds['positive']:
            return 'positive'
        elif score < thresholds['negative']:
            return 'negative'
        else:
            return 'neutral'
    
    def _extract_themes(self, texts, num_topics=5, num_words=5):
        """Extract common themes from the feedback texts using LDA"""
        # Create a bag of words representation
        vectorizer = CountVectorizer(
            max_df=0.95,
            min_df=2,
            stop_words='english',
            max_features=1000
        )
        
        # Convert texts to a document-term matrix
        try:
            X = vectorizer.fit_transform(texts)
            
            # Apply LDA to extract topics
            lda = LatentDirichletAllocation(
                n_components=num_topics,
                random_state=42,
                max_iter=25
            )
            
            lda.fit(X)
            
            # Get feature names
            feature_names = vectorizer.get_feature_names_out()
            
            # Extract top words for each topic
            topics = []
            for topic_idx, topic in enumerate(lda.components_):
                top_words_idx = topic.argsort()[:-num_words-1:-1]
                top_words = [feature_names[i] for i in top_words_idx]
                topics.append({
                    'id': topic_idx,
                    'keywords': top_words,
                    'weight': float(topic.sum()) / float(lda.components_.sum())
                })
            
            # Sort topics by weight
            topics = sorted(topics, key=lambda x: x['weight'], reverse=True)
            
            return topics
        
        except (ValueError, TypeError) as e:
            # Fallback if there's not enough data for LDA
            all_text = ' '.join(texts)
            words = re.findall(r'\b\w+\b', all_text.lower())
            words = [w for w in words if w not in self.common_words and len(w) > 3]
            word_counts = Counter(words).most_common(num_topics * num_words)
            
            # Group words into artificial topics
            topics = []
            for i in range(min(num_topics, (len(word_counts) + num_words - 1) // num_words)):
                start_idx = i * num_words
                end_idx = min(start_idx + num_words, len(word_counts))
                topic_words = [word for word, _ in word_counts[start_idx:end_idx]]
                
                if topic_words:  # Only add if there are words
                    topics.append({
                        'id': i,
                        'keywords': topic_words,
                        'weight': (num_topics - i) / num_topics  # Approximate weight
                    })
            
            return topics
    
    def _extract_key_phrases(self, texts, top_n=10):
        """Extract important key phrases using TF-IDF"""
        try:
            # Use N-gram range for phrases
            vectorizer = TfidfVectorizer(
                ngram_range=(2, 3),
                max_df=0.85,
                min_df=2,
                max_features=500
            )
            
            X = vectorizer.fit_transform(texts)
            
            # Get feature names and their TF-IDF scores
            feature_names = vectorizer.get_feature_names_out()
            
            # Calculate overall TF-IDF score for each phrase
            tfidf_scores = X.sum(axis=0).A1
            
            # Sort phrases by TF-IDF score
            top_phrase_indices = tfidf_scores.argsort()[-top_n:][::-1]
            top_phrases = [feature_names[i] for i in top_phrase_indices]
            
            # Format the result
            return [{'phrase': phrase, 'score': float(tfidf_scores[top_phrase_indices[i]])} 
                    for i, phrase in enumerate(top_phrases)]
        
        except (ValueError, TypeError) as e:
            # Fallback if vectorizer fails
            return [{'phrase': 'Unable to extract key phrases', 'score': 0}]
    
    def _analyze_word_frequencies(self, texts, top_n=30):
        """Analyze word frequencies in the feedback"""
        # Combine all texts
        all_text = ' '.join(texts)
        
        # Extract words (already preprocessed)
        words = all_text.split()
        
        # Count word frequencies
        word_counts = Counter(words).most_common(top_n)
        
        # Format the result
        return [{'word': word, 'count': count} for word, count in word_counts]
    
    def _calculate_time_series(self, dataframe):
        """Calculate sentiment trends over time"""
        # Group by month and calculate average sentiment and counts
        monthly_data = dataframe.set_index('date').resample('M').agg({
            'sentiment': 'mean',
            'feedback_text': 'count',
            'rating': lambda x: x.dropna().mean() if not x.dropna().empty else None
        }).reset_index()
        
        # Format for frontend
        time_series = []
        for _, row in monthly_data.iterrows():
            entry = {
                'date': row['date'].strftime('%Y-%m'),
                'average_sentiment': round(row['sentiment'], 2) if not pd.isna(row['sentiment']) else 0,
                'count': int(row['feedback_text'])
            }
            
            # Add average rating if available
            if row['rating'] is not None and not pd.isna(row['rating']):
                entry['average_rating'] = round(row['rating'], 1)
                
            time_series.append(entry)
        
        return time_series
    
    def _calculate_ratings(self, dataframe):
        """Calculate ratings distribution"""
        if 'rating' not in dataframe.columns or dataframe['rating'].isna().all():
            return None
        
        # Count occurrences of each rating
        ratings = dataframe['rating'].dropna().astype(int).value_counts().sort_index().to_dict()
        
        # Calculate average rating
        avg_rating = round(dataframe['rating'].dropna().mean(), 1)
        
        # Calculate rating trends over time
        monthly_ratings = dataframe.set_index('date').resample('M').agg({
            'rating': lambda x: x.dropna().mean() if not x.dropna().empty else None
        }).reset_index()
        
        rating_trends = []
        for _, row in monthly_ratings.iterrows():
            if row['rating'] is not None and not pd.isna(row['rating']):
                rating_trends.append({
                    'date': row['date'].strftime('%Y-%m'),
                    'average_rating': round(row['rating'], 1)
                })
        
        return {
            'distribution': ratings,
            'average': avg_rating,
            'trends': rating_trends
        }
    
    def _calculate_sentiment_distribution(self, dataframe):
        """Calculate distribution of sentiment categories"""
        sentiment_counts = dataframe['sentiment_category'].value_counts().to_dict()
        
        # Ensure all categories are included
        for category in ['positive', 'neutral', 'negative']:
            if category not in sentiment_counts:
                sentiment_counts[category] = 0
        
        # Calculate percentages
        total = sum(sentiment_counts.values())
        percentages = {k: round(v / total * 100, 1) for k, v in sentiment_counts.items()}
        
        # Calculate average sentiment score
        avg_sentiment = round(dataframe['sentiment'].mean(), 2)
        
        return {
            'counts': sentiment_counts,
            'percentages': percentages,
            'average_score': avg_sentiment
        }
    
    def _calculate_product_distribution(self, dataframe):
        """Calculate distribution of products/services"""
        product_counts = dataframe['product_service'].value_counts().to_dict()
        
        # Calculate sentiment by product
        product_sentiment = {}
        for product in product_counts.keys():
            subset = dataframe[dataframe['product_service'] == product]
            avg_sentiment = round(subset['sentiment'].mean(), 2)
            
            # Calculate sentiment distribution
            sentiment_dist = subset['sentiment_category'].value_counts(normalize=True).to_dict()
            for category in ['positive', 'neutral', 'negative']:
                if category not in sentiment_dist:
                    sentiment_dist[category] = 0.0
            
            # Calculate average rating if available
            avg_rating = None
            if 'rating' in subset.columns and not subset['rating'].isna().all():
                avg_rating = round(subset['rating'].dropna().mean(), 1)
            
            product_sentiment[product] = {
                'average_sentiment': avg_sentiment,
                'sentiment_distribution': {k: round(v * 100, 1) for k, v in sentiment_dist.items()},
                'average_rating': avg_rating
            }
        
        return {
            'counts': product_counts,
            'product_sentiment': product_sentiment
        }
    
    def _extract_key_issues(self, dataframe, top_n=5):
        """Extract key issues from negative feedback"""
        # Filter for negative sentiment
        negative_feedback = dataframe[dataframe['sentiment_category'] == 'negative']
        
        if negative_feedback.empty:
            return []
        
        # Group by product/service
        product_issues = {}
        for product in negative_feedback['product_service'].unique():
            product_subset = negative_feedback[negative_feedback['product_service'] == product]
            
            # Extract common words from negative feedback for this product
            text = ' '.join(product_subset['processed_text'])
            words = text.split()
            common_words = Counter(words).most_common(10)
            
            # Sample a few representative feedback items
            sample_feedback = product_subset.sample(min(3, len(product_subset)))['feedback_text'].tolist()
            
            product_issues[product] = {
                'count': len(product_subset),
                'keywords': [word for word, _ in common_words],
                'examples': sample_feedback
            }
        
        # Sort by count and take top_n
        sorted_issues = sorted(
            [{'product': k, **v} for k, v in product_issues.items()],
            key=lambda x: x['count'],
            reverse=True
        )
        
        return sorted_issues[:top_n]
    
    def _compare_time_periods(self, dataframe):
        """Compare different time periods"""
        # Check if we have enough data for comparison
        if len(dataframe) < 10 or dataframe['date'].nunique() < 2:
            return None
        
        # Determine mid-point for comparison
        mid_date = dataframe['date'].median()
        
        # Split data into two periods
        period1 = dataframe[dataframe['date'] < mid_date]
        period2 = dataframe[dataframe['date'] >= mid_date]
        
        if len(period1) < 5 or len(period2) < 5:
            return None
        
        # Calculate metrics for each period
        period1_sentiment = round(period1['sentiment'].mean(), 2)
        period2_sentiment = round(period2['sentiment'].mean(), 2)
        
        # Calculate rating changes if available
        rating_change = None
        if 'rating' in dataframe.columns and not dataframe['rating'].isna().all():
            period1_rating = period1['rating'].dropna().mean()
            period2_rating = period2['rating'].dropna().mean()
            if not pd.isna(period1_rating) and not pd.isna(period2_rating):
                rating_change = round(period2_rating - period1_rating, 1)
        
        # Get date ranges for periods
        period1_range = {
            'start': period1['date'].min().strftime('%Y-%m-%d'),
            'end': period1['date'].max().strftime('%Y-%m-%d')
        }
        period2_range = {
            'start': period2['date'].min().strftime('%Y-%m-%d'),
            'end': period2['date'].max().strftime('%Y-%m-%d')
        }
        
        # Calculate sentiment category distributions
        period1_dist = period1['sentiment_category'].value_counts(normalize=True).to_dict()
        period2_dist = period2['sentiment_category'].value_counts(normalize=True).to_dict()
        
        # Ensure all categories exist
        for category in ['positive', 'neutral', 'negative']:
            if category not in period1_dist:
                period1_dist[category] = 0.0
            if category not in period2_dist:
                period2_dist[category] = 0.0
        
        # Format the distributions as percentages
        period1_dist = {k: round(v * 100, 1) for k, v in period1_dist.items()}
        period2_dist = {k: round(v * 100, 1) for k, v in period2_dist.items()}
        
        # Calculate changes in distribution
        distribution_changes = {
            k: round(period2_dist[k] - period1_dist[k], 1) for k in period1_dist.keys()
        }
        
        return {
            'period1': {
                'date_range': period1_range,
                'average_sentiment': period1_sentiment,
                'sentiment_distribution': period1_dist,
                'sample_size': len(period1)
            },
            'period2': {
                'date_range': period2_range,
                'average_sentiment': period2_sentiment,
                'sentiment_distribution': period2_dist,
                'sample_size': len(period2)
            },
            'changes': {
                'sentiment': round(period2_sentiment - period1_sentiment, 2),
                'rating': rating_change,
                'distribution': distribution_changes
            }
        }
    
    def _calculate_category_correlations(self, dataframe):
        """Calculate correlations between product categories and sentiment/ratings"""
        if len(dataframe) < 10 or dataframe['product_service'].nunique() < 2:
            return None
        
        # Calculate correlation between product category and sentiment
        product_dummies = pd.get_dummies(dataframe['product_service'])
        
        # Combine with sentiment scores
        corr_data = pd.concat([product_dummies, dataframe['sentiment']], axis=1)
        
        # Calculate correlations
        correlations = corr_data.corr()['sentiment'].drop('sentiment').to_dict()
        
        # Sort and format correlations
        sorted_correlations = sorted(
            [{'category': k, 'correlation': round(v, 2)} for k, v in correlations.items()],
            key=lambda x: abs(x['correlation']),
            reverse=True
        )
        
        return sorted_correlations