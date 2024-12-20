import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ReferenceLine,
} from "recharts";

const MemoryVisualizationOptions = () => {
  const [activeTab, setActiveTab] = useState("absolute");

  const oldArch = [
    { iteration: 5, memory: 231, change: 23, absoluteMemory: 231 },
    { iteration: 10, memory: 220, change: 12, absoluteMemory: 220 },
    { iteration: 15, memory: 231, change: 23, absoluteMemory: 231 },
    { iteration: 20, memory: 229, change: 21, absoluteMemory: 229 },
    { iteration: 25, memory: 232, change: 24, absoluteMemory: 232 },
    { iteration: 30, memory: 241, change: 33, absoluteMemory: 241 },
    { iteration: 35, memory: 236, change: 28, absoluteMemory: 236 },
    { iteration: 40, memory: 251, change: 43, absoluteMemory: 251 },
    { iteration: 45, memory: 257, change: 49, absoluteMemory: 257 },
    { iteration: 50, memory: 255, change: 47, absoluteMemory: 255 },
  ];

  const newDatabase = [
    { iteration: 5, memory: 231, change: -30, absoluteMemory: 214 },
    { iteration: 10, memory: 231, change: -30, absoluteMemory: 214 },
    { iteration: 15, memory: 238, change: -23, absoluteMemory: 221 },
    { iteration: 20, memory: 216, change: -45, absoluteMemory: 199 },
    { iteration: 25, memory: 240, change: -21, absoluteMemory: 223 },
    { iteration: 30, memory: 245, change: -16, absoluteMemory: 228 },
    { iteration: 35, memory: 249, change: -12, absoluteMemory: 232 },
    { iteration: 40, memory: 252, change: -9, absoluteMemory: 235 },
    { iteration: 45, memory: 255, change: -6, absoluteMemory: 238 },
    { iteration: 50, memory: 261, change: 0, absoluteMemory: 244 },
  ];

  return (
    <div className="w-full space-y-8">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "absolute"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("absolute")}
        >
          Absolute Memory
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "composed"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("composed")}
        >
          Combined View
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "bar"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("bar")}
        >
          Bar Comparison
        </button>
      </div>

      {activeTab === "absolute" && (
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Absolute Memory Usage
          </h2>
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
                domain={[180, 280]}
                label={{
                  value: "Memory Usage (MB)",
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
              />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine
                y={208}
                stroke="#666"
                strokeDasharray="3 3"
                label="Initial Memory (208MB)"
              />
              <Line
                data={oldArch}
                type="monotone"
                dataKey="absoluteMemory"
                stroke="#2563eb"
                name="Legacy Architecture"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                data={newDatabase}
                type="monotone"
                dataKey="absoluteMemory"
                stroke="#dc2626"
                name="New Architecture"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </div>
        </div>
      )}

      {activeTab === "composed" && (
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Memory Usage with Growth Area
          </h2>
          <div className="h-96">
            <ComposedChart
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
              />
              <YAxis
                domain={[180, 280]}
                label={{
                  value: "Memory (MB)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine
                y={208}
                stroke="#666"
                strokeDasharray="3 3"
                label="Initial Memory (208MB)"
              />
              <Area
                data={oldArch}
                type="monotone"
                dataKey="absoluteMemory"
                fill="#2563eb"
                fillOpacity={0.1}
                stroke="none"
                name="Legacy Growth Area"
              />
              <Area
                data={newDatabase}
                type="monotone"
                dataKey="absoluteMemory"
                fill="#dc2626"
                fillOpacity={0.1}
                stroke="none"
                name="New Growth Area"
              />
              <Line
                data={oldArch}
                type="monotone"
                dataKey="absoluteMemory"
                stroke="#2563eb"
                name="Legacy Architecture"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                data={newDatabase}
                type="monotone"
                dataKey="absoluteMemory"
                stroke="#dc2626"
                name="New Architecture"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </div>
        </div>
      )}

      {activeTab === "bar" && (
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Memory Usage Comparison
          </h2>
          <div className="h-96">
            <BarChart
              width={800}
              height={400}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              data={oldArch.map((item, index) => ({
                iteration: item.iteration,
                legacy: item.absoluteMemory,
                new: newDatabase[index].absoluteMemory,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="iteration"
                type="number"
                domain={[0, 50]}
                tickCount={11}
              />
              <YAxis
                domain={[180, 280]}
                label={{
                  value: "Memory (MB)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine
                y={208}
                stroke="#666"
                strokeDasharray="3 3"
                label="Initial Memory (208MB)"
              />
              <Bar
                dataKey="legacy"
                fill="#2563eb"
                name="Legacy Architecture"
                barSize={20}
              />
              <Bar
                dataKey="new"
                fill="#dc2626"
                name="New Architecture"
                barSize={20}
              />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryVisualizationOptions;
