import { Link, useLocation } from "react-router-dom";
import { Search, Home, Wrench, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { playbookSections } from "@/data/playbookData";

interface AppHeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function AppHeader({ onSearch, searchQuery = "" }: AppHeaderProps) {
  const location = useLocation();

  const getCurrentSection = () => {
    const section = playbookSections.find(s => s.route === location.pathname);
    if (section) return section.title;
    if (location.pathname === "/templates") return "Templates Comerciais";
    return null;
  };

  const currentSection = getCurrentSection();

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          {currentSection && (
            <>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium">{currentSection}</span>
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar no playbook…"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              className="pl-9 h-9 bg-muted/50 border-border focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>

          {/* Templates Button */}
          <Button variant="outline" size="sm" asChild className="border-border hover:bg-primary-weak hover:border-primary/30">
            <Link to="/templates" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Templates
            </Link>
          </Button>

          {/* Home Button */}
          <Button variant="ghost" size="sm" asChild className="hover:bg-muted">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
