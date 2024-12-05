import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TooltipData {
  name: string;
  start: number;
  end: number;
  change: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: TooltipData;
  }[];
  label?: string;
}

const MemoryChangeChart = () => {
  const memoryChanges = [
    {
      name: "Total Memory",
      start: 234,
      end: 287,
      change: 287 - 234,
    },
    {
      name: "Java Heap",
      start: 16,
      end: 49,
      change: 49 - 16,
    },
    {
      name: "Native Heap",
      start: 68,
      end: 72,
      change: 72 - 68,
    },
    {
      name: "Code",
      start: 57,
      end: 162,
      change: 162 - 57,
    },
    {
      name: "Graphics",
      start: 12,
      end: 12,
      change: 0,
    },
    {
      name: "Private Other",
      start: 99,
      end: 101,
      change: 2,
    },
  ].sort((a, b) => b.change - a.start);

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-semibold">{data.name}</p>
          <p>Start: {data.start} MB</p>
          <p>End: {data.end} MB</p>
          <p className="font-semibold">
            Change: {data.change > 0 ? "+" : ""}
            {data.change} MB
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full p-4">
      <h3 className="text-xl font-semibold mb-6">
        Memory Changes Analysis (MB)
      </h3>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={memoryChanges} layout="vertical">
            <XAxis
              type="number"
              domain={[
                0,
                Math.max(
                  ...memoryChanges.map((d) => Math.max(d.start, d.end))
                ) + 10,
              ]}
            />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="start" stackId="a" fill="#94a3b8">
              {memoryChanges.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#94a3b8" />
              ))}
            </Bar>
            <Bar dataKey="change" stackId="a">
              {memoryChanges.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change > 0 ? "#ef4444" : "#22c55e"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex gap-4 justify-end">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#94a3b8]"></div>
          <span>Initial Memory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#ef4444]"></div>
          <span>Memory Increase</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#22c55e]"></div>
          <span>Memory Decrease</span>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Memory Analysis Summary:
        </h3>
        <div className="space-y-4 text-gray-600">
          <p>
            Overall memory usage increased by{" "}
            <span className="font-semibold text-red-600">53 MB</span> (234 MB →
            287 MB)
          </p>
          <p>Largest increases were observed in:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Code section:{" "}
              <span className="font-semibold text-red-600">+105 MB</span> (57 MB
              → 162 MB)
            </li>
            <li>
              Java Heap:{" "}
              <span className="font-semibold text-red-600">+33 MB</span> (16 MB
              → 49 MB)
            </li>
            <li>
              Native Heap:{" "}
              <span className="font-semibold text-red-600">+4 MB</span> (68 MB →
              72 MB)
            </li>
          </ul>
          <p>
            The <span className="font-semibold">Code section</span> showed the
            most significant growth, accounting for approximately 66% of the
            total memory increase. This could indicate potential areas for
            optimization in code loading or caching strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoryChangeChart;
