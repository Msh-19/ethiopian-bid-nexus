
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import { ChevronRight } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";
import { SidebarNavigation } from "./SidebarNavigation";
import { Settings } from "lucide-react";

interface DashboardSidebarProps {
  activeRole: UserRole;
  handleRoleChange: (role: UserRole) => void;
  isMobileMenuOpen: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function DashboardSidebar({
  activeRole,
  handleRoleChange,
  isMobileMenuOpen,
  isSidebarOpen,
  setIsSidebarOpen
}: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div 
      className={`${
        isMobileMenuOpen 
          ? "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm" 
          : "hidden md:block"
      } ${
        isSidebarOpen ? "w-64" : "w-16"
      } border-r transition-all duration-300`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {isSidebarOpen && (
            <div>
              <h2 className="font-semibold">Dashboard</h2>
              <p className="text-xs text-muted-foreground">Your Organization</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:flex hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${isSidebarOpen ? "" : "rotate-180"}`} />
          </Button>
        </div>

        {/* Role Switcher Component */}
        <RoleSwitcher
          activeRole={activeRole}
          handleRoleChange={handleRoleChange}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Navigation Menu Component */}
        <SidebarNavigation 
          activeRole={activeRole} 
          isSidebarOpen={isSidebarOpen}
          activePath={location.pathname}
        />

        <div className="mt-auto pt-8">
          <Button
            variant="outline"
            className={`w-full justify-start ${!isSidebarOpen && "justify-center"}`}
            onClick={() => navigate("/settings")}
          >
            {!isSidebarOpen ? (
              <div className="w-8 h-8 rounded-md bg-muted/30 flex items-center justify-center p-1.5">
                <Settings className="h-4 w-4" />
              </div>
            ) : (
              <>
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
