import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function ComparisonChart({ data }) {
  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">
        Not enough data for period comparison
      </div>
    );
  }

  // Prepare data for chart
  const sentimentData = [
    {
      name: `Period 1 (${data.period1.date_range.start} to ${data.period1.date_range.end})`,
      sentiment: data.period1.average_sentiment,
      positive: data.period1.sentiment_distribution.positive,
      neutral: data.period1.sentiment_distribution.neutral,
      negative: data.period1.sentiment_distribution.negative
    },
    {
      name: `Period 2 (${data.period2.date_range.start} to ${data.period2.date_range.end})`,
      sentiment: data.period2.average_sentiment,
      positive: data.period2.sentiment_distribution.positive,
      neutral: data.period2.sentiment_distribution.neutral,
      negative: data.period2.sentiment_distribution.negative
    }
  ];

  // Changes data
  const changeData = [
    { name: 'Positive', value: data.changes.distribution.positive },
    { name: 'Neutral', value: data.changes.distribution.neutral },
    { name: 'Negative', value: data.changes.distribution.negative }
  ];

  const getBarColor = (value) => {
    return value >= 0 ? '#22c55e' : '#ef4444';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Sentiment Change</div>
          <div className={`text-3xl font-bold ${data.changes.sentiment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.changes.sentiment > 0 ? '+' : ''}{data.changes.sentiment.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.changes.sentiment >= 0 ? 'Improvement' : 'Decline'} in average sentiment
          </div>
        </div>
        
        {data.changes.rating !== null && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-500">Rating Change</div>
            <div className={`text-3xl font-bold ${data.changes.rating >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.changes.rating > 0 ? '+' : ''}{data.changes.rating.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {data.changes.rating >= 0 ? 'Improvement' : 'Decline'} in average rating
            </div>
          </div>
        )}
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Positive Feedback Change</div>
          <div className={`text-3xl font-bold ${data.changes.distribution.positive >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.changes.distribution.positive > 0 ? '+' : ''}{data.changes.distribution.positive}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.changes.distribution.positive >= 0 ? 'Increase' : 'Decrease'} in positive feedback
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Sentiment Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={sentimentData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 90,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" name="Positive %" fill="#22c55e" />
              <Bar dataKey="neutral" name="Neutral %" fill="#3b82f6" />
              <Bar dataKey="negative" name="Negative %" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Changes in Sentiment Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={changeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value > 0 ? '+' : ''}${value}%`, 'Change']} />
              <Legend />
              <Bar dataKey="value" name="Change (%)" radius={[4, 4, 0, 0]}>
                {changeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ComparisonChart;