
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface RecentProposalsProps {
  formatDate: (dateString: string) => string;
}

export function RecentProposals({ formatDate }: RecentProposalsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Proposals</CardTitle>
        <CardDescription>
          Recently submitted proposals requiring evaluation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">ABC Construction Company</h3>
                <p className="text-sm text-muted-foreground">
                  Proposal for: School Construction Project
                </p>
                <p className="text-xs text-muted-foreground">
                  Submitted: {formatDate(new Date().toISOString())}
                </p>
              </div>
            </div>
            <Button size="sm">Review</Button>
          </div>
          
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">MedTech Supplies Ltd</h3>
                <p className="text-sm text-muted-foreground">
                  Proposal for: Medical Supplies Procurement
                </p>
                <p className="text-xs text-muted-foreground">
                  Submitted: {formatDate(new Date(Date.now() - 86400000).toISOString())}
                </p>
              </div>
            </div>
            <Button size="sm">Review</Button>
          </div>
          
          <div className="flex justify-between items-center pb-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">SolarTech Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Proposal for: Solar Power Installation
                </p>
                <p className="text-xs text-muted-foreground">
                  Submitted: {formatDate(new Date(Date.now() - 172800000).toISOString())}
                </p>
              </div>
            </div>
            <Button size="sm">Review</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/dashboard/officer/proposals">View All Proposals</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
