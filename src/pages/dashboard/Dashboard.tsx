
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileMenuToggle } from "@/components/dashboard/MobileMenuToggle";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>((authUser?.role as UserRole) || "BIDDER");

  // Detect small screens and auto-collapse sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Redirect based on role when accessing /dashboard
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate(`/dashboard/${activeRole.toLowerCase()}`);
    }
  }, [location.pathname, activeRole, navigate]);

  // Set active role based on authenticated user's role
  useEffect(() => {
    if (authUser?.role) {
      setActiveRole(authUser.role as UserRole);
    }
  }, [authUser]);

  // For demonstration, allow role switching
  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    navigate(`/dashboard/${role.toLowerCase()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="flex-grow flex">
        {/* Mobile menu toggle button */}
        <MobileMenuToggle 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />

        {/* Sidebar component */}
        <DashboardSidebar
          activeRole={activeRole}
          handleRoleChange={handleRoleChange}
          isMobileMenuOpen={isMobileMenuOpen}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
