import { Link, useLocation } from "react-router-dom";
import { Home, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { playbookSections } from "@/data/playbookData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (route: string) => location.pathname === route;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
      style={{ boxShadow: "var(--shadow-sidebar)" }}
    >
      {/* Header */}
      <div className={cn("p-4 border-b border-sidebar-border", collapsed && "px-2")}>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-foreground text-sm leading-tight">Freedom AI</h1>
              <p className="text-xs text-muted-foreground">Playbook Comercial</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {/* Home */}
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
            isActive("/")
              ? "bg-primary text-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Home</span>}
        </Link>

        {/* Divider */}
        <div className="py-2">
          <div className="h-px bg-sidebar-border" />
        </div>

        {/* Sections */}
        {playbookSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              to={section.route}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive(section.route)
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{section.title}</span>
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="py-2">
          <div className="h-px bg-sidebar-border" />
        </div>

        {/* Templates */}
        <Link
          to="/templates"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
            isActive("/templates")
              ? "bg-primary text-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Wrench className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Templates Comerciais</span>}
        </Link>
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-center",
            !collapsed && "justify-start"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">Recolher</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
