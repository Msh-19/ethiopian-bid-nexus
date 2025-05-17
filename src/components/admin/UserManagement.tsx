
import { useState } from "react";
import { useUsers, useVerifyUser, useDeleteUser } from "@/services/api/users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserRole } from "@/types";
import { CheckCircle, AlertCircle, Trash2, UserPlus, Eye, CheckCheck } from "lucide-react";
import UserForm from "./UserForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserManagement() {
  const { data: users = [], isLoading, isError } = useUsers();
  const { mutate: verifyUser } = useVerifyUser();
  const { mutate: deleteUser } = useDeleteUser();
  
  const [viewUserDialog, setViewUserDialog] = useState(false);
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Format date helper function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Role badge style mapping
  const roleBadgeStyles = {
    BIDDER: "bg-blue-500/10 text-blue-700 border-blue-200",
    OFFICER: "bg-purple-500/10 text-purple-700 border-purple-200",
    COMMITTEE: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    ADMIN: "bg-red-500/10 text-red-700 border-red-200",
  };
  
  // Function to handle user verification
  const handleVerifyUser = (userId: string) => {
    verifyUser(userId);
  };
  
  // Function to handle user deletion
  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };
  
  // Get selected user
  const selectedUser = selectedUserId ? users.find(user => user.id === selectedUserId) : null;

  if (isLoading) {
    return <div className="p-8 text-center">Loading users...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-destructive">Error loading users</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </div>
          <Dialog open={addUserDialog} onOpenChange={setAddUserDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account in the system.
                </DialogDescription>
              </DialogHeader>
              <UserForm onSuccess={() => setAddUserDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={roleBadgeStyles[user.role]}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.organization}</TableCell>
                <TableCell>
                  {user.verified ? (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-sm">Pending</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setViewUserDialog(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {!user.verified && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-600"
                        onClick={() => handleVerifyUser(user.id)}
                      >
                        <CheckCheck className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {user.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled>Previous</Button>
        <div className="text-sm text-muted-foreground">
          Page 1 of 1
        </div>
        <Button variant="outline" disabled>Next</Button>
      </CardFooter>
      
      {/* View/Edit User Dialog */}
      <Dialog open={viewUserDialog} onOpenChange={setViewUserDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and edit user account information.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserForm 
              user={selectedUser} 
              onSuccess={() => setViewUserDialog(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
