
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";

interface Bid {
  id: string;
  title: string;
  deadline: string;
  status: string;
  proposals: number;
  createdAt: string;
}

interface BidManagementProps {
  bids: Bid[];
  formatDate: (dateString: string) => string;
}

export function BidManagement({ bids, formatDate }: BidManagementProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Bids</CardTitle>
        <CardDescription>
          View and edit your created procurement bids
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Proposals</TableHead>
              <TableHead>Deadline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map(bid => (
              <TableRow key={bid.id}>
                <TableCell className="font-medium">{bid.title}</TableCell>
                <TableCell>
                  {bid.status === "OPEN" ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                      <Clock className="h-3 w-3 mr-1" /> Open
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-slate-500/10 text-slate-700 border-slate-200">
                      <CheckCircle className="h-3 w-3 mr-1" /> Closed
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{bid.proposals}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(bid.deadline)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/dashboard/officer/manage">View All Bids</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
