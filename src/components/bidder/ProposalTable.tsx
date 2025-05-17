
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useMyProposals } from "@/services/api/proposals";

export default function ProposalTable() {
  const { user } = useAuth();
  const { data: proposals = [], isLoading } = useMyProposals(user?.id || 'user-1'); // Fallback ID for demo

  // Format date helper function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render feedback for rejected proposals
  const renderFeedback = (proposal: any) => {
    if (proposal.status === "REJECTED" && proposal.feedback) {
      return (
        <div className="mt-4 p-3 bg-red-500/5 border border-red-200 rounded-md">
          <h4 className="font-medium text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
            Feedback on Rejected Proposal
          </h4>
          <p className="text-sm mt-1 text-muted-foreground">
            {proposal.feedback}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Proposals</CardTitle>
        <CardDescription>
          Status of your bid applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        ) : proposals.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bid Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposals.map((proposal: any) => (
                  <TableRow key={proposal.id}>
                    <TableCell className="font-medium">{proposal.bidTitle || `Bid ${proposal.bidId}`}</TableCell>
                    <TableCell>
                      {proposal.status === "PENDING" && (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                          <Clock className="h-3 w-3 mr-1" /> Pending
                        </Badge>
                      )}
                      {proposal.status === "APPROVED" && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" /> Approved
                        </Badge>
                      )}
                      {proposal.status === "REJECTED" && (
                        <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-200">
                          <AlertCircle className="h-3 w-3 mr-1" /> Rejected
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {proposal.submittedAt ? formatDate(proposal.submittedAt) : "Just now"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {proposals.filter((p: any) => p.status === "REJECTED" && p.feedback).map((proposal: any) => (
              <div key={`feedback-${proposal.id}`}>{renderFeedback(proposal)}</div>
            ))}
          </>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p className="mb-2">No proposals submitted yet</p>
            <p className="text-sm">Submit a proposal to get started</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Proposals</Button>
      </CardFooter>
    </Card>
  );
}
