import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg flex justify-center">Activity</h2>

      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#006666" />
          {/* teal dark #004c4c */}
          <Bar dataKey="amount" stackId="b" fill="#b2d8d8" />
        </BarChart>

        {/* <AreaChart
          data={budgetList}
          margin={{ top: 7, }}
        >
          <defs>
            <linearGradient id="totalSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="amount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalSpend"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart> */}
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
