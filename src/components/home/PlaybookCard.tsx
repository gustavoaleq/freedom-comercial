import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaybookCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: "blue" | "purple" | "green" | "orange" | "yellow" | "red" | "teal" | "pink";
  route: string;
}

const iconColorClasses = {
  blue: "icon-box-blue",
  purple: "icon-box-purple",
  green: "icon-box-green",
  orange: "icon-box-orange",
  yellow: "icon-box-yellow",
  red: "icon-box-red",
  teal: "icon-box-teal",
  pink: "icon-box-pink",
};

export function PlaybookCard({ title, subtitle, icon: Icon, iconColor, route }: PlaybookCardProps) {
  return (
    <Link to={route} className="block group">
      <div className="playbook-card h-full">
        <div className={cn("icon-box", iconColorClasses[iconColor])}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
