import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "मुख्य पृष्ठ" },
    { href: "#mantras", label: "मंत्र संग्रह" },
    { href: "#havan", label: "हवन विधि" },
    { href: "#about", label: "परिचय" },
    { href: "#pdf", label: "पूर्ण PDF" },
  ];

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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-lg font-devanagari text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
