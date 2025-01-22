"use client";

import React from "react";

import MemoryVisualizationOptions from "./MemoryVisualizationOptions";
import { useRouter } from "next/navigation";

export const RelativeMemoryChart: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full space-y-8">
      <button
        onClick={() => router.push("/features")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Features Remaining
      </button>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Memory Usage Analysis
        </h2>
        <div className="text-gray-700 mb-4">
          <p>Memory usage comparison across 50 iterations</p>
        </div>
        <MemoryVisualizationOptions />
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Memory Leak Resolution ⚡
        </h2>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">
              Old System (iServe)
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Initial Memory: 218MB → Final: 263MB</li>
              <li className="text-red-600 font-medium">
                Net Change: +45MB increase
              </li>
              <li>Shows unstable memory growth</li>
              <li>Struggles with large datasets</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-600">
              New System (OP-SQLite)
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Initial Memory: 254MB → Final: 257MB</li>
              <li className="text-green-600 font-medium">
                Net Change: +3MB increase
              </li>
              <li>Demonstrates stable behavior</li>
              <li>Handles Zonal&apos;s large datasets</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold mb-2">Current Status</h3>
          <p className="text-gray-700">
            Migration to OP-SQLite has successfully stabilized memory usage.
            Testing confirms significantly improved performance with only 3MB
            growth vs previous 45MB growth over 50 transactions.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-md font-semibold text-blue-800">
              Remaining Challenge
            </h4>
            <p className="text-blue-900">
              ZCF polling continues to impact memory. Working with Product Owner
              on two potential solutions: 1) Remove polling while maintaining
              UX, or 2) Implement socket notifications for theme updates, MOA
              terminal status, and ZCF availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelativeMemoryChart;
