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

  const updatedOldArch = [
    { iteration: 5, memory: 218 },
    { iteration: 10, memory: 219 },
    { iteration: 15, memory: 215 },
    { iteration: 20, memory: 220 },
    { iteration: 25, memory: 235 },
    { iteration: 30, memory: 240 },
    { iteration: 35, memory: 236 },
    { iteration: 40, memory: 251 },
    { iteration: 45, memory: 260 },
    { iteration: 50, memory: 263 },
  ];

  const updatedNewDatabase = [
    { iteration: 5, memory: 235 },
    { iteration: 10, memory: 233 },
    { iteration: 15, memory: 233 },
    { iteration: 20, memory: 242 },
    { iteration: 25, memory: 242 },
    { iteration: 30, memory: 244 },
    { iteration: 35, memory: 249 },
    { iteration: 40, memory: 257 },
    { iteration: 45, memory: 258 },
    { iteration: 50, memory: 263 },
  ];

  const opSqliteNewArch = [
    { iteration: 5, memory: 233 },
    { iteration: 10, memory: 234 },
    { iteration: 15, memory: 241 },
    { iteration: 20, memory: 244 },
    { iteration: 25, memory: 250 },
    { iteration: 30, memory: 252 },
    { iteration: 35, memory: 283 },
    { iteration: 40, memory: 260 },
    { iteration: 45, memory: 296 },
    { iteration: 50, memory: 265 },
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
                data={updatedOldArch}
                type="monotone"
                dataKey="memory"
                stroke="#2563eb"
                name="Legacy Architecture"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                data={updatedNewDatabase}
                type="monotone"
                dataKey="memory"
                stroke="#dc2626"
                name="New Architecture"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                data={opSqliteNewArch}
                type="monotone"
                dataKey="memory"
                stroke="#059669"
                name="OpSQLite Architecture"
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
                data={updatedOldArch}
                type="monotone"
                dataKey="memory"
                fill="#2563eb"
                fillOpacity={0.1}
                stroke="none"
                name="Legacy Growth Area"
              />
              <Area
                data={updatedNewDatabase}
                type="monotone"
                dataKey="memory"
                fill="#dc2626"
                fillOpacity={0.1}
                stroke="none"
                name="New Growth Area"
              />
              <Area
                data={opSqliteNewArch}
                type="monotone"
                dataKey="memory"
                fill="#059669"
                fillOpacity={0.1}
                stroke="none"
                name="OpSQLite Growth Area"
              />
              <Line
                data={updatedOldArch}
                type="monotone"
                dataKey="memory"
                stroke="#2563eb"
                name="Legacy Architecture"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                data={updatedNewDatabase}
                type="monotone"
                dataKey="memory"
                stroke="#dc2626"
                name="New Architecture"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                data={opSqliteNewArch}
                type="monotone"
                dataKey="memory"
                stroke="#059669"
                name="OpSQLite Architecture"
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
              data={updatedOldArch.map((item, index) => ({
                iteration: item.iteration,
                legacy: item.memory,
                new: updatedNewDatabase[index].memory,
                opsqlite: opSqliteNewArch[index].memory,
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
              <Bar
                dataKey="opsqlite"
                fill="#059669"
                name="OpSQLite Architecture"
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
