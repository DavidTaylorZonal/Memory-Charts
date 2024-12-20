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
  const kbToMb = (kb: number) => Math.round(kb / 1024);

  const memoryChangesCurrentVersion = [
    {
      name: "Total Memory",
      start: 208,
      end: 263,
      change: 55,
    },
    {
      name: "Java Heap",
      start: kbToMb(18208),
      end: kbToMb(18208),
      change: 0,
    },
    {
      name: "Native Heap",
      start: kbToMb(60704),
      end: kbToMb(60704),
      change: 0,
    },
    {
      name: "Code",
      start: kbToMb(42044),
      end: kbToMb(42044),
      change: 0,
    },
    {
      name: "Graphics",
      start: kbToMb(18856),
      end: kbToMb(18856),
      change: 0,
    },
    {
      name: "Private Other",
      start: kbToMb(96004),
      end: kbToMb(96004),
      change: 0,
    },
    {
      name: "System",
      start: kbToMb(13462),
      end: kbToMb(13462),
      change: 0,
    },
  ].sort((a, b) => b.change - a.start);

  const newDatabase = [
    {
      name: "Total Memory",
      start: 261,
      end: 239,
      change: -22,
    },
    {
      name: "Java Heap",
      start: kbToMb(12784),
      end: kbToMb(12784),
      change: 0,
    },
    {
      name: "Native Heap",
      start: kbToMb(60664),
      end: kbToMb(60664),
      change: 0,
    },
    {
      name: "Code",
      start: kbToMb(41144),
      end: kbToMb(41144),
      change: 0,
    },
    {
      name: "Graphics",
      start: kbToMb(23432),
      end: kbToMb(23432),
      change: 0,
    },
    {
      name: "Private Other",
      start: kbToMb(92712),
      end: kbToMb(92712),
      change: 0,
    },
    {
      name: "System",
      start: kbToMb(12852),
      end: kbToMb(12852),
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
