import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { EvaluationCriteriaTable } from "@/components/committee/EvaluationCriteriaTable";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateUtils";
import { 
  useSaveEvaluation, 
  useSubmitEvaluation, 
  defaultCriteria, 
  calculateOverallScore 
} from "@/services/api/evaluations";
import { Evaluation, EvaluationCriteria } from "@/types";
import { useForm } from "react-hook-form";
import { ChevronLeft, Save, CheckCircle, FileText, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

// Mocked proposal data
const mockProposal = {
  id: "prop001",
  bidId: "bid-001",
  bidderId: "bidder001",
  bidderName: "ABC Construction Ltd",
  files: ["technical-proposal.pdf", "financial-proposal.pdf"],
  status: "PENDING",
  submittedAt: "2024-04-01T14:25:00Z",
  bid: {
    id: "bid-001",
    title: "School Construction Project",
    deadline: "2024-05-12T23:59:59Z",
    status: "CLOSED",
    category: "Construction",
    budget: 5000000,
    organizationName: "Ministry of Education",
    description: "Construction of a new primary school building with 12 classrooms, administrative offices, and sanitation facilities."
  }
};

type FormData = {
  comments: string;
};

export default function EvaluateProposal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("proposal");
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>(defaultCriteria);
  const [draftSaved, setDraftSaved] = useState(false);
  
  // Get existing draft evaluation or create new one
  const [evaluationId, setEvaluationId] = useState<string>("");
  
  const form = useForm<FormData>({
    defaultValues: {
      comments: ""
    },
  });
  
  const { mutate: saveEvaluation, isPending: isSaving } = useSaveEvaluation();
  const { mutate: submitEvaluation, isPending: isSubmitting } = useSubmitEvaluation();
  
  // Handle criteria changes
  const handleCriteriaChange = (updatedCriteria: EvaluationCriteria[]) => {
    setCriteria(updatedCriteria);
    setDraftSaved(false);
  };
  
  // Save as draft
  const handleSaveDraft = () => {
    const comments = form.getValues().comments;
    const score = calculateOverallScore(criteria);
    
    const evaluation: Evaluation = {
      id: evaluationId || "",
      proposalId: id || "",
      committeeId: "comm001", // In a real app, this would come from auth context
      score,
      comments,
      criteria,
      status: "DRAFT"
    };
    
    saveEvaluation(evaluation, {
      onSuccess: (savedEvaluation) => {
        if (savedEvaluation && typeof savedEvaluation === 'object' && 'id' in savedEvaluation) {
          setEvaluationId(savedEvaluation.id as string);
          setDraftSaved(true);
          toast({
            title: "Draft saved",
            description: "Your evaluation has been saved as a draft."
          });
        }
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Save failed",
          description: "Could not save your evaluation. Please try again."
        });
      }
    });
  };
  
  // Submit final evaluation
  const handleSubmit = form.handleSubmit((data) => {
    // First save the latest changes
    const score = calculateOverallScore(criteria);
    
    const evaluation: Evaluation = {
      id: evaluationId || "",
      proposalId: id || "",
      committeeId: "comm001", // In a real app, this would come from auth context
      score,
      comments: data.comments,
      criteria,
      status: "DRAFT"
    };
    
    saveEvaluation(evaluation, {
      onSuccess: (savedEvaluation) => {
        // Then submit the evaluation
        if (savedEvaluation && typeof savedEvaluation === 'object' && 'id' in savedEvaluation) {
          submitEvaluation(savedEvaluation.id as string, {
            onSuccess: () => {
              toast({
                title: "Evaluation submitted",
                description: "Your evaluation has been submitted successfully."
              });
              navigate("/dashboard/committee");
            },
            onError: () => {
              toast({
                variant: "destructive",
                title: "Submission failed",
                description: "Could not submit your evaluation. Please try again."
              });
            }
          });
        }
      }
    });
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <Link 
          to="/dashboard/committee" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <h1 className="text-2xl font-bold mb-2">Evaluate Proposal</h1>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="bg-muted">{mockProposal.bid.category}</Badge>
          <div className="text-muted-foreground flex items-center">
            <Building2 className="h-4 w-4 mr-1" />
            <span>{mockProposal.bidderName}</span>
          </div>
        </div>
      </div>
      
      {/* Bid and proposal information */}
      <Card>
        <CardHeader>
          <CardTitle>{mockProposal.bid.title}</CardTitle>
          <CardDescription>
            Submitted on {formatDate(mockProposal.submittedAt)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="proposal" className="flex-1">
                <FileText className="mr-2 h-4 w-4" />
                Proposal Documents
              </TabsTrigger>
              <TabsTrigger value="bid" className="flex-1">
                Bid Details
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="proposal" className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground mb-2">
                Review the following documents submitted by the bidder:
              </p>
              
              {mockProposal.files.map((file, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="w-full justify-start mb-2"
                  onClick={() => toast({
                    description: "In a real implementation, this would download the document."
                  })}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {file}
                </Button>
              ))}
            </TabsContent>
            
            <TabsContent value="bid" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Budget</h3>
                  <p>{formatCurrency(mockProposal.bid.budget)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Organization</h3>
                  <p>{mockProposal.bid.organizationName}</p>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
              <p className="text-sm">{mockProposal.bid.description}</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Evaluation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Form</CardTitle>
          <CardDescription>
            Score each criterion and provide comments for your evaluation
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Scoring Criteria</h3>
                <EvaluationCriteriaTable 
                  criteria={criteria}
                  onChange={handleCriteriaChange}
                />
              </div>
              
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments and Justification</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide detailed comments about your evaluation..."
                        className="min-h-[150px]"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setDraftSaved(false);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSaveDraft}
                disabled={isSaving || isSubmitting || draftSaved}
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                {draftSaved ? "Draft Saved" : "Save Draft"}
              </Button>
              <Button 
                type="submit"
                disabled={isSaving || isSubmitting}
                className="w-full sm:w-auto"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit Evaluation
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
