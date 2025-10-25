// src/components/ui/LayoutSidebar.tsx
import React, { useState, createContext, useContext, useEffect } from "react";
// Remove motion imports if animate=false is always used for desktop
// import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet"; // Keep Sheet for Mobile potentially

// Interface for sidebar links (or items in this case)
export interface SidebarItemProps {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface SidebarContextProps {
  open: boolean; // Keep for mobile sheet state
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // animate: boolean; // Removed animate from context if always false for desktop
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Provider component - Manages state primarily for mobile sheet now
export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
}: {
  children: React.ReactNode;
  open?: boolean; // Mobile sheet open state
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openState, setOpenState] = useState(false); // Default mobile sheet to closed

  // Allow controlled state
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    // Removed animate from context value
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Main Sidebar component wrapper - Pass state for mobile sheet
export const Sidebar = ({
  children,
  open, // Mobile sheet open state
  setOpen, // Mobile sheet setOpen state
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen}>
      {children}
    </SidebarProvider>
  );
};

// Component to hold the desktop sidebar implementation (simplified)
export const SidebarBody = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => { // Changed from motion.div props
  // Removed context usage related to animation/hover
  return (
    <div // Changed from motion.div
      className={cn(
        // Always visible desktop sidebar, fixed width
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-card border-r border-border w-[300px] flex-shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};


// Sidebar Item Component (simplified, no animation needed)
export const SidebarItem = ({
  item,
  className,
  isActive
}: {
  item: SidebarItemProps;
  className?: string;
  isActive?: boolean;
}) => {
  // Removed context usage for open/animate
  return (
    <Button
        variant="ghost"
        onClick={item.onClick}
        className={cn(
            "flex items-center justify-start gap-2 group/sidebar py-2 w-full h-auto text-sm px-2", // Keep gap and padding
            "text-muted-foreground hover:text-foreground hover:bg-muted",
            isActive && "bg-muted text-foreground font-medium",
            className
        )}
    >
      {/* Icon */}
      {item.icon && React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement, { className: cn("h-4 w-4 flex-shrink-0 transition-colors", isActive ? "text-primary" : "") }) : <span className="w-4 h-4 flex-shrink-0"></span>}

      {/* Label Text - Always visible */}
      <span
        className={cn(
            "whitespace-nowrap overflow-hidden text-ellipsis ml-2", // Keep ellipsis, add ml-2 for gap
            "inline-block !p-0 !m-0"
            )}
      >
        {item.label}
      </span>
    </Button>
  );
};
