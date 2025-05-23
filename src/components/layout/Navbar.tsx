import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { User } from "@/types";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NavbarProps = {
  user?: User | null;
};

export function Navbar({ user: propUser }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Use propUser if provided, otherwise use authUser
  const user = propUser || authUser;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-background border-b">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center gap-x-8 h-20 min-h-0">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary">
                  Ethiopia Bid-Chain
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/bids"
                className="inline-flex items-center px-1 pt-1 text-base md:text-lg lg:text-xl xl:text-2xl font-semibold border-b-2 border-transparent hover:border-primary hover:text-primary transition-colors"
              >
                Browse Bids
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-base md:text-lg lg:text-xl xl:text-2xl font-semibold border-b-2 border-transparent hover:border-primary hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 text-base md:text-lg lg:text-xl xl:text-2xl font-semibold border-b-2 border-transparent hover:border-primary hover:text-primary transition-colors"
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <ThemeSwitcher />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="lg" className="relative h-14 w-14 rounded-full p-0">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-base md:text-lg lg:text-xl font-medium leading-none">{user.name}</p>
                      <p className="text-xs md:text-sm leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/auth/login">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg">Login</Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="lg" className="px-8 py-3 text-lg">Register</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden absolute left-0 right-0 bg-background shadow-lg z-50">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/bids"
              className="block pl-3 pr-4 py-2 text-lg md:text-xl font-semibold hover:bg-gray-50 rounded-md"
              onClick={toggleMenu}
            >
              Browse Bids
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="block pl-3 pr-4 py-2 text-lg md:text-xl font-semibold hover:bg-gray-50 rounded-md"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 text-lg md:text-xl font-semibold hover:bg-gray-50 rounded-md"
              onClick={toggleMenu}
            >
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
                  onClick={toggleMenu}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
