import { ReactNode, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

interface ContentBlockProps {
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  copyable?: boolean;
  copyText?: string;
}

export function ContentBlock({ 
  title, 
  children, 
  collapsible = true, 
  defaultOpen = true,
  copyable = false,
  copyText
}: ContentBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="content-block">
      <div 
        className={cn(
          "flex items-center justify-between",
          collapsible && "cursor-pointer"
        )}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {collapsible && (
            isOpen ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )
          )}
          <h3 className="text-lg font-semibold text-foreground tracking-tight">{title}</h3>
        </div>
        {copyable && copyText && isOpen && (
          <div onClick={(e) => e.stopPropagation()}>
            <CopyButton text={copyText} />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="mt-4 text-muted-foreground leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
