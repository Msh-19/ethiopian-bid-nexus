
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmitProposal } from "@/services/api/proposals";
import { useAuth } from "@/contexts/AuthContext";
import { FileDropzone } from "@/components/ui/FileDropzone";

// Define the form schema with Zod
const proposalFormSchema = z.object({
  bidId: z.string().min(1, "Please select a bid"),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  file: z
    .any()
    .refine(
      (val) =>
        // drag-and-drop gives File[]
        (Array.isArray(val) && val.length === 1 && val[0] instanceof File && val[0].type === "application/pdf") ||
        // classic input gives FileList
        (val instanceof FileList && val.length === 1 && val[0].type === "application/pdf"),
      "Please upload exactly one PDF file"
    ),
  budget: z.coerce.number().positive("Proposed budget must be a positive number"),
  completionDays: z.coerce.number().int().positive("Completion days must be a positive integer"),
});

type ProposalFormValues = z.infer<typeof proposalFormSchema>;

// Mock active bids data
const mockActiveBids = [
  {
    id: 'bid-003',
    title: 'Solar Power Installation',
    deadline: '2024-05-15T23:59:59Z',
    daysRemaining: 10,
    category: 'Energy',
    status: 'OPEN',
  },
  {
    id: 'bid-006',
    title: 'Agricultural Irrigation System',
    deadline: '2024-05-20T23:59:59Z',
    daysRemaining: 15,
    category: 'Agriculture',
    status: 'OPEN',
  }
];

// Helper function to convert file to base64
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function SubmitProposalForm() {
  const { toast } = useToast();
  const { user: authUser } = useAuth();
  const { mutate: submitProposal, isPending } = useSubmitProposal();
  
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      bidId: '',
      coverLetter: '',
      budget: 0,
      completionDays: 0,
    },
  });

  const onSubmit = async (data: ProposalFormValues) => {
    try {
      const rawFile = Array.isArray(data.file) ? data.file[0] : data.file[0];
      const fileBase64 = await toBase64(rawFile);
      
      submitProposal({
        bidderId: authUser?.id || 'user-1',  // Fallback for demo
        bidId: data.bidId,
        coverLetter: data.coverLetter,
        budget: data.budget,
        completionDays: data.completionDays,
        fileBase64,
        fileName: rawFile.name,
        submittedAt: new Date().toISOString()
      }, {
        onSuccess: () => {
          toast({
            title: "Proposal Submitted",
            description: "Your proposal has been submitted successfully.",
          });
          
          // Reset form
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was a problem submitting your proposal. Please try again.",
          });
        }
      });
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem processing your file. Please try again.",
      });
    }
  };

  // Get bid details for selected bid
  const selectedBid = form.watch('bidId') 
    ? mockActiveBids.find(bid => bid.id === form.watch('bidId'))
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit New Proposal</CardTitle>
        <CardDescription>
          Upload documents and submit a proposal for an active bid
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bidId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Bid</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border border-input rounded-md bg-background"
                      {...field}
                    >
                      <option value="">Select a bid</option>
                      {mockActiveBids.filter(bid => bid.status === 'OPEN').map(bid => (
                        <option key={bid.id} value={bid.id}>
                          {bid.title} ({bid.daysRemaining} days left)
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    Choose an active bid to submit a proposal for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedBid && (
              <div className="p-3 bg-muted rounded-md text-sm">
                <p><strong>Category:</strong> {selectedBid.category}</p>
                <p><strong>Deadline:</strong> {new Date(selectedBid.deadline).toLocaleDateString()}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposed Budget (ETB)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your proposed cost for completing this project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="completionDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completion Time (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Estimated time to complete the project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explain why you're suitable for this bid..."
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 50 characters explaining your qualifications and approach
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Document (PDF)</FormLabel>
                  <FormControl>
                    <FileDropzone name="file" control={form.control} />
                  </FormControl>
                  <FormDescription>
                    PDF file only, up to 10MB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isPending}>
              <FileText className="mr-2 h-4 w-4" />
              {isPending ? "Submitting..." : "Submit Proposal"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
