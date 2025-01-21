import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

type Status = "Ready for Dev" | "Active" | "Done" | "Ready for Test";

interface Feature {
  name: string;
  status: Status;
}

type SortField = "name" | "status" | null;
type SortDirection = "asc" | "desc";

const getStatusColor = (status: Status): string => {
  switch (status) {
    case "Ready for Dev":
      return "bg-red-100";
    case "Ready for Test":
      return "bg-amber-100";
    case "Done":
      return "bg-green-100";
    default:
      return "bg-gray-100";
  }
};

const initialFeatures: Feature[] = [
  {
    name: "Add items to basket",
    status: "Ready for Test",
  },
  {
    name: "Make product choices",
    status: "Ready for Test",
  },
  { name: "Nested choices", status: "Ready for Test" },
  {
    name: "Out of stock info top level",
    status: "Ready for Test",
  },
  {
    name: "Out of stock info choices",
    status: "Ready for Test",
  },
  {
    name: "Product portions",
    status: "Ready for Test",
  },
  {
    name: "Long hold to modify",
    status: "Ready for Test",
  },
  { name: "Repeat product", status: "Ready for Test" },
  {
    name: "Repeat item with choices",
    status: "Ready for Test",
  },
  { name: "Anded products", status: "Ready for Test" },
  {
    name: "Adding a message to a product",
    status: "Ready for Test",
  },
  { name: "Instructions", status: "Ready for Test" },
  { name: "Product Search", status: "Ready for Test" },
  {
    name: "Remove item from Basket (1 or many)",
    status: "Ready for Test",
  },
  { name: "Open an account", status: "Ready for Test" },
  {
    name: "Assign cover count, respecting config",
    status: "Ready for Test",
  },
  {
    name: "Assign guest name, respecting config",
    status: "Ready for Test",
  },
  {
    name: "Accounts location/tables screen",
    status: "Ready for Test",
  },
  {
    name: "View account number",
    status: "Ready for Test",
  },
  {
    name: "User Options after paying/Closing account",
    status: "Ready for Test",
  },
  {
    name: "View open accounts",
    status: "Ready for Test",
  },
  {
    name: "Move account to a different location",
    status: "Ready for Test",
  },
  {
    name: "Pay for an account",
    status: "Ready for Test",
  },
  {
    name: "Cash payment ZCF",
    status: "Ready for Test",
  },
  { name: "Printing bill", status: "Ready for Test" },
  {
    name: "Preset cash denominations at payment",
    status: "Ready for Test",
  },
  {
    name: "Payment success/failed displayed",
    status: "Ready for Test",
  },
  {
    name: "Loyalty basket presentation",
    status: "Ready for Test",
  },
  {
    name: "Voucher basket presentation",
    status: "Ready for Test",
  },
  {
    name: "Discount basket presentation",
    status: "Ready for Test",
  },
  {
    name: "Tax basket presentation",
    status: "Ready for Test",
  },
  {
    name: "Service charge presentation",
    status: "Ready for Test",
  },
  { name: "Send an order", status: "Ready for Test" },
  {
    name: "Pick up an order",
    status: "Ready for Test",
  },
  {
    name: "Move item to different account",
    status: "Ready for Test",
  },
  {
    name: "Log in using employee service",
    status: "Ready for Test",
  },
  { name: "Age check", status: "Ready for Test" },
  {
    name: "Delete item (1 or many)",
    status: "Ready for Test",
  },
  { name: "Set Quantity", status: "Ready for Test" },
  { name: "Device info", status: "Ready for Test" },
  {
    name: "Mobile & tablet modes",
    status: "Ready for Test",
  },
  {
    name: "Pair device to site",
    status: "Ready for Test",
  },
  {
    name: "Printer selection",
    status: "Ready for Test",
  },
  {
    name: "Adding a message to a choice or child product line",
    status: "Ready for Test",
  },
  {
    name: "Standard portions as default",
    status: "Ready for Test",
  },
  {
    name: "Set order destination",
    status: "Ready for Test",
  },
  { name: "Part payments", status: "Ready for Test" },
  {
    name: "Service charge selection",
    status: "Ready for Test",
  },
  {
    name: "Redeeming loyalty and voucher",
    status: "Ready for Test",
  },
  {
    name: "Reprint card slips",
    status: "Ready for Test",
  },
  {
    name: "Printing receipt",
    status: "Ready for Test",
  },
  { name: "Ledger payments", status: "Ready for Test" },
  {
    name: "Different currency payments",
    status: "Ready for Test",
  },
  {
    name: "ZCPS payments (Ocius)",
    status: "Ready for Test",
  },
  { name: "Cheque payment", status: "Ready for Test" },
  {
    name: "Gift Card payments",
    status: "Ready for Test",
  },
  {
    name: "Per Guest ordering",
    status: "Ready for Test",
  },
  {
    name: "Displaying held items",
    status: "Ready for Test",
  },
  {
    name: "Delayed ordering",
    status: "Ready for Test",
  },
  {
    name: "Respects product division",
    status: "Ready for Test",
  },
  { name: "Offline mode", status: "Ready for Test" },
  {
    name: "Role based permissions",
    status: "Ready for Test",
  },
  {
    name: "Respects tableDetailsConfig",
    status: "Ready for Test",
  },
  {
    name: "Manager Functions (define)",
    status: "Ready for Test",
  },
  {
    name: "Table only workflow",
    status: "Ready for Test",
  },
  { name: "iZone tables", status: "Ready for Test" },
  {
    name: "View network diagnostics",
    status: "Ready for Test",
  },
  {
    name: "Automatic discovery",
    status: "Ready for Test",
  },
  {
    name: "Additional Customer Info Prompt",
    status: "Ready for Test",
  },
  {
    name: "All in one payment (FreedomPay)",
    status: "Ready for Test",
  },
  { name: "Discounts", status: "Ready for Test" },
  {
    name: "All in one (Chip and Pin payments)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Contactless Payments)",
    status: "Ready for Test",
  },
  {
    name: "All in one (PIN on Glass to verify payments over £100)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Split a payment by a custom amount)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Split a payment by x number of customers)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Tips based on suggested tip from Aztec)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Custom tip amount)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Print merchant receipt from device printer)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Print customer receipt from device printer)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Print merchant receipt from Aztec printer)",
    status: "Ready for Test",
  },
  {
    name: "All in one (Print customer receipt from Aztec printer)",
    status: "Ready for Test",
  },
];

