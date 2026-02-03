import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface PlaybookCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string; // Kept for compatibility but now using unified style
  route: string;
}

export function PlaybookCard({ title, subtitle, icon: Icon, route }: PlaybookCardProps) {
  return (
    <Link to={route} className="block group">
      <div className="playbook-card h-full">
        {/* Icon with Freedom yellow background */}
        <div className="icon-box">
          <Icon className="w-5 h-5" />
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-foreground text-lg mb-2 tracking-tight group-hover:text-foreground transition-colors">
          {title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
