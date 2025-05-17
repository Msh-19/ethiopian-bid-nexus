
import { StatsOverview } from "@/components/officer/StatsOverview";
import { BidManagement } from "@/components/officer/BidManagement";
import { CreateBidForm } from "@/components/officer/CreateBidForm";
import { RecentProposals } from "@/components/officer/RecentProposals";
import { formatDate } from "@/utils/dateUtils";
import { mockOfficerBids } from "@/data/officerMockData";

export default function OfficerDashboard() {
  const activeBids = mockOfficerBids.filter(b => b.status === "OPEN").length;
  const totalProposals = mockOfficerBids.reduce((total, bid) => total + bid.proposals, 0);
  const closedBids = mockOfficerBids.filter(b => b.status === "CLOSED").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Procurement Officer Dashboard</h1>
        <p className="text-muted-foreground">
          Create and manage procurement bids
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview 
        activeBids={activeBids} 
        totalProposals={totalProposals} 
        closedBids={closedBids} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bid Management */}
        <BidManagement bids={mockOfficerBids} formatDate={formatDate} />

        {/* Create New Bid */}
        <CreateBidForm />
      </div>

      {/* Recent Proposals */}
      <RecentProposals formatDate={formatDate} />
    </div>
  );
}