const FeatureTable: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showOnlyReadyForDev, setShowOnlyReadyForDev] = useState(false);
  const [showOnlyReadyForTesting, setShowOnlyReadyForTesting] = useState(false);

  const handleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    const sortedFeatures = [...features].sort((a, b) => {
      if (!field) return 0;
      if (sortDirection === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });

    setFeatures(sortedFeatures);
  };

  const handleStatusChange = (index: number) => {
    const newFeatures = [...features];
    const currentStatus = newFeatures[index].status;
    const statusOrder: Status[] = ["Ready for Dev", "Ready for Test", "Done"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    newFeatures[index].status = nextStatus;
    setFeatures(newFeatures);
  };

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch = feature.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (showOnlyReadyForDev && showOnlyReadyForTesting) {
      return (
        matchesSearch &&
        (feature.status === "Ready for Dev" ||
          feature.status === "Ready for Test")
      );
    } else if (showOnlyReadyForDev) {
      return matchesSearch && feature.status === "Ready for Dev";
    } else if (showOnlyReadyForTesting) {
      return matchesSearch && feature.status === "Ready for Test";
    }
    return matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="readyForDevToggle"
            checked={showOnlyReadyForDev}
            onChange={(e) => setShowOnlyReadyForDev(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="readyForDevToggle"
            className="text-sm font-medium text-gray-700"
          >
            Show only Ready for Dev
          </label>
          <input
            type="checkbox"
            id="readyForTestingToggle"
            checked={showOnlyReadyForTesting}
            onChange={(e) => setShowOnlyReadyForTesting(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="readyForTestingToggle"
            className="text-sm font-medium text-gray-700"
          >
            Show only Ready for Testing
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search features..."
            className="w-full p-2 border rounded pl-10"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Feature Name
                {sortField === "name" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="inline ml-1" size={16} />
                  ) : (
                    <ChevronDown className="inline ml-1" size={16} />
                  ))}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredFeatures.map((feature, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {feature.name}
                </td>
                <td
                  className={`px-6 py-4 text-sm text-gray-900 cursor-pointer ${getStatusColor(feature.status)}`}
                  onClick={() => handleStatusChange(index)}
                >
                  {feature.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureTable;
