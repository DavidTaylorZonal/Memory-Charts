"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import MemoryChangeChart from "./BreakDown";

interface DataPoint {
  iteration: number;
  change: number;
}

export const RelativeMemoryChart: React.FC = () => {
  const calculateRelativeChanges = (data: number[]): DataPoint[] => {
    const baseline = data[0];
    return data.map((change, index) => ({
      iteration: index + 1,
      change: change - baseline,
    }));
  };

  const cashPaymentWrapper = calculateRelativeChanges([
    0, 13, 9, 1, -1, 0, -4, 4, 2, -1, -1, 2, 2, -1, 6, 1, -3, 3, 1, -7, 5, 1, 4,
    6, -5, 1, 0, -2, 5, 0, -2, 2, 4, 4, -3, 6, -1, -4, -2, 13, -4, -4, 10, -4,
    0, 6, -3, 0, -8, 14,
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Dojo release 2.1.0 Prod version
      </h2>
      <p>Taking 50 card payments</p>
      <div className="h-96">
        <LineChart width={800} height={400} className="mt-4">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="iteration"
            type="number"
            domain={[1, 20]}
            tickCount={20}
            label={{ value: "Iteration", position: "bottom" }}
          />
          <YAxis
            domain={[-10, 30]}
            label={{
              value: "Memory Change (MB)",
              angle: -90,
              position: "left",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            data={cashPaymentWrapper}
            type="monotone"
            dataKey="change"
            stroke="#82ca9d"
            name=""
            strokeWidth={2}
          />
        </LineChart>
      </div>

      <MemoryChangeChart />
    </div>
  );
};

export default RelativeMemoryChart;
