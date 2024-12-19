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
  const memoryChangesCurrentVersion = [
    {
      name: "Total Memory",
      start: 208,
      end: 263,
      change: 55,
    },
    {
      name: "Java Heap",
      start: 18,
      end: 208,
      change: 190,
    },
    {
      name: "Native Heap",
      start: 60,
      end: 704,
      change: 644,
    },
    {
      name: "Code",
      start: 42,
      end: 44,
      change: 2,
    },
    {
      name: "Graphics",
      start: 18,
      end: 856,
      change: 838,
    },
    {
      name: "Private Other",
      start: 96,
      end: 4,
      change: -92,
    },
    {
      name: "System",
      start: 13,
      end: 462,
      change: 449,
    },
  ].sort((a, b) => b.change - a.start);

  const newDatabase = [
    {
      name: "Total Memory",
      start: 244,
      end: 261,
      change: 17,
    },
    {
      name: "Java Heap",
      start: 18,
      end: 208,
      change: 190,
    },
    {
      name: "Native Heap",
      start: 60,
      end: 704,
      change: 644,
    },
    {
      name: "Code",
      start: 42,
      end: 44,
      change: 2,
    },
    {
      name: "Graphics",
      start: 18,
      end: 856,
      change: 838,
    },
    {
      name: "Private Other",
      start: 96,
      end: 4,
      change: -92,
    },
    {
      name: "System",
      start: 13,
      end: 462,
      change: 449,
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
          <BarChart data={memoryChangesCurrentVersion} layout="vertical">
            <XAxis
              type="number"
              domain={[
                0,
                Math.max(
                  ...memoryChangesCurrentVersion.map((d) =>
                    Math.max(d.start, d.end)
                  )
                ) + 10,
              ]}
            />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="start" stackId="a" fill="#94a3b8">
              {memoryChangesCurrentVersion.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#94a3b8" />
              ))}
            </Bar>
            <Bar dataKey="change" stackId="a">
              {memoryChangesCurrentVersion.map((entry, index) => (
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
        Memory Changes Analysis (MB) - New Datebase using (op-sqlite)
      </h3>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={newDatabase} layout="vertical">
            <XAxis
              type="number"
              domain={[
                0,
                Math.max(...newDatabase.map((d) => Math.max(d.start, d.end))) +
                  10,
              ]}
            />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="start" stackId="a" fill="#94a3b8">
              {newDatabase.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#94a3b8" />
              ))}
            </Bar>
            <Bar dataKey="change" stackId="a">
              {newDatabase.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change > 0 ? "#ef4444" : "#22c55e"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemoryChangeChart;
