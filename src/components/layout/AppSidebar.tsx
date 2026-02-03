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
    >
      {/* Header - Freedom AI Brand */}
      <div className={cn("p-4 border-b border-sidebar-border", collapsed && "px-3")}>
        <Link to="/" className="flex items-center gap-3">
          {/* Yellow square mark */}
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-base">F</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-foreground text-sm leading-tight tracking-tight">Freedom AI</h1>
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
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
            isActive("/")
              ? "bg-primary-weak text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {isActive("/") && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
          )}
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Home</span>}
        </Link>

        {/* Divider */}
        <div className="py-2">
          <div className="h-px bg-border" />
        </div>

        {/* Sections */}
        {playbookSections.map((section) => {
          const Icon = section.icon;
          const active = isActive(section.route);
          return (
            <Link
              key={section.id}
              to={section.route}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                active
                  ? "bg-primary-weak text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
              )}
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{section.title}</span>
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="py-2">
          <div className="h-px bg-border" />
        </div>

        {/* Templates */}
        <Link
          to="/templates"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
            isActive("/templates")
              ? "bg-primary-weak text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {isActive("/templates") && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
          )}
          <Wrench className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Templates Comerciais</span>}
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        {!collapsed && (
          <p className="text-[10px] text-muted-foreground px-3">
            v1.0 · Atualizado hoje
          </p>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-center hover:bg-muted",
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
