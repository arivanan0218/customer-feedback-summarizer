import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function SentimentChart({ data }) {
  const chartData = [
    { name: 'Positive', value: data.counts.positive, percentage: data.percentages.positive },
    { name: 'Neutral', value: data.counts.neutral, percentage: data.percentages.neutral },
    { name: 'Negative', value: data.counts.negative, percentage: data.percentages.negative }
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-600">Average Sentiment Score</div>
        <div className="text-2xl font-bold text-primary-600">{data.average_score}</div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} (${chartData.find(item => item.name === name).percentage}%)`, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SentimentChart;