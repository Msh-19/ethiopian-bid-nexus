import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import SkipLink from "./components/SkipLink";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Bids from "./pages/bids/Bids";
import BidDetails from "./pages/bids/BidDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import BidderDashboard from "./pages/dashboard/BidderDashboard";
import OfficerDashboard from "./pages/dashboard/OfficerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CommitteeDashboard from "./pages/dashboard/CommitteeDashboard";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateBid from "./pages/dashboard/officer/CreateBid";
import ManageBids from "./pages/dashboard/officer/ManageBids";
import EvaluateProposal from "./pages/dashboard/committee/EvaluateProposal";
import UserManagement from "./components/admin/UserManagement";
import About from "./pages/About";

// Create placeholder components for routes that don't exist yet
const BidderProposals = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">My Proposals</h1><p>This feature is coming soon.</p></div>;
const BidderDeadlines = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Deadlines</h1><p>This feature is coming soon.</p></div>;
const BidderNotifications = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Notifications</h1><p>This feature is coming soon.</p></div>;
const OfficerProposals = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Proposals Review</h1><p>This feature is coming soon.</p></div>;
const AdminAnalytics = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Analytics</h1><p>This feature is coming soon.</p></div>;
const AdminSystemSettings = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">System Settings</h1><p>This feature is coming soon.</p></div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <TooltipProvider>
          <SkipLink />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/bids" element={<Bids />} />
              <Route path="/bids/:id" element={<BidDetails />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard/bidder" />} />
                {/* Bidder Routes */}
                <Route path="bidder/*" element={<BidderDashboard />} />
                {/* Officer Routes */}
                <Route path="officer" element={<OfficerDashboard />} />
                <Route path="officer/create" element={<CreateBid />} />
                <Route path="officer/manage" element={<ManageBids />} />
                <Route path="officer/proposals" element={<OfficerProposals />} />
                {/* Committee Routes */}
                <Route path="committee" element={<CommitteeDashboard />} />
                <Route path="committee/evaluate/:id" element={<EvaluateProposal />} />
                {/* Admin Routes */}
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/users" element={<UserManagement />} />
                <Route path="admin/analytics" element={<AdminAnalytics />} />
                <Route path="admin/settings" element={<AdminSystemSettings />} />
              </Route>
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
