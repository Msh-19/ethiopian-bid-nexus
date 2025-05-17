
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, UserRole } from "@/types";
import { useCreateUser, useUpdateUser } from "@/services/api/users";
import { DialogFooter } from "@/components/ui/dialog";
import { Save, UserPlus } from "lucide-react";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["BIDDER", "OFFICER", "COMMITTEE", "ADMIN"] as const),
  organization: z.string().optional(),
  verified: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
}

export default function UserForm({ user, onSuccess }: UserFormProps) {
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const isPending = isCreating || isUpdating;
  
  const isEditMode = !!user;
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "BIDDER",
      organization: user?.organization || "",
      verified: user?.verified || false,
    },
  });
  
  // Form submission handler
  function onSubmit(data: FormValues) {
    if (isEditMode) {
      updateUser({
        id: user.id,
        ...data
      }, {
        onSuccess: () => {
          onSuccess();
        }
      });
    } else {
      createUser({
        name: data.name,
        email: data.email,
        role: data.role,
        organization: data.organization
      }, {
        onSuccess: () => {
          onSuccess();
        }
      });
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This will be used for login and notifications
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <select 
                    className="w-full p-2 border border-input rounded-md bg-background"
                    {...field}
                  >
                    <option value="BIDDER">Bidder</option>
                    <option value="OFFICER">Officer</option>
                    <option value="COMMITTEE">Committee</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input placeholder="Company or Government Agency" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {isEditMode && (
          <FormField
            control={form.control}
            name="verified"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Verification Status</FormLabel>
                  <FormDescription>
                    Mark this account as verified
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        )}
        
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isEditMode ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isPending ? "Saving..." : "Save Changes"}
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                {isPending ? "Creating..." : "Create User"}
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
