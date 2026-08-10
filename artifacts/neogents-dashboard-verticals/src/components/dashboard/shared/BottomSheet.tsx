"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: BottomSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          "max-h-[85vh] rounded-t-2xl border-t border-[var(--glass-border)] bg-[var(--glass-thick-bg)] backdrop-blur-[var(--glass-thick-blur)]",
          className
        )}
      >
        <div className="absolute left-1/2 top-3 -translate-x-1/2 w-10 h-1 rounded-full bg-[#444]" />
        <SheetHeader className="mt-4 text-left">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-base font-semibold">
              {title}
            </SheetTitle>
            <SheetClose asChild>
              <button
                type="button"
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent-rose-500)] focus:ring-offset-2"
              >
                <X className="h-4 w-4 text-white" />
                <span className="sr-only">Close</span>
              </button>
            </SheetClose>
          </div>
          {description && (
            <SheetDescription className="text-[#888] text-sm">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="mt-4 overflow-y-auto custom-scrollbar max-h-[calc(85vh-8rem)]">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
