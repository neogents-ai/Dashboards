import * as React from "react";
import { cn } from "@/lib/utils";

interface KpiTileProps {
  label: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function KpiTile({
  label,
  value,
  subtitle,
  trend,
  trendPositive,
  icon,
  className,
}: KpiTileProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--dl-muted)]">
          {label}
        </span>
        {icon && <div className="text-[var(--dl-muted)]">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-[var(--dl-ink)]">{value}</span>
        {subtitle && (
          <span className="text-sm text-[var(--dl-muted)]">{subtitle}</span>
        )}
      </div>
      {trend && (
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            trendPositive ? "text-emerald-600" : "text-red-500"
          )}
        >
          {trend}
        </p>
      )}
    </div>
  );
}
