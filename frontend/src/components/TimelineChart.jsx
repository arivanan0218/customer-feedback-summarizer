import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart, ComposedChart } from 'recharts';

function TimelineChart({ data }) {
  // Format the date for display
  const formattedData = data.map(item => ({
    ...item,
    month: new Date(item.date + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }));

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">Combined Sentiment and Feedback Volume</h4>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={formattedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              yAxisId="left"
              domain={[-1, 1]}
              ticks={[-1, -0.5, 0, 0.5, 1]}
              tickFormatter={(value) => value.toFixed(1)}
              label={{ value: 'Sentiment', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              label={{ value: 'Count', angle: 90, position: 'insideRight' }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="average_sentiment"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Sentiment Score"
            />
            <Bar 
              yAxisId="right"
              dataKey="count" 
              fill="#60a5fa" 
              opacity={0.6}
              name="Feedback Count" 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Sentiment Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                domain={[-1, 1]}
                ticks={[-1, -0.5, 0, 0.5, 1]}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <Tooltip 
                formatter={(value) => [value.toFixed(2), 'Sentiment Score']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="average_sentiment"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                name="Sentiment Score"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Feedback Volume</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#60a5fa" name="Feedback Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default TimelineChart;