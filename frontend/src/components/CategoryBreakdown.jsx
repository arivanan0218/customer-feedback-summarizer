import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function CategoryBreakdown({ products }) {
  // Prepare data for sentiment by product chart
  const sentimentData = Object.entries(products.product_sentiment).map(([product, data]) => ({
    name: product,
    sentiment: data.average_sentiment,
    rating: data.average_rating || 0,
    positive: data.sentiment_distribution.positive,
    neutral: data.sentiment_distribution.neutral,
    negative: data.sentiment_distribution.negative
  }));

  // Sort by sentiment
  sentimentData.sort((a, b) => b.sentiment - a.sentiment);

  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.2) return '#22c55e';
    if (sentiment < -0.2) return '#ef4444';
    return '#3b82f6';
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment by Product/Service</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sentimentData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 80,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              domain={[-1, 1]} 
              ticks={[-1, -0.5, 0, 0.5, 1]} 
              tickFormatter={(value) => value.toFixed(1)}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip 
              formatter={(value, name) => [value.toFixed(2), name === 'sentiment' ? 'Sentiment Score' : name]}
            />
            <Legend />
            <Bar 
              dataKey="sentiment" 
              name="Sentiment Score" 
              radius={[0, 4, 4, 0]}
            >
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getSentimentColor(entry.sentiment)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8">
        <h4 className="text-md font-medium text-gray-700 mb-4">Sentiment Distribution by Product</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product/Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Positive</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Neutral</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Negative</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Sentiment</th>
                {sentimentData[0].rating !== 0 && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Rating</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sentimentData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${item.positive}%` }}></div>
                      </div>
                      <span className="ml-3 text-sm text-gray-600">{item.positive}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${item.neutral}%` }}></div>
                      </div>
                      <span className="ml-3 text-sm text-gray-600">{item.neutral}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${item.negative}%` }}></div>
                      </div>
                      <span className="ml-3 text-sm text-gray-600">{item.negative}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.sentiment > 0.2 ? 'bg-green-100 text-green-800' : 
                      item.sentiment < -0.2 ? 'bg-red-100 text-red-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.sentiment.toFixed(2)}
                    </span>
                  </td>
                  {item.rating !== 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.rating.toFixed(1)} / 5
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryBreakdown;