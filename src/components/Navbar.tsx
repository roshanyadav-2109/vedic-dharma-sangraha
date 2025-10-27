// src/components/Navbar.tsx
import { useState } from "react";
import { useNavigation, buildMenuTree, NavItemWithChildren } from "@/hooks/useNavigation";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useLocation } from "react-router-dom";
import aryaSamajLogo from '@/assets/aryasamaj.png';
import { SheetClose } from "./ui/sheet";

const NavbarComponent = () => {
  const { data: navigationItems, isLoading } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
             <a
               href={item.link || "#"}
               onClick={() => setIsMobileMenuOpen(false)}
               style={{ paddingLeft: `calc(0.5rem + ${paddingLeft})` }}
               className="block relative py-3 rounded-lg font-devanagari text-neutral-600 dark:text-neutral-300 hover:text-primary hover:bg-primary/5 transition-all duration-300"
             >
               <span className="block">{item.title}</span>
             </a>
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

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo src={aryaSamajLogo} alt="Arya Samaj Logo" hideOnHome={isHomePage} />
          <NavItems items={finalNavItems} />
          <div className="flex items-center gap-4">
            <NavbarButton asChild variant="primary">
                <a href="/donate">Donate</a>
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo src={aryaSamajLogo} alt="Arya Samaj Logo" />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {renderMobileMenuItems(finalNavItems)}
            <div className="flex w-full flex-col gap-4 pt-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  // You can add navigation logic here if needed, e.g., navigate('/donate')
                }}
                asChild
                variant="primary"
                className="w-full"
              >
                <a href="/donate">Donate</a>
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};


// Renamed the original component to avoid conflict
const OriginalNavbar = () => {
  // The old code is preserved here but not exported as default
  return <div>Old Navbar</div>
}

export default NavbarComponent;
