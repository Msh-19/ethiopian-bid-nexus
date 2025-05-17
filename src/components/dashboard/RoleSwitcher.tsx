
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";

interface RoleSwitcherProps {
  activeRole: UserRole;
  handleRoleChange: (role: UserRole) => void;
  isSidebarOpen: boolean;
}

export function RoleSwitcher({ activeRole, handleRoleChange, isSidebarOpen }: RoleSwitcherProps) {
  return (
    <div className="mb-6">
      <div className="flex space-x-1">
        <Button 
          size="sm" 
          variant={activeRole === "BIDDER" ? "default" : "outline"}
          className="flex-1 text-xs"
          onClick={() => handleRoleChange("BIDDER")}
        >
          {isSidebarOpen ? "Bidder" : "B"}
        </Button>
        <Button 
          size="sm" 
          variant={activeRole === "OFFICER" ? "default" : "outline"}
          className="flex-1 text-xs"
          onClick={() => handleRoleChange("OFFICER")}
        >
          {isSidebarOpen ? "Officer" : "O"}
        </Button>
        <Button 
          size="sm" 
          variant={activeRole === "ADMIN" ? "default" : "outline"}
          className="flex-1 text-xs"
          onClick={() => handleRoleChange("ADMIN")}
        >
          {isSidebarOpen ? "Admin" : "A"}
        </Button>
      </div>
      {isSidebarOpen && (
        <p className="text-xs text-muted-foreground mt-1">
          Switch roles for demo
        </p>
      )}
    </div>
  );
}
