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
    });
  };

   // --- Helper Function to Render Items INSIDE NavigationMenuContent ---
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


  // --- Helper Function to Render Mobile Menu Items Recursively ---
   const renderMobileMenuItems = (items: NavItemWithChildren[], level = 0) => {
    return items.map((item) => {
       const hasChildren = item.children && item.children.length > 0;
       const paddingLeft = `${level * 1}rem`;

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
        {/* Changed justify-between to justify-center */}
        <div className="container mx-auto px-4 flex justify-center items-center relative">
             <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
             </div>
             {/* Position mobile skeleton absolutely */}
             <Skeleton className="h-10 w-10 md:hidden absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </nav>
    );
  }

  // --- Render Component ---
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow h-16 flex items-center">
      {/* Changed justify-between to justify-center */}
      <div className="container mx-auto px-4 flex justify-center items-center relative">

        {/* Desktop Navigation using NavigationMenu - Now centered */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {renderNavMenuItems(finalNavItems)}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Trigger using Sheet (Positioned absolutely) */}
        <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
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

        {/* Removed the empty spacer div */}

      </div>
    </nav>
  );
};

export default Navbar;
