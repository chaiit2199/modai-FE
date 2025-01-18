'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatisticsChart = ({ statistics, homeName, awayName }) => {
    
  const data = [
    {
      name: "Thắng",
      home: parseInt(statistics.homeH2HComparisonPercent?.replace('%', ''), 10) || 0, 
      away: parseInt(statistics.awayH2HComparisonPercent?.replace('%', ''), 10) || 0
    },
    { name: "Bàn thắng", 
      home: parseInt(statistics.homeGoalsComparisonPercent?.replace('%', ''), 10) || 0, 
      away: parseInt(statistics.awayGoalsComparisonPercent?.replace('%', ''), 10) || 0 
    },
    { name: "Tấn công", 
        home: parseInt(statistics.homeAttComparisonPercent?.replace('%', ''), 10) || 0, 
        away: parseInt(statistics.awayAttComparisonPercent?.replace('%', ''), 10) || 0 
    },
    { name: "Phong độ", 
        home: parseInt(statistics.homeFormComparisonPercent?.replace('%', ''), 10) || 0, 
        away: parseInt(statistics.awayFormComparisonPercent?.replace('%', ''), 10) || 0
    },
    
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="0 3" />
        <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#fff"}} />
        <YAxis tick={{ fontSize: 14,  fill: "#fff" }} />
        <Tooltip contentStyle={{ backgroundColor: "#f4f4f4", borderRadius: 5 }} />
        <Legend verticalAlign="top" height={36} />
        <Bar
          dataKey="home"
          fill="#8884d8"
          name={homeName}
          radius={[10, 10, 0, 0]} // Add rounded corners
        />
        <Bar
          dataKey="away"
          fill="#82ca9d"
          name={awayName}
          radius={[10, 10, 0, 0]} // Add rounded corners
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
