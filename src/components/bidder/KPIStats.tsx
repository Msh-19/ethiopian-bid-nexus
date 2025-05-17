
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock proposals data for stats calculation
const mockProposals = [
  { 
    id: 'prop-001',
    bidId: 'bid-001',
    bidTitle: 'School Construction Project',
    status: 'PENDING',
    submittedAt: '2024-04-01T14:30:00Z'
  },
  { 
    id: 'prop-002',
    bidId: 'bid-002',
    bidTitle: 'Medical Supplies Procurement',
    status: 'APPROVED',
    submittedAt: '2024-03-15T09:45:00Z'
  },
  { 
    id: 'prop-003',
    bidId: 'bid-004',
    bidTitle: 'Road Rehabilitation Project',
    status: 'REJECTED',
    submittedAt: '2024-03-05T16:20:00Z',
    feedback: 'Missing required financial documents.'
  },
];

export default function KPIStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="bg-primary/10 pb-2">
          <CardTitle className="text-lg">My Proposals</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">{mockProposals.length}</div>
          <p className="text-muted-foreground text-sm">Total proposals submitted</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-green-500/10 pb-2">
          <CardTitle className="text-lg">Approved</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">
            {mockProposals.filter(p => p.status === 'APPROVED').length}
          </div>
          <p className="text-muted-foreground text-sm">Proposals accepted</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-orange-500/10 pb-2">
          <CardTitle className="text-lg">Pending</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">
            {mockProposals.filter(p => p.status === 'PENDING').length}
          </div>
          <p className="text-muted-foreground text-sm">Awaiting decision</p>
        </CardContent>
      </Card>
    </div>
  );
}
