import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ProposalEvaluationList } from "@/components/committee/ProposalEvaluationList";
import { EvaluationSummary } from "@/components/committee/EvaluationSummary";
import { CheckCircle, ClipboardList, Star } from "lucide-react";
import { Bid, Proposal, ProposalStatus } from "@/types";

// Mock data for committee dashboard
const mockPendingProposals: Array<Proposal & { bid: Bid }> = [
  {
    id: "prop001",
    bidId: "bid-001",
    bidderId: "bidder001",
    files: ["technical-proposal.pdf", "financial-proposal.pdf"],
    status: "PENDING" as ProposalStatus,
    submittedAt: "2024-04-01T14:25:00Z",
    bid: {
      id: "bid-001",
      title: "School Construction Project",
      deadline: "2024-05-12T23:59:59Z",
      status: "CLOSED",
      category: "Construction",
      budget: 5000000,
      organizationName: "Ministry of Education"
    }
  },
  {
    id: "prop002",
    bidId: "bid-002",
    bidderId: "bidder002",
    files: ["proposal.pdf", "company-profile.pdf"],
    status: "PENDING" as ProposalStatus,
    submittedAt: "2024-04-06T09:15:00Z",
    bid: {
      id: "bid-002",
      title: "Medical Supplies Procurement",
      deadline: "2024-05-19T23:59:59Z",
      status: "OPEN",
      category: "Healthcare",
      budget: 2500000,
      organizationName: "Ministry of Health"
    }
  }
];

const mockCompletedEvaluations = [
  {
    id: "eval001",
    proposalId: "prop003",
    committeeId: "comm001",
    score: 8.5,
    comments: "Strong technical proposal with good understanding of requirements.",
    criteria: [],
    completedAt: "2024-04-10T15:30:00Z",
    status: "SUBMITTED" as const,
  }
];

export default function CommitteeDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  
  // Calculate stats
  const totalAssigned = mockPendingProposals.length + mockCompletedEvaluations.length;
  const completed = mockCompletedEvaluations.length;
  const pending = mockPendingProposals.length;
  const completionPercentage = totalAssigned > 0 
    ? Math.round((completed / totalAssigned) * 100) 
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Committee Member Dashboard</h1>
        <p className="text-muted-foreground">
          Evaluate and review procurement proposals
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAssigned}</div>
            <p className="text-muted-foreground text-sm">Proposals to evaluate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completed}</div>
            <p className="text-muted-foreground text-sm">Evaluations submitted</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completionPercentage}%</div>
            <Progress className="mt-2" value={completionPercentage} />
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for pending and completed evaluations */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">
            <ClipboardList className="mr-2 h-4 w-4" />
            Pending Evaluations ({pending})
          </TabsTrigger>
          <TabsTrigger value="completed">
            <CheckCircle className="mr-2 h-4 w-4" />
            Completed ({completed})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <ProposalEvaluationList proposals={mockPendingProposals} />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="space-y-6">
            {mockCompletedEvaluations.map(evaluation => (
              <EvaluationSummary 
                key={evaluation.id} 
                evaluation={evaluation}
              />
            ))}
            
            {mockCompletedEvaluations.length === 0 && (
              <Card>
                <CardContent className="text-center py-10">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <CardTitle className="mb-2">No Completed Evaluations</CardTitle>
                  <CardDescription>
                    You haven't submitted any evaluations yet.
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
