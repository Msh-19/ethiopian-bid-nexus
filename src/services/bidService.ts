
import { Bid } from "@/types";

// Mock bids data
const mockBids: Bid[] = [
  {
    id: "bid-001",
    title: "School Construction Project",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week from now
    status: "OPEN",
    category: "Construction",
    budget: 1500000,
    description: "Construction of a new primary school in Addis Ababa with 12 classrooms, administration block, and sports facilities.",
    documents: ["requirements.pdf", "blueprints.pdf"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    organizationId: "org-001",
    organizationName: "Ministry of Education"
  },
  {
    id: "bid-002",
    title: "Medical Supplies Procurement",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(), // 2 weeks from now
    status: "OPEN",
    category: "Healthcare",
    budget: 750000,
    description: "Supply of essential medical equipment and medicines for rural health centers across Ethiopia.",
    documents: ["inventory.pdf", "specifications.pdf"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    organizationId: "org-002",
    organizationName: "Ministry of Health"
  },
  {
    id: "bid-003",
    title: "Solar Power Installation",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days from now
    status: "OPEN",
    category: "Energy",
    budget: 2000000,
    description: "Installation of solar panels for 20 government buildings in Hawassa to reduce energy costs.",
    documents: ["technical_specs.pdf", "installation_requirements.pdf"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    organizationId: "org-003",
    organizationName: "Ministry of Energy"
  },
  {
    id: "bid-004",
    title: "Road Rehabilitation Project",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(), // 3 weeks from now
    status: "OPEN",
    category: "Infrastructure",
    budget: 5000000,
    description: "Rehabilitation of 25km of highway between Dire Dawa and Harar including drainage systems and signage.",
    documents: ["project_scope.pdf", "contract_terms.pdf"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    organizationId: "org-004",
    organizationName: "Ministry of Transport"
  },
  {
    id: "bid-005",
    title: "IT Equipment Supply",
    deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago (closed)
    status: "CLOSED",
    category: "Technology",
    budget: 350000,
    description: "Supply of computers, printers, and networking equipment for government offices in Mekelle.",
    documents: ["equipment_list.pdf", "delivery_terms.pdf"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20 days ago
    organizationId: "org-005",
    organizationName: "Ministry of Technology"
  },
  {
    id: "bid-006",
    title: "Agricultural Irrigation System",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days from now
    status: "OPEN",
    category: "Agriculture",
    budget: 1200000,
    description: "Installation of irrigation systems for 500 hectares of farmland in the Oromia region.",
    documents: ["technical_requirements.pdf", "environmental_assessment.pdf"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    organizationId: "org-006",
    organizationName: "Ministry of Agriculture"
  }
];

// Simulate API calls with setTimeout to mimic network delay
export const fetchBids = (): Promise<Bid[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBids);
    }, 800);
  });
};

export const fetchBidById = (id: string): Promise<Bid | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bid = mockBids.find(bid => bid.id === id);
      resolve(bid);
    }, 600);
  });
};

export const applyToBid = (bidId: string, data: any): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Applied to bid ${bidId} with data:`, data);
      resolve({ success: true });
    }, 1000);
  });
};
