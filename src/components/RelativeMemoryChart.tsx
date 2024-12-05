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
    0, 31, 0, -7, 0, -9, 16, -7, -4, -7, 19, -8, -7, -2, 1, 5, -4, 4, -4, 4, -1,
    4, 0, 1, -1, -4, 3, 3, -3, -2, 8, -4, 10, -6, 2, -2, -8, -10, 21, -2, 3, -4,
    2, -7, 3, 5, 1, -2, -3, 5,
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Memory Change Analysis (Relative to Baseline)
      </h2>
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
          {/* <Line
            data={reduxPersistChanges}
            type="monotone"
            dataKey="change"
            stroke="#8884d8"
            name="Redux Persist"
            strokeWidth={2}
          /> */}
          {/* <Line
            data={middlewareChanges}
            type="monotone"
            dataKey="change"
            stroke="#82ca9d"
            name="Middleware"
            strokeWidth={2}
          /> */}
          <Line
            data={cashPaymentWrapper}
            type="monotone"
            dataKey="change"
            stroke="#82ca9d"
            name="Middleware"
            strokeWidth={2}
          />
        </LineChart>
      </div>
      {/* <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Analysis:</h3>
        <ul className="list-disc ml-6 mt-2 text-gray-600">
          <li>
            Middleware Solution:
            <ul className="ml-4 list-disc">
              <li>Average Memory Change: +7.15MB</li>
              <li>Maximum Spike: +25MB</li>
              <li>More consistent memory pattern</li>
            </ul>
          </li>
          <li>
            Redux Persist:
            <ul className="ml-4 list-disc">
              <li>Average Memory Change: +16.8MB</li>
              <li>Maximum Spike: +29MB</li>
              <li>Shows more volatility in memory usage</li>
            </ul>
          </li>
          <li>
            Recommendation: The Middleware solution appears to be the better
            choice because:
            <ul className="ml-4 list-disc">
              <li>Lower average memory overhead</li>
              <li>More predictable memory pattern</li>
              <li>Fewer extreme spikes and drops</li>
            </ul>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default RelativeMemoryChart;
