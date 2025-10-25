// src/components/Navbar.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Only need Menu and X now
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  ListItem, // Import the new ListItem
  navigationMenuTriggerStyle // Import trigger style for direct links
} from "@/components/ui/navigation-menu"; // Use the updated navigation-menu component
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose // Import SheetClose
} from "@/components/ui/sheet"; // Import Sheet components for mobile
import { useNavigation, buildMenuTree, NavItemWithChildren } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: navigationItems, isLoading } = useNavigation();

  // Create Home Link Manually (as before)
  const homeLink: NavItemWithChildren = {
    id: 0,
    title: "Home",
    link: "/",
    parent_menu: null,
    display_order: -1, // Ensure it comes first
    children: []
  };

  // Build the hierarchical tree
  const menuTree = buildMenuTree(navigationItems);
  const finalNavItems = [homeLink, ...menuTree]; // Add home link to the tree

  // --- Helper Function to Render Desktop Menu Items Recursively ---
  const renderNavMenuItems = (items: NavItemWithChildren[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;

      // Case 1: Item has children -> Render Trigger + Content with children
      if (hasChildren) {
        return (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuTrigger className="font-devanagari"> {/* Add font class */}
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {renderNavMenuItemsContent(item.children!)} {/* Use new helper */}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      }
      // Case 2: Item has no children -> Render Simple Link
      else {
        return (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink asChild>
               <a
                href={item.link || "#"}
                className={cn(navigationMenuTriggerStyle(), "font-devanagari")} // Apply style and font
               >
                 {item.title}
               </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        );
      }
    });
  };

   // --- Helper Function to Render Content Items (using ListItem) ---
   const renderNavMenuItemsContent = (items: NavItemWithChildren[]) => {
      return items.map((item) => (
         <ListItem
           key={item.id}
           title={item.title}
           href={item.link || "#"}
           className="font-devanagari" // Add font class
         >
           {/* You might want to add a short description in your DB or generate one */}
           {item.title} {/* Placeholder description */}
         </ListItem>
      ));
   };


  // --- Helper Function to Render Mobile Menu Items Recursively ---
   const renderMobileMenuItems = (items: NavItemWithChildren[], level = 0) => {
    return items.map((item) => {
       const hasChildren = item.children && item.children.length > 0;
       const paddingLeft = `${level * 1}rem`; // Indent based on level

       return (
         <div key={item.id}>
           {/* Use SheetClose for leaf nodes to close the sheet on click */}
           {hasChildren ? (
              <span
                style={{ paddingLeft: `calc(0.5rem + ${paddingLeft})` }} // Apply indentation
                className="block py-3 font-devanagari text-foreground/80 font-medium" // Style as non-link if it has children
              >
               {item.title}
              </span>
           ) : (
             <SheetClose asChild>
               <a
                 href={item.link || "#"}
                 style={{ paddingLeft: `calc(0.5rem + ${paddingLeft})` }} // Apply indentation
                 className="block py-3 rounded-lg font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300"
               >
                 {item.title}
               </a>
             </SheetClose>
            )}

           {/* Render children recursively */}
           {hasChildren && (
             <div className="ml-4"> {/* Indent children */}
               {renderMobileMenuItems(item.children!, level + 1)}
             </div>
           )}
         </div>
       );
     });
   };

  // --- Loading State ---
  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow h-16 flex items-center"> {/* Adjusted height */}
        <div className="container mx-auto px-4 flex justify-between items-center">
             {/* Simple Skeleton for Loading */}
             <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
             </div>
             <Skeleton className="h-10 w-10 md:hidden" />
        </div>
      </nav>
    );
  }

  // --- Render Component ---
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow h-16 flex items-center"> {/* Adjusted height */}
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Desktop Navigation using NavigationMenu */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {renderNavMenuItems(finalNavItems)}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Placeholder for potential right-aligned items on desktop if needed */}
        <div className="hidden md:flex"></div>

        {/* Mobile Menu Trigger using Sheet */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-4 pt-10 overflow-y-auto"> {/* Adjust width/padding */}
               {renderMobileMenuItems(finalNavItems)}
            </SheetContent>
          </Sheet>
        </div>

         {/* Mobile Title/Placeholder (Optional) - Centered when menu button is on the left */}
         <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
             {/* You could add a small icon or text here if needed */}
         </div>

      </div>
    </nav>
  );
};

export default Navbar;
