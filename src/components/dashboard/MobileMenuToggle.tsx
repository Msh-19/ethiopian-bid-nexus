
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuToggleProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function MobileMenuToggle({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: MobileMenuToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="md:hidden fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      {isMobileMenuOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  );
}
