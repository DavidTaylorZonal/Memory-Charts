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
  memory: number;
  change: number;
}

export const RelativeMemoryChart: React.FC = () => {
  const oldArch: DataPoint[] = [
    { iteration: 5, memory: 231, change: 23 },
    { iteration: 10, memory: 220, change: 12 },
    { iteration: 15, memory: 231, change: 23 },
    { iteration: 20, memory: 229, change: 21 },
    { iteration: 25, memory: 232, change: 24 },
    { iteration: 30, memory: 241, change: 33 },
    { iteration: 35, memory: 236, change: 28 },
    { iteration: 40, memory: 251, change: 43 },
    { iteration: 45, memory: 257, change: 49 },
    { iteration: 50, memory: 255, change: 47 },
  ];

  const newDatabase: DataPoint[] = [
    { iteration: 5, memory: 231, change: -30 },
    { iteration: 10, memory: 231, change: -30 },
    { iteration: 15, memory: 238, change: -23 },
    { iteration: 20, memory: 216, change: -45 },
    { iteration: 25, memory: 240, change: -21 },
    { iteration: 30, memory: 245, change: -16 },
    { iteration: 35, memory: 249, change: -12 },
    { iteration: 40, memory: 252, change: -9 },
    { iteration: 45, memory: 255, change: -6 },
    { iteration: 50, memory: 261, change: 0 },
  ];

  return (
    <div className="w-full space-y-8">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Memory Usage Analysis
        </h2>
        <div className="text-gray-700 mb-4">
          <p>Memory usage comparison across 50 iterations</p>
        </div>
        <div className="h-96">
          <LineChart
            width={800}
            height={400}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="iteration"
              type="number"
              domain={[0, 50]}
              tickCount={11}
              stroke="#666"
            />
            <YAxis
              domain={[-50, 50]}
              label={{
                value: "Memory Change (MB)",
                angle: -90,
                position: "insideLeft",
                offset: -10,
              }}
              stroke="#666"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
              labelStyle={{ color: "#666" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              data={oldArch}
              type="monotone"
              dataKey="change"
              stroke="#2563eb"
              name="Legacy Architecture"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              data={newDatabase}
              type="monotone"
              dataKey="change"
              stroke="#dc2626"
              name="New Architecture"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <MemoryChangeChart />
      </div>
    </div>
  );
};

export default RelativeMemoryChart;
