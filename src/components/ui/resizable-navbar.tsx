// src/components/ui/resizable-navbar.tsx
"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { ReactNode, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  ListItem,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { NavItemWithChildren } from "@/hooks/useNavigation";

// Main Navbar Wrapper
export const Navbar = ({ children }: { children: ReactNode }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md"
    >
      {children}
    </motion.nav>
  );
};

// Desktop Navigation Body
export const NavBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto hidden h-16 max-w-7xl items-center justify-between px-4 md:flex">
      {children}
    </div>
  );
};

// Navbar Logo
export const NavbarLogo = ({ src, alt, hideOnHome }: { src: string; alt: string; hideOnHome?: boolean }) => {
  if (hideOnHome) {
    return <div className="w-40" />; // Spacer
  }
  return (
    <a href="/" className="flex items-center">
      <img src={src} alt={alt} className="h-10 w-auto" />
    </a>
  );
};


// Desktop Navigation Items
export const NavItems = ({ items }: { items: NavItemWithChildren[] }) => {
    const renderNavMenuContentItems = (items: NavItemWithChildren[]) => {
      return items.map((item) => {
         const hasChildren = item.children && item.children.length > 0;

         if (hasChildren) {
             return (
                 <React.Fragment key={`${item.id}-group`}>
                     <li className="md:col-span-2 lg:col-span-2">
                         <p className="px-3 py-2 text-sm font-semibold text-foreground font-devanagari">
                             {item.title}
                         </p>
                         <ul className="grid gap-1 pl-3">
                             {renderNavMenuContentItems(item.children!)}
                         </ul>
                     </li>
                 </React.Fragment>
             );
         }
         else {
             return (
                 <ListItem
                   key={item.id}
                   title={item.title}
                   href={item.link || "#"}
                   className="font-devanagari"
                 >
                   {item.title}
                 </ListItem>
             );
         }
      });
   };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          if (hasChildren) {
            return (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuTrigger className="font-devanagari">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {renderNavMenuContentItems(item.children!)}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          } else {
            return (
              <NavigationMenuItem key={item.id}>
                 <NavigationMenuLink href={item.link || "#"} className={cn(navigationMenuTriggerStyle(), "font-devanagari")}>
                   {item.title}
                 </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};


// Navbar Button
export const NavbarButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    asChild?: boolean;
  }
>(({ variant = "primary", className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "div" : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        className
      )}
      {...props}
    />
  );
});

// Mobile Navigation Wrapper
export const MobileNav = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:hidden">{children}</div>;
};

// Mobile Navigation Header
export const MobileNavHeader = ({ children }: { children: ReactNode }) => {
    return <div className="flex w-full items-center justify-between">{children}</div>;
};


// Mobile Navigation Toggle Button
export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button onClick={onClick} className="rounded-md p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
};

// Mobile Navigation Menu
export const MobileNavMenu = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: isOpen ? 0 : "-100vh" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute inset-x-0 top-full flex h-screen w-full flex-col gap-6 bg-neutral-50 p-8 dark:bg-neutral-900"
    >
      {children}
    </motion.div>
  );
};
