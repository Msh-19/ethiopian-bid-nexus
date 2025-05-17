
import { nanoid } from "nanoid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock store
const mockProposals: any[] = [];

export const useMyProposals = (bidderId: string) => 
  useQuery({
    queryKey: ["proposals", bidderId],
    queryFn: () => mockProposals.filter(p => p.bidderId === bidderId)
  });

export const useSubmitProposal = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (proposal: any) => {
      const newProposal = { 
        ...proposal, 
        id: nanoid(), 
        status: "PENDING",
        submittedAt: new Date().toISOString()
      };
      mockProposals.push(newProposal);
      return newProposal;
    },
    onSuccess: (_, { bidderId }) => {
      qc.invalidateQueries({ queryKey: ["proposals", bidderId] });
    }
  });
};
