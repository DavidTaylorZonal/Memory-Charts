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

  const dojoCardCV = calculateRelativeChanges([
    0, 13, 9, 1, -1, 0, -4, 4, 2, -1, -1, 2, 2, -1, 6, 1, -3, 3, 1, -7, 5, 1, 4,
    6, -5, 1, 0, -2, 5, 0, -2, 2, 4, 4, -3, 6, -1, -4, -2, 13, -4, -4, 10, -4,
    0, 6, -3, 0, -8, 14,
  ]);

  const dojoCardNV = calculateRelativeChanges([
    0, 48, 0, -9, -5, -6, -3, 8, -3, 1, 1, -2, -6, 6, 1, 0, 1, 0, 1, -1, 2, 3,
    5, 2, -4, 0, 4, -1, 2, -1, -2, 4, 2, 0, 3, -1, 0, 8, -6, 5, 1, 2, -5, 8, -2,
    -4, 6, -2, 3, -3,
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Dojo release 2.1.0 Prod version
      </h2>
      <div className="space-y-4 text-gray-700">
        <p>
          We are currently utilising Dojo for testing while awaiting
          FreedomPay's resolution of the CastleChannel memory issue in their
          SDK. Based on this situation, we determined it would be beneficial to
          demonstrate the memory improvements achieved through Dojo payments.
        </p>

        <p>
          Test scenario: Conducted using a Dojo mobiGo2 device, executing 50
          payment transactions through iServe.
        </p>
      </div>
      <div className="h-96 pl-10">
        <LineChart width={800} height={400} className="mt-4">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="iteration"
            type="number"
            domain={[1, 20]}
            tickCount={20}
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
            data={dojoCardCV}
            type="monotone"
            dataKey="change"
            stroke="#82ca9d"
            name="Release Version"
            strokeWidth={2}
          />
          <Line
            data={dojoCardNV}
            type="monotone"
            dataKey="change"
            stroke="#f65ef1"
            name="New Version"
            strokeWidth={2}
          />
        </LineChart>
      </div>
      <div className="mt-10">
        <MemoryChangeChart />
      </div>
    </div>
  );
};

export default RelativeMemoryChart;
