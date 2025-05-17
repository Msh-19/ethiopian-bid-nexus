
import { Link, Routes, Route } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import KPIStats from "@/components/bidder/KPIStats";
import ProposalTable from "@/components/bidder/ProposalTable";
import SubmitProposalForm from "@/components/bidder/SubmitProposalForm";

// Mock active bids data
const mockActiveBids = [
  {
    id: 'bid-003',
    title: 'Solar Power Installation',
    deadline: '2024-05-15T23:59:59Z',
    daysRemaining: 10
  },
  {
    id: 'bid-006',
    title: 'Agricultural Irrigation System',
    deadline: '2024-05-20T23:59:59Z',
    daysRemaining: 15
  }
];

// BidderDashboardOverview component - for the main dashboard view
const BidderDashboardOverview = () => {
  // Format date helper function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <KPIStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProposalTable />
        <Card>
          <CardHeader>
            <CardTitle>Submit a Proposal</CardTitle>
            <CardDescription>
              Create and submit proposals for open bids
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ready to bid on a new project? Submit a detailed proposal with your qualifications and pricing.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/dashboard/bidder/submit-proposal">Create New Proposal</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bid Deadlines</CardTitle>
          <CardDescription>
            Active bids currently accepting proposals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockActiveBids.length > 0 ? (
            <div className="space-y-4">
              {mockActiveBids.map(bid => (
                <div key={bid.id} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-medium">{bid.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Deadline: {formatDate(bid.deadline)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {bid.daysRemaining} days left
                    </Badge>
                    <Button size="sm" asChild>
                      <Link to={`/bids/${bid.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No active bids at the moment
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/bids">Browse All Open Bids</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Main BidderDashboard component with routing
export default function BidderDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Bidder Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Monitor your proposals and apply for new bids
      </p>

      <Routes>
        <Route path="/" element={<BidderDashboardOverview />} />
        <Route path="/submit-proposal" element={<SubmitProposalForm />} />
        <Route path="/my-proposals" element={<ProposalTable />} />
      </Routes>
    </div>
  );
}
