// src/components/ui/LayoutSidebar.tsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Import shadcn Button

// Interface for sidebar links (or items in this case)
interface SidebarItem {
  id: string | number; // Use Bhajan ID
  label: string;      // Use Bhajan Title
  icon?: React.ReactNode; // Optional icon
  onClick?: () => void; // Action on click
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
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

// Provider component
export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(true); // Default to open on desktop

  // Allow controlled state
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  // Use effect to handle initial state based on screen size if needed
  // useEffect(() => {
  //   if (window.innerWidth < 768) setOpen(false); // Default closed on mobile
  // }, [setOpen]);


  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Main Sidebar component wrapper
export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

// Component to hold both desktop and mobile versions
export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      {/* Mobile sidebar trigger handled separately in page layout */}
    </>
  );
};

// Desktop specific sidebar
export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        // Adjusted styles to use theme variables
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-card border-r border-border w-[300px] flex-shrink-0 relative", // Added relative positioning
        className
      )}
      // Animate width only if animate prop is true
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      // Expand on hover
      onMouseEnter={() => animate && setOpen(true)}
      onMouseLeave={() => animate && setOpen(false)}
      {...props}
    >
        {/* Toggle Button for Desktop (optional, if you want manual toggle) */}
        {/* <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="absolute top-2 right-2 z-10">
            {open ? <X size={18}/> : <Menu size={18} />}
        </Button> */}
      {children}
    </motion.div>
  );
};

// Mobile specific sidebar (using shadcn Sheet)
export const MobileSidebar = ({
  className,
  children,
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
        {/* Trigger is handled outside this component */}
        <SheetContent side="left" className={cn("bg-card border-r border-border p-4 pt-10 w-full max-w-xs", className)}>
            {/* Close button is included in SheetContent */}
            {children}
        </SheetContent>
    </Sheet>
  );
};


// Sidebar Item Component
export const SidebarItem = ({
  item,
  className,
  isActive // Add isActive prop
}: {
  item: SidebarItem;
  className?: string;
  isActive?: boolean; // Highlight active item
}) => {
  const { open, animate } = useSidebar();
  return (
    <Button
        variant="ghost" // Use ghost variant for list items
        onClick={item.onClick}
        className={cn(
            "flex items-center justify-start gap-2 group/sidebar py-2 w-full h-auto text-sm", // Adjusted styles
            "text-muted-foreground hover:text-foreground hover:bg-muted", // Theme colors
            isActive && "bg-muted text-foreground font-medium", // Active state styles
            className
        )}
    >
      {item.icon && React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement, { className: cn("h-4 w-4 flex-shrink-0", isActive ? "text-primary" : "") }) : null}
      <motion.span
        // Animate visibility based on open state
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
            "group-hover/sidebar:translate-x-1 transition duration-150 whitespace-nowrap overflow-hidden text-ellipsis", // Added ellipsis
            "inline-block !p-0 !m-0" // Reset paragraph margins/paddings
            )}
      >
        {item.label}
      </motion.span>
    </Button>
  );
};
