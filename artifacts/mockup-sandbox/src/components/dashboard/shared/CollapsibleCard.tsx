"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  storageKey?: string;
  children: React.ReactNode;
  className?: string;
}

export function CollapsibleCard({
  title,
  subtitle,
  icon,
  defaultOpen = false,
  storageKey,
  children,
  className,
}: CollapsibleCardProps) {
  const [open, setOpen] = React.useState(() => {
    if (storageKey) {
      try {
        const stored = localStorage.getItem(`collapsible:${storageKey}`);
        return stored ? stored === "open" : defaultOpen;
      } catch {
        return defaultOpen;
      }
    }
    return defaultOpen;
  });

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (storageKey) {
      try {
        localStorage.setItem(`collapsible:${storageKey}`, next ? "open" : "closed");
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] overflow-hidden",
        className
      )}
    >
      <Collapsible open={open} onOpenChange={handleOpenChange}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--canvas-surface-raised)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose-500)] focus-visible:ring-inset"
            aria-expanded={open}
          >
            <div className="flex items-center gap-3">
              {icon && (
                <span className="text-[var(--accent-rose-500)]">{icon}</span>
              )}
              <div>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                {subtitle && (
                  <p className="text-xs text-[#888] mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-[#666] transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="px-5 pb-5">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
