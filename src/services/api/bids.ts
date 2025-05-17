
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define types for our bid data
export type BidStatus = "OPEN" | "CLOSED";

export interface Bid {
  id: string;
  title: string;
  category: string;
  budget: number;
  deadline: string; // ISO date string
  description: string;
  status: BidStatus;
  createdAt: string; // ISO date string
  createdBy: string; // User ID
  proposals: number; // Count of proposals
}

// Mock bids data
const MOCK_BIDS: Bid[] = [
  {
    id: "bid-001",
    title: "School Construction Project",
    category: "Construction",
    budget: 5000000,
    deadline: "2024-05-12T23:59:59Z",
    description: "Construction of a new primary school building with 10 classrooms, administrative offices, and a playground.",
    status: "OPEN",
    createdAt: "2024-04-02T10:30:00Z",
    createdBy: "officer-001",
    proposals: 4
  },
  {
    id: "bid-002",
    title: "Medical Supplies Procurement",
    category: "Healthcare",
    budget: 2500000,
    deadline: "2024-05-19T23:59:59Z",
    description: "Supply of essential medical equipment and consumables for regional health centers.",
    status: "OPEN",
    createdAt: "2024-04-05T14:20:00Z",
    createdBy: "officer-001",
    proposals: 2
  },
  {
    id: "bid-003",
    title: "Solar Power Installation",
    category: "Energy",
    budget: 3500000,
    deadline: "2024-05-15T23:59:59Z",
    description: "Installation of solar panels and power systems for rural schools and health centers.",
    status: "OPEN",
    createdAt: "2024-04-08T11:45:00Z",
    createdBy: "officer-001",
    proposals: 0
  },
  {
    id: "bid-004",
    title: "Road Rehabilitation Project",
    category: "Infrastructure",
    budget: 12000000,
    deadline: "2024-04-25T23:59:59Z",
    description: "Rehabilitation of 5km of urban roads including drainage systems and street lighting.",
    status: "OPEN",
    createdAt: "2024-04-01T09:00:00Z",
    createdBy: "officer-002",
    proposals: 6
  },
  {
    id: "bid-005",
    title: "IT Equipment Supply",
    category: "Technology",
    budget: 1800000,
    deadline: "2024-04-30T23:59:59Z",
    description: "Supply of computers, servers, and networking equipment for government offices.",
    status: "CLOSED",
    createdAt: "2024-04-10T09:15:00Z",
    createdBy: "officer-001",
    proposals: 8
  },
];

// Simulate an API call with a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
async function fetchBids(): Promise<Bid[]> {
  await delay(800); // simulate network delay
  return [...MOCK_BIDS];
}

async function createBid(newBid: Omit<Bid, "id" | "createdAt" | "createdBy" | "proposals" | "status">): Promise<Bid> {
  await delay(1000); // simulate network delay
  
  // Generate a new bid with a unique ID
  const bid: Bid = {
    id: `bid-${Math.random().toString(36).substring(2, 9)}`,
    ...newBid,
    status: "OPEN",
    createdAt: new Date().toISOString(),
    createdBy: "officer-001", // Assuming the current user
    proposals: 0
  };
  
  // In a real app, this would be a POST request to an API
  MOCK_BIDS.unshift(bid);
  
  return bid;
}

async function closeBid(bidId: string): Promise<Bid> {
  await delay(800); // simulate network delay
  
  const bid = MOCK_BIDS.find(b => b.id === bidId);
  if (!bid) {
    throw new Error(`Bid with ID ${bidId} not found`);
  }
  
  // Update bid status to closed
  bid.status = "CLOSED";
  
  return bid;
}

// React Query hooks
export function useBids() {
  return useQuery({
    queryKey: ['bids'],
    queryFn: fetchBids
  });
}

export function useCreateBid() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: createBid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bids'] });
      toast({
        title: "Bid Created",
        description: "Your bid has been published successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to create bid: ${error.message}`,
      });
    }
  });
}

export function useCloseBid() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: closeBid,
    onSuccess: (bid) => {
      queryClient.invalidateQueries({ queryKey: ['bids'] });
      toast({
        title: "Bid Closed",
        description: `"${bid.title}" has been closed successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to close bid: ${error.message}`,
      });
    }
  });
}
