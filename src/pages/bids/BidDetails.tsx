
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { fetchBidById, applyToBid } from "@/services/bidService";
import { AlertCircle, Calendar, Building2, Banknote, FileText, Download, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BidDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: bid, isLoading, error } = useQuery({
    queryKey: ["bid", id],
    queryFn: () => fetchBidById(id || ""),
    enabled: !!id,
  });

  const handleApply = async () => {
    if (!bid) return;
    
    setIsSubmitting(true);
    try {
      await applyToBid(bid.id, { coverLetter });
      toast({
        title: "Application Submitted",
        description: "Your proposal has been submitted successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your proposal. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted/40 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-muted/50 rounded w-3/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="h-64 bg-muted/30 rounded mb-6"></div>
                  <div className="h-4 bg-muted/40 rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted/40 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-muted/40 rounded w-4/6 mb-2"></div>
                </div>
                <div>
                  <div className="h-48 bg-muted/30 rounded mb-4"></div>
                  <div className="h-12 bg-muted/40 rounded mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !bid) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AlertCircle className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Bid Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The bid you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/bids">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to All Bids
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/bids" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to All Bids
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={bid.status === "OPEN" ? "default" : "secondary"}>
                  {bid.status}
                </Badge>
                <Badge variant="outline">{bid.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{bid.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{bid.organizationName}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Bid Details</CardTitle>
                  <CardDescription>
                    Posted on {formatDate(bid.createdAt || new Date().toISOString())}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {bid.description}
                    </p>
                  </div>
                  
                  {bid.documents && bid.documents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Documents</h3>
                      <div className="space-y-2">
                        {bid.documents.map((doc, index) => (
                          <Button 
                            key={index}
                            variant="outline" 
                            className="w-full justify-start"
                            onClick={() => toast({
                              description: "In a real implementation, this would download the document."
                            })}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>{doc}</span>
                            <Download className="ml-auto h-4 w-4" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bid.status === "OPEN" && (
                    <div className="pt-4">
                      <h3 className="font-semibold text-lg mb-2">Submit Proposal</h3>
                      <Textarea 
                        placeholder="Enter your proposal cover letter..." 
                        className="min-h-[150px] mb-4"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                      />
                      <Button 
                        onClick={handleApply} 
                        disabled={isSubmitting || !coverLetter.trim()} 
                        className="w-full"
                      >
                        Apply for this Bid
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Bid Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium">{formatCurrency(bid.budget)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className="font-medium">{formatDate(bid.deadline)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={bid.status === "OPEN" ? "default" : "secondary"}>
                      {bid.status}
                    </Badge>
                  </div>
                  
                  {bid.status === "OPEN" && (
                    <div className="text-center pt-2">
                      <div className={`text-sm ${
                        getDaysRemaining(bid.deadline) === "Expired" 
                          ? "text-destructive" 
                          : "text-primary"
                      }`}>
                        {getDaysRemaining(bid.deadline)}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => toast({
                      description: "In a real implementation, this would generate a PDF of the bid details."
                    })}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Download Bid Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
