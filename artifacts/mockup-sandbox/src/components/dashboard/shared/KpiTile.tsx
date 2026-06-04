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
        <span className="text-xs font-medium uppercase tracking-wider text-[#888]">
          {label}
        </span>
        {icon && <div className="text-[#666]">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {subtitle && (
          <span className="text-sm text-[#888]">{subtitle}</span>
        )}
      </div>
      {trend && (
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            trendPositive ? "text-emerald-400" : "text-red-400"
          )}
        >
          {trend}
        </p>
      )}
    </div>
  );
}
