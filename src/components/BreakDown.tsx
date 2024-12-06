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
  const memoryChangesCV = [
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

  //   Java Heap:    11556 KB -> 11.29 MB | 45056 KB -> 44.00 MB
  // Native Heap:  98536 KB -> 96.23 MB | 101340 KB -> 98.96 MB
  // Code:         61156 KB -> 59.72 MB | 178756 KB -> 174.57 MB
  // Stack:        2152 KB -> 2.10 MB | 2172 KB -> 2.12 MB
  // Graphics:     26774 KB -> 26.15 MB | 26774 KB -> 26.15 MB

  const memoryChangesNV = [
    {
      name: "Total Memory",
      start: 266,
      end: 319,
      change: 319 - 266,
    },
    {
      name: "Java Heap",
      start: 11,
      end: 44,
      change: 44 - 11,
    },
    {
      name: "Native Heap",
      start: 96,
      end: 98,
      change: 98 - 96,
    },
    {
      name: "Code",
      start: 59,
      end: 174,
      change: 174 - 59,
    },
    {
      name: "Graphics",
      start: 26,
      end: 26,
      change: 0,
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
        Memory Changes Analysis (MB) - Current release version
      </h3>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={memoryChangesCV} layout="vertical">
            <XAxis
              type="number"
              domain={[
                0,
                Math.max(
                  ...memoryChangesCV.map((d) => Math.max(d.start, d.end))
                ) + 10,
              ]}
            />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="start" stackId="a" fill="#94a3b8">
              {memoryChangesCV.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#94a3b8" />
              ))}
            </Bar>
            <Bar dataKey="change" stackId="a">
              {memoryChangesCV.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change > 0 ? "#ef4444" : "#22c55e"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h3 className="text-xl font-semibold mb-6">
        Memory Changes Analysis (MB) - New version
      </h3>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={memoryChangesNV} layout="vertical">
            <XAxis
              type="number"
              domain={[
                0,
                Math.max(
                  ...memoryChangesNV.map((d) => Math.max(d.start, d.end))
                ) + 10,
              ]}
            />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="start" stackId="a" fill="#94a3b8">
              {memoryChangesNV.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#94a3b8" />
              ))}
            </Bar>
            <Bar dataKey="change" stackId="a">
              {memoryChangesNV.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change > 0 ? "#ef4444" : "#22c55e"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Memory Analysis Comparison
        </h3>
        <div className="space-y-6 text-gray-600">
          <div>
            <h4 className="font-medium mb-2">Memory Pattern Analysis:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Old Version: Shows erratic memory recovery with concerning
                upward trend
              </li>
              <li>
                New Version: Demonstrates better memory recovery after spikes,
                maintaining stable baseline
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Java Heap Management:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Old Version: Higher usage (16,344 KB → 49,804 KB)</li>
              <li>New Version: More efficient (11,556 KB → 45,056 KB)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">
              Key Improvements in New Version:
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Better memory cleanup after operations</li>
              <li>More efficient Java heap usage</li>
              <li>No memory leak warnings</li>
              <li>More predictable memory patterns</li>
              <li>Better recovery after memory spikes</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Stability Comparison:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Old Version: Ended with concerning 14MB increase in final
                iteration
              </li>
              <li>
                New Version: Ended with controlled -3MB decrease, showing better
                cleanup
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Recommendation:</h4>
            <p className="bg-green-50 p-4 rounded border border-green-200">
              Proceed with the new version. Despite higher initial memory usage,
              it demonstrates more mature memory management patterns, better
              cleanup behavior, and more stable long-term performance
              characteristics. The absence of memory leak warnings and
              consistent recovery patterns indicate better reliability in
              production environments.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-4 justify-end">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#94a3b8]"></div>
          <span>Baseline Memory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#82ca9d]"></div>
          <span>Release Version</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#f65ef1]"></div>
          <span>New Version</span>
        </div>
      </div>
    </div>
  );
};

export default MemoryChangeChart;
