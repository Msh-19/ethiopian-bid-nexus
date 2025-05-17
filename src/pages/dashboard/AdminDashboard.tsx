
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle, Lock, Shield, Users } from "lucide-react";
import { useUsers } from "@/services/api/users";
import UserManagement from "@/components/admin/UserManagement";
import { UserRole } from "@/types";

// Mock audit logs
const mockAuditLogs = [
  {
    id: "log001",
    action: "User Created",
    userId: "user003",
    userName: "Mike Johnson",
    details: "New bidder account created",
    timestamp: "2024-04-05T11:15:00Z",
    ip: "192.168.1.45"
  },
  {
    id: "log002",
    action: "Bid Created",
    userId: "user002",
    userName: "Jane Smith",
    details: "Created bid: School Construction Project",
    timestamp: "2024-04-02T10:30:00Z",
    ip: "10.0.2.15"
  },
  {
    id: "log003",
    action: "Role Changed",
    userId: "user004",
    userName: "Sarah Williams",
    details: "Role changed from OFFICER to COMMITTEE",
    timestamp: "2024-04-01T09:25:00Z",
    ip: "192.168.1.72"
  },
  {
    id: "log004",
    action: "Proposal Submitted",
    userId: "user001",
    userName: "John Doe",
    details: "Submitted proposal for: Medical Supplies Procurement",
    timestamp: "2024-03-28T14:10:00Z",
    ip: "192.168.1.30"
  },
  {
    id: "log005",
    action: "User Verified",
    userId: "user005",
    userName: "David Chen",
    details: "Account verification completed",
    timestamp: "2024-03-25T11:05:00Z",
    ip: "10.0.3.21"
  }
];

export default function AdminDashboard() {
  const { data: users = [] } = useUsers();
  
  // Format date helper function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Count users by role
  const countUsersByRole = (role: UserRole) => {
    return users.filter(user => user.role === role).length;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">System Administration</h1>
        <p className="text-muted-foreground">
          Manage users, roles, and system settings
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="bg-blue-500/10 pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{users.length}</div>
            <p className="text-muted-foreground text-sm">Registered accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-green-500/10 pb-2">
            <CardTitle className="text-lg">Bidders</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{countUsersByRole("BIDDER")}</div>
            <p className="text-muted-foreground text-sm">Supplier accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-purple-500/10 pb-2">
            <CardTitle className="text-lg">Officers</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{countUsersByRole("OFFICER")}</div>
            <p className="text-muted-foreground text-sm">Procurement staff</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-yellow-500/10 pb-2">
            <CardTitle className="text-lg">Committee</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{countUsersByRole("COMMITTEE")}</div>
            <p className="text-muted-foreground text-sm">Evaluation members</p>
          </CardContent>
        </Card>
      </div>

      {/* User Management Component */}
      <UserManagement />

      {/* System Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>
            System activity and security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAuditLogs.map(log => (
              <div key={log.id} className="flex border-b pb-4">
                <div className="h-10 w-10 mr-3 flex items-center justify-center rounded-full">
                  {log.action.includes("User") && <Users className="h-5 w-5 text-blue-500" />}
                  {log.action.includes("Role") && <Shield className="h-5 w-5 text-yellow-500" />}
                  {log.action.includes("Bid") && <Activity className="h-5 w-5 text-green-500" />}
                  {log.action.includes("Proposal") && <CheckCircle className="h-5 w-5 text-purple-500" />}
                  {log.action.includes("Verified") && <Lock className="h-5 w-5 text-indigo-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{log.action}</h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {log.details}
                  </p>
                  <div className="flex text-xs text-muted-foreground">
                    <span className="mr-2">{log.userName}</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Full Audit Log
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
