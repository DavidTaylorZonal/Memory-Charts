"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import FeatureTable from "../../components/feature-completion";

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.push("/")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Memory Charts
      </button>
      <h1 className="text-2xl font-bold mb-6">Features Remaining</h1>
      <FeatureTable />
    </div>
  );
}
