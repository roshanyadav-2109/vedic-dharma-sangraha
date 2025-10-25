// src/components/Navbar.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useNavigation, buildMenuTree, NavItemWithChildren } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: navigationItems, isLoading } = useNavigation();

  const homeLink: NavItemWithChildren = {
    id: 0,
    title: "Home",
    link: "/",
    parent_menu: null,
    display_order: -1,
    children: []
  };

  const menuTree = buildMenuTree(navigationItems);
  const finalNavItems = [homeLink, ...menuTree];

  // --- Helper Function to Render Desktop Menu Items (Top Level) ---
  const renderNavMenuItems = (items: NavItemWithChildren[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;

      if (hasChildren) {
        return (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuTrigger className="font-devanagari">
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* Updated Structure for Content */}
              <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {/* Call the content renderer */}
                {renderNavMenuContentItems(item.children!)}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      } else {
        return (
          <NavigationMenuItem key={item.id}>
             {/* Use NavigationMenuLink and style it like a trigger */}
             <NavigationMenuLink href={item.link || "#"} className={cn(navigationMenuTriggerStyle(), "font-devanagari")}>
               {item.title}
             </NavigationMenuLink>
          </NavigationMenuItem>
        );
      }
    });
  };

   // --- NEW Helper Function to Render Items INSIDE NavigationMenuContent ---
   const renderNavMenuContentItems = (items: NavItemWithChildren[]) => {
      return items.map((item) => {
         const hasChildren = item.children && item.children.length > 0;

         // If this item itself has children (secondary submenu)
         if (hasChildren) {
             return (
                 // Render as a group: Title + List of child ListItems
                 // Using React.Fragment to avoid unnecessary wrapping elements affecting grid
                 <React.Fragment key={`${item.id}-group`}>
                     {/* Column Span for Title if using grid */}
                     <li className="md:col-span-2 lg:col-span-2"> {/* Adjust span as needed */}
                         <p className="px-3 py-2 text-sm font-semibold text-foreground font-devanagari">
                             {item.title}
                         </p>
                         <ul className="grid gap-1 pl-3"> {/* Nested list for children */}
                             {renderNavMenuContentItems(item.children!)} {/* Recursive call */}
                         </ul>
                     </li>
                 </React.Fragment>
             );
         }
         // If it's a leaf node (simple link)
         else {
             return (
                 <ListItem
                   key={item.id}
                   title={item.title}
                   href={item.link || "#"}
                   className="font-devanagari"
                 >
                   {/* Add a short description if available in your data, otherwise keep title */}
                   {item.title}
                 </ListItem>
             );
         }
      });
   };


  // --- Helper Function to Render Mobile Menu Items Recursively ---
   const renderMobileMenuItems = (items: NavItemWithChildren[], level = 0) => {
    return items.map((item) => {
       const hasChildren = item.children && item.children.length > 0;
       const paddingLeft = `${level * 1}rem`; // Indent based on level

       return (
         <div key={item.id}>
           {hasChildren ? (
              <span
                style={{ paddingLeft: `calc(0.5rem + ${paddingLeft})` }}
                className="block py-3 font-devanagari text-foreground/80 font-medium"
              >
               {item.title}
              </span>
           ) : (
             <SheetClose asChild>
               <a
                 href={item.link || "#"}
                 style={{ paddingLeft: `calc(0.5rem + ${paddingLeft})` }}
                 className="block py-3 rounded-lg font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300"
               >
                 {item.title}
               </a>
             </SheetClose>
            )}
           {hasChildren && (
             <div className="ml-4">
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow h-16 flex items-center">
        <div className="container mx-auto px-4 flex justify-center items-center"> {/* Centered skeleton */}
             <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
             </div>
             {/* Keep mobile skeleton off to the side */}
             <Skeleton className="h-10 w-10 md:hidden absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </nav>
    );
  }

  // --- Render Component ---
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow h-16 flex items-center">
      {/* Centered container for desktop menu */}
      <div className="container mx-auto px-4 flex justify-center md:justify-between items-center">

        {/* Desktop Navigation using NavigationMenu */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {renderNavMenuItems(finalNavItems)}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Trigger using Sheet (Positioned absolutely for small screens) */}
        <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2"> {/* Position button left */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-4 pt-10 overflow-y-auto">
               {renderMobileMenuItems(finalNavItems)}
            </SheetContent>
          </Sheet>
        </div>

         {/* Mobile Title/Placeholder (Optional) - Removed absolute positioning */}
         {/* <div className="md:hidden"> */}
             {/* You could add a small icon or text here if needed, centered by the parent flex */}
         {/* </div> */}

         {/* Empty div on the right for desktop to balance justify-between */}
         <div className="hidden md:flex w-10"></div>


      </div>
    </nav>
  );
};

export default Navbar;
