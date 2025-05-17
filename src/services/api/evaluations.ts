
import { nanoid } from "nanoid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Evaluation, EvaluationCriteria } from "@/types";

// Mock store for evaluations
const mockEvaluations: Evaluation[] = [
  {
    id: "eval001",
    proposalId: "prop001",
    committeeId: "comm001",
    score: 85,
    comments: "Strong technical proposal with good understanding of requirements",
    criteria: [
      {
        id: "crit001",
        name: "Technical Understanding",
        description: "Evaluate the technical solution proposed",
        weight: 0.4,
        score: 9,
        maxScore: 10
      },
      {
        id: "crit002",
        name: "Experience",
        description: "Previous relevant experience",
        weight: 0.3,
        score: 8,
        maxScore: 10
      },
      {
        id: "crit003",
        name: "Cost Effectiveness",
        description: "Value for money assessment",
        weight: 0.3,
        score: 8.5,
        maxScore: 10
      }
    ],
    completedAt: "2024-04-10T15:30:00Z",
    status: "SUBMITTED"
  }
];

// Default evaluation criteria template
export const defaultCriteria: EvaluationCriteria[] = [
  {
    id: nanoid(),
    name: "Technical Understanding",
    description: "Evaluate the technical solution proposed",
    weight: 0.4,
    score: 0,
    maxScore: 10
  },
  {
    id: nanoid(),
    name: "Experience",
    description: "Previous relevant experience",
    weight: 0.3,
    score: 0,
    maxScore: 10
  },
  {
    id: nanoid(),
    name: "Cost Effectiveness",
    description: "Value for money assessment",
    weight: 0.3,
    score: 0,
    maxScore: 10
  }
];

// Calculate weighted score from criteria
export const calculateOverallScore = (criteria: EvaluationCriteria[]): number => {
  const weightedScore = criteria.reduce((total, criterion) => {
    return total + (criterion.score * criterion.weight);
  }, 0);
  
  // Round to 2 decimal places
  return Math.round(weightedScore * 100) / 100;
};

// Get evaluations by committee member
export const useCommitteeEvaluations = (committeeId: string) => 
  useQuery({
    queryKey: ["evaluations", committeeId],
    queryFn: () => mockEvaluations.filter(e => e.committeeId === committeeId)
  });

// Get evaluations for specific proposal
export const useProposalEvaluations = (proposalId: string) =>
  useQuery({
    queryKey: ["evaluations", "proposal", proposalId],
    queryFn: () => mockEvaluations.filter(e => e.proposalId === proposalId)
  });

// Get single evaluation
export const useEvaluation = (evaluationId: string) =>
  useQuery({
    queryKey: ["evaluation", evaluationId],
    queryFn: () => {
      const evaluation = mockEvaluations.find(e => e.id === evaluationId);
      if (!evaluation) throw new Error("Evaluation not found");
      return evaluation;
    },
    enabled: !!evaluationId
  });

// Create or update evaluation
export const useSaveEvaluation = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async (evaluation: Evaluation) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingIndex = mockEvaluations.findIndex(e => e.id === evaluation.id);
      
      if (existingIndex >= 0) {
        // Update existing evaluation
        mockEvaluations[existingIndex] = evaluation;
      } else {
        // Create new evaluation with generated ID
        const newEvaluation = {
          ...evaluation,
          id: evaluation.id || nanoid(),
          criteria: evaluation.criteria.map(c => ({
            ...c,
            id: c.id || nanoid()
          }))
        };
        mockEvaluations.push(newEvaluation);
      }
      
      return evaluation;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["evaluations"] });
      qc.invalidateQueries({ queryKey: ["evaluation", variables.id] });
    }
  });
};

// Submit evaluation (changes status from DRAFT to SUBMITTED)
export const useSubmitEvaluation = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async (evaluationId: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const evaluation = mockEvaluations.find(e => e.id === evaluationId);
      if (!evaluation) throw new Error("Evaluation not found");
      
      evaluation.status = "SUBMITTED";
      evaluation.completedAt = new Date().toISOString();
      
      return evaluation;
    },
    onSuccess: (_, evaluationId) => {
      qc.invalidateQueries({ queryKey: ["evaluations"] });
      qc.invalidateQueries({ queryKey: ["evaluation", evaluationId] });
    }
  });
};

