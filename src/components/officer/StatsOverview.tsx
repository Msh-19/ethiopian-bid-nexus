
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";

interface StatsProps {
  activeBids: number;
  totalProposals: number;
  closedBids: number;
}

export function StatsOverview({ activeBids, totalProposals, closedBids }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="bg-primary/10 pb-2">
          <CardTitle className="text-lg">Active Bids</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">
            {activeBids}
          </div>
          <p className="text-muted-foreground text-sm">Currently open bids</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-green-500/10 pb-2">
          <CardTitle className="text-lg">Total Proposals</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">
            {totalProposals}
          </div>
          <p className="text-muted-foreground text-sm">Across all bids</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-blue-500/10 pb-2">
          <CardTitle className="text-lg">Closed Bids</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">
            {closedBids}
          </div>
          <p className="text-muted-foreground text-sm">Completed processes</p>
        </CardContent>
      </Card>
    </div>
  );
}
