// src/components/Navbar.tsx
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"; // Added ChevronRight
import { Button } from "@/components/ui/button";
// Updated imports from useNavigation hook
import { useNavigation, buildMenuTree, NavItemWithChildren, NavigationItem } from "@/hooks/useNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal, // Added Portal
  DropdownMenuSub, // Added Sub
  DropdownMenuSubContent, // Added SubContent
  DropdownMenuSubTrigger, // Added SubTrigger
  DropdownMenuSeparator, // Optional: Added Separator
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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


  // --- Helper Function to Render Menu Items Recursively ---
  const renderMenuItems = (items: NavItemWithChildren[], isSubmenu = false) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;

      // Case 1: Item has children -> Render Submenu Trigger
      if (hasChildren) {
         // Render as DropdownMenuSub for nested levels
        if (isSubmenu) {
           return (
            <DropdownMenuSub key={item.id}>
              <DropdownMenuSubTrigger className="font-devanagari cursor-pointer justify-between">
                <span>{item.title}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {renderMenuItems(item.children!, true)} {/* Recursive call */}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
           );
        }
         // Render as top-level DropdownMenu
        else {
          return (
             <DropdownMenu key={item.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-4 py-2 font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium"
                  >
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {renderMenuItems(item.children!, true)} {/* Recursive call */}
                </DropdownMenuContent>
              </DropdownMenu>
          );
        }
      }
      // Case 2: Item has no children -> Render Link or Simple Item
      else {
        // Render as DropdownMenuItem if inside a submenu
        if (isSubmenu) {
          return (
            <DropdownMenuItem key={item.id} asChild>
              <a href={item.link || "#"} className="font-devanagari cursor-pointer">
                {item.title}
              </a>
            </DropdownMenuItem>
          );
        }
        // Render as top-level Link Button
        else {
          return (
             <a
              key={item.id}
              href={item.link || "#"}
              className={cn(
                  "px-4 py-2 rounded-lg font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium",
                  // Add button styles for consistency if needed, e.g., using buttonVariants
                 buttonVariants({ variant: "ghost", className: "justify-start" }) // Example styling
              )}
            >
              {item.title}
            </a>
          );
        }
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
           <a
             href={item.link || "#"}
             style={{ paddingLeft: `calc(1rem + ${paddingLeft})` }} // Apply indentation
             className="block py-3 rounded-lg font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300"
             onClick={() => !hasChildren && setIsOpen(false)} // Close only if it's a leaf node
           >
             {item.title}
             {/* Optionally add indicator for items with children */}
             {/* {hasChildren && <ChevronDown className="inline w-4 h-4 ml-1" />} */}
           </a>
           {/* Render children recursively */}
           {hasChildren && (
             <div className="border-l border-border/50 ml-4"> {/* Indent line */}
               {renderMobileMenuItems(item.children!, level + 1)}
             </div>
           )}
         </div>
       );
     });
   };

  // --- Loading State ---
  if (isLoading) {
    // Skeleton loading state (remains the same)
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div>
              <h1 className="text-2xl font-bold font-devanagari text-gradient">
                आर्य समाज
              </h1>
              <p className="text-xs text-muted-foreground">Eternal Tradition of Truth</p>
            </div>
             {/* Add skeleton for nav items */}
             <div className="hidden md:flex items-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
             </div>
          </div>
        </div>
      </nav>
    );
  }

  // --- Render Component ---
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Title (remains the same) */}
          <a href="/" className="flex items-center space-x-3 group">
            <div>
              <h1 className="text-2xl font-bold font-devanagari text-gradient">
                आर्य समाज
              </h1>
              <p className="text-xs text-muted-foreground">Eternal Tradition of Truth</p>
            </div>
          </a>

          {/* Desktop Navigation - Use the render function */}
          <div className="hidden md:flex items-center space-x-1">
             {renderMenuItems(finalNavItems)}
          </div>

          {/* Mobile Menu Button (remains the same) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation - Use the render function */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-border max-h-[70vh] overflow-y-auto"> {/* Added max-height and scroll */}
             {renderMobileMenuItems(finalNavItems)}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
