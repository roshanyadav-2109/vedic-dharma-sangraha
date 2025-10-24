import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation, buildMenuStructure } from "@/hooks/useNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: navigationItems, isLoading } = useNavigation();

  if (isLoading || !navigationItems) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full sacred-gradient flex items-center justify-center divine-glow">
                <span className="text-2xl font-bold text-primary-foreground">ॐ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-devanagari text-gradient">
                  वैदिक हवन पद्धति
                </h1>
                <p className="text-xs font-devanagari text-muted-foreground">सनातन धर्म की शाश्वत परंपरा</p>
              </div>
            </a>
          </div>
        </div>
      </nav>
    );
  }

  const { topLevel, dropdowns } = buildMenuStructure(navigationItems);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border temple-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full sacred-gradient flex items-center justify-center divine-glow">
              <span className="text-2xl font-bold text-primary-foreground">ॐ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-devanagari text-gradient">
                वैदिक हवन पद्धति
              </h1>
              <p className="text-xs font-devanagari text-muted-foreground">सनातन धर्म की शाश्वत परंपरा</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {topLevel.map((item) => {
              const hasDropdown = dropdowns[item.title];
              
              if (hasDropdown) {
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
                      {hasDropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.id} asChild>
                          <a
                            href={subItem.link || "#"}
                            className="font-devanagari cursor-pointer"
                          >
                            {subItem.title}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.link || "#"}
                  className="px-4 py-2 rounded-lg font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium"
                >
                  {item.title}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {topLevel.map((item) => {
              const hasDropdown = dropdowns[item.title];
              
              return (
                <div key={item.id}>
                  <a
                    href={item.link || "#"}
                    className="block px-4 py-3 rounded-lg font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                    onClick={() => !hasDropdown && setIsOpen(false)}
                  >
                    {item.title}
                  </a>
                  {hasDropdown && (
                    <div className="pl-4 space-y-1">
                      {hasDropdown.map((subItem) => (
                        <a
                          key={subItem.id}
                          href={subItem.link || "#"}
                          className="block px-4 py-2 rounded-lg font-devanagari text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
