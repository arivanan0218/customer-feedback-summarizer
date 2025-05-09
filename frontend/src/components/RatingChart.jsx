import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function RatingChart({ data, showTrends = false }) {
  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">
        No rating data available
      </div>
    );
  }

  if (showTrends && data.trends) {
    // Format the date for trends
    const formattedTrends = data.trends.map(item => ({
      ...item,
      month: new Date(item.date + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedTrends}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
          <Tooltip 
            formatter={(value) => [value.toFixed(1), 'Average Rating']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="average_rating"
            stroke="#f59e0b"
            activeDot={{ r: 8 }}
            name="Average Rating"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // Prepare data for rating distribution chart
  // Prepare data for rating distribution chart
  const distributionData = Object.entries(data.distribution).map(([rating, count]) => ({
    name: `${rating} Stars`,
    value: count,
    rating: parseInt(rating)
  }));

  // Sort by rating
  distributionData.sort((a, b) => a.rating - b.rating);

  // Custom colors for ratings
  const getRatingColor = (rating) => {
    const colors = {
      1: '#ef4444', // red
      2: '#f97316', // orange
      3: '#eab308', // yellow
      4: '#84cc16', // lime
      5: '#22c55e'  // green
    };
    return colors[rating] || '#3b82f6';
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-600">Average Rating</div>
        <div className="text-2xl font-bold text-amber-500">{data.average} / 5</div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={distributionData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Number of Ratings" radius={[4, 4, 0, 0]}>
            {distributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRatingColor(entry.rating)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RatingChart;