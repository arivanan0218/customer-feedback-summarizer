function DashboardStats({ analysis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="stat-card border-l-4 border-primary-500">
        <div className="stat-title">Total Feedback</div>
        <div className="stat-value">{analysis.sample_size}</div>
        <div className="stat-desc">From {analysis.date_range.start} to {analysis.date_range.end}</div>
      </div>
      
      <div className="stat-card border-l-4 border-green-500">
        <div className="stat-title">Positive Sentiment</div>
        <div className="stat-value">{analysis.sentiment_distribution.percentages.positive}%</div>
        <div className="stat-desc">
          {analysis.sentiment_distribution.counts.positive} positive feedback entries
        </div>
      </div>
      
      {analysis.ratings_distribution && (
        <div className="stat-card border-l-4 border-yellow-500">
          <div className="stat-title">Average Rating</div>
          <div className="stat-value">{analysis.ratings_distribution.average}</div>
          <div className="stat-desc">Out of 5</div>
        </div>
      )}
      
      <div className="stat-card border-l-4 border-indigo-500">
        <div className="stat-title">Products/Services</div>
        <div className="stat-value">{Object.keys(analysis.product_distribution.counts).length}</div>
        <div className="stat-desc">Different categories analyzed</div>
      </div>
    </div>
  );
}

export default DashboardStats;