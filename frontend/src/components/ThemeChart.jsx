import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function ThemeChart({ data, colors = ['#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff'] }) {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Add percentage property to each item
  const chartData = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;
    
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
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CUSTOM_COLORS = [...colors];
  // Generate more colors if needed
  if (chartData.length > CUSTOM_COLORS.length) {
    const additionalColors = [
      '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49',
      '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'
    ];
    CUSTOM_COLORS.push(...additionalColors);
  }

  return (
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
            <Cell 
              key={`cell-${index}`} 
              fill={CUSTOM_COLORS[index % CUSTOM_COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} (${chartData.find(item => item.name === name).percentage}%)`, name]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ThemeChart;