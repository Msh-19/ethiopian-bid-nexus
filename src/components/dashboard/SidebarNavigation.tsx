
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, FileText, Settings, Users, ClipboardList, 
  FileInput, BellRing, BarChart3, Calendar, PlusCircle, Star
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  exact?: boolean;
}

interface SidebarNavigationProps {
  activeRole: UserRole;
  isSidebarOpen: boolean;
  activePath: string;
}

export function SidebarNavigation({ 
  activeRole, 
  isSidebarOpen, 
  activePath 
}: SidebarNavigationProps) {
  const navigate = useNavigate();

  // Role-based navigation items with exact flag for overview pages
  const bidderNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard/bidder", exact: true },
    { icon: FileText, label: "My Proposals", path: "/dashboard/bidder/my-proposals" },
    { icon: PlusCircle, label: "Submit Proposal", path: "/dashboard/bidder/submit-proposal" },
    { icon: Calendar, label: "Deadlines", path: "/dashboard/bidder/deadlines" },
    { icon: BellRing, label: "Notifications", path: "/dashboard/bidder/notifications" },
  ];

  const officerNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard/officer", exact: true },
    { icon: PlusCircle, label: "Create Bid", path: "/dashboard/officer/create" },
    { icon: ClipboardList, label: "Manage Bids", path: "/dashboard/officer/manage" },
    { icon: FileInput, label: "Proposals", path: "/dashboard/officer/proposals" },
  ];
  
  const committeeNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard/committee", exact: true },
    { icon: Star, label: "Evaluations", path: "/dashboard/committee/evaluations" },
  ];

  const adminNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard/admin", exact: true },
    { icon: Users, label: "User Management", path: "/dashboard/admin/users" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/admin/analytics" },
    { icon: Settings, label: "System Settings", path: "/dashboard/admin/settings" },
  ];

  // Get current navigation items based on role
  const getNavItems = () => {
    switch (activeRole) {
      case "BIDDER":
        return bidderNavItems;
      case "OFFICER":
        return officerNavItems;
      case "COMMITTEE":
        return committeeNavItems;
      case "ADMIN":
        return adminNavItems;
      default:
        return bidderNavItems;
    }
  };

  return (
    <nav>
      <ul className="space-y-1">
        {getNavItems().map((item, index) => {
          // Check if this item's path matches the current active path
          const isActive = (item.exact && activePath === item.path) || 
                          (!item.exact && activePath.startsWith(item.path));
          
          return (
            <li key={index}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2 rounded-md transition-colors",
                    isActive 
                      ? "bg-secondary text-secondary-foreground font-medium" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    isSidebarOpen ? "px-3" : "justify-center px-2"
                  )
                }
              >
                {/* Refined icon styling */}
                <div className={cn(
                  "flex items-center justify-center",
                  !isSidebarOpen && "w-8 h-8 rounded-md bg-muted/30 p-1.5",
                  isActive && !isSidebarOpen && "bg-secondary/60 text-secondary-foreground"
                )}>
                  <item.icon className={cn(
                    "h-4 w-4", 
                    isSidebarOpen && "mr-2"
                  )} />
                </div>
                {isSidebarOpen && <span>{item.label}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
