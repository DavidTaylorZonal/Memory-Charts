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
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Key Findings</h2>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">
              Current Architecture
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Initial Memory: 208MB → Final: 263MB</li>
              <li className="text-red-600 font-medium">
                Net Change: +55MB increase
              </li>
              <li>Shows consistent upward trend</li>
              <li>Requires storage clearing to manage memory</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-600">
              New Architecture (OP-SQLite)
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Initial Memory: 244MB → Final: 261MB</li>
              <li className="text-green-600 font-medium">
                Net Change: +17MB increase (with Redux Persist still present)
              </li>
              <li>Demonstrates more stable behavior</li>
              <li>Shows potential for significant improvement</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold mb-2">Bottom Line</h3>
          <p className="text-gray-700">
            This Proof of Concept demonstrates that the new OP-SQLite
            architecture provides improved memory management even while running
            alongside Redux Persist. The current system shows concerning memory
            growth of +55MB, while the new architecture limits this to only
            +17MB under the same conditions.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-md font-semibold text-blue-800">
              Future Improvement Potential
            </h4>
            <p className="text-blue-900">
              Once Redux Persist is fully removed, we expect to eliminate the
              remaining 17MB memory increase entirely. This POC suggests that a
              complete migration to OP-SQLite will provide optimal memory
              management and eliminate the need for manual storage clearing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelativeMemoryChart;
