
export interface Bid { 
  id: string; 
  title: string; 
  deadline: string; 
  status: 'OPEN'|'CLOSED'; 
  category: string; 
  budget: number;
  description?: string;
  documents?: string[];
  createdAt?: string;
  organizationId?: string;
  organizationName?: string;
}

export interface Proposal { 
  id: string; 
  bidId: string; 
  bidderId: string; 
  files: string[]; 
  score?: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt?: string;
  feedback?: string;
}

export interface User { 
  id: string; 
  role: 'BIDDER'|'OFFICER'|'COMMITTEE'|'ADMIN'; 
  email: string; 
  name: string;
  organization?: string;
  avatar?: string;
  verified?: boolean;
  createdAt?: string;
}

export interface Evaluation {
  id: string;
  proposalId: string;
  committeeId: string;
  score: number;
  comments: string;
  criteria: EvaluationCriteria[];
  completedAt?: string;
  status: 'DRAFT' | 'SUBMITTED';
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  score: number;
  maxScore: number;
}

export type BidStatus = 'OPEN' | 'CLOSED';
export type UserRole = 'BIDDER' | 'OFFICER' | 'COMMITTEE' | 'ADMIN';
export type ProposalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type EvaluationStatus = 'DRAFT' | 'SUBMITTED';
