
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCreateBid } from "@/services/api/bids";

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(2, "Please select a valid category"),
  budget: z.coerce.number().positive("Budget must be a positive number"),
  deadline: z.coerce.date().min(new Date(Date.now() + 86_400_000), "Deadline must be at least tomorrow"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBid() {
  const { mutate, isPending } = useCreateBid();
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      budget: 0,
      description: "",
    },
  });
  
  // Form submission handler
  function onSubmit(data: FormValues) {
    mutate({
      title: data.title,
      category: data.category,
      budget: data.budget,
      deadline: data.deadline.toISOString(),
      description: data.description,
    });
    
    // Reset form after successful submission
    if (!isPending) {
      form.reset();
    }
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Create New Bid</h1>
        <p className="text-muted-foreground">
          Publish a new procurement opportunity for bidders
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Bid Details</CardTitle>
          <CardDescription>
            Provide detailed information about the procurement requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bid Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. School Construction Project" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear, descriptive title for the bid
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full p-2 border border-input rounded-md bg-background"
                          {...field}
                        >
                          <option value="">Select category</option>
                          <option value="Construction">Construction</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Technology">Technology</option>
                          <option value="Agriculture">Agriculture</option>
                          <option value="Energy">Energy</option>
                          <option value="Infrastructure">Infrastructure</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (ETB)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="500000" {...field} />
                      </FormControl>
                      <FormDescription>
                        The maximum budget allocated for this project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submission Deadline</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''} 
                      />
                    </FormControl>
                    <FormDescription>
                      The final date for receiving proposals (must be at least tomorrow)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the procurement requirements in detail..."
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide comprehensive details about requirements, specifications, and deliverables
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isPending}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isPending ? "Creating..." : "Create and Publish Bid"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
