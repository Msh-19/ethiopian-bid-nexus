
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Proposal, Bid } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { Check, FileText, Search } from "lucide-react";

interface ProposalEvaluationListProps {
  proposals: Array<Proposal & { bid: Bid }>;
  isLoading?: boolean;
}

export function ProposalEvaluationList({ proposals, isLoading }: ProposalEvaluationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProposals = proposals.filter(proposal => 
    proposal.bid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.bid.organizationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.bid.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Proposals to Evaluate</CardTitle>
        <div className="flex items-center w-full max-w-sm">
          <Input 
            placeholder="Search proposals..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 bg-muted rounded w-full animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredProposals.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bid Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProposals.map(proposal => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{proposal.bid.title}</TableCell>
                  <TableCell>{proposal.bid.category}</TableCell>
                  <TableCell>{formatDate(proposal.submittedAt || '')}</TableCell>
                  <TableCell>
                    {proposal.status === 'PENDING' ? (
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                        Pending Evaluation
                      </Badge>
                    ) : proposal.status === 'APPROVED' ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                        <Check className="mr-1 h-3 w-3" /> Approved
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-200">
                        Rejected
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/committee/evaluate/${proposal.id}`}>
                        <FileText className="mr-2 h-4 w-4" />
                        Evaluate
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>No proposals found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
