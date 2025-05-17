
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form type for bid creation
type BidFormValues = {
  title: string;
  category: string;
  budget: string;
  deadline: string;
  description: string;
};

export function CreateBidForm() {
  const { toast } = useToast();
  
  const form = useForm<BidFormValues>({
    defaultValues: {
      title: "",
      category: "",
      budget: "",
      deadline: "",
      description: ""
    },
  });

  const onSubmit = (data: BidFormValues) => {
    toast({
      title: "Bid Created",
      description: `Your bid "${data.title}" has been published successfully.`,
    });
    
    // Reset form
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Bid</CardTitle>
        <CardDescription>
          Publish a new procurement opportunity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bid Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. School Construction Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
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
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the procurement requirements in detail..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create and Publish Bid
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
