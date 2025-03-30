
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LifeBuoy, Menu, X } from "lucide-react";

const AuthHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Affiliate program", href: "/affiliate" },
    { name: "About us", href: "/about" },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange bg-clip-text text-transparent">
              BrandWise
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          {/* Navigation - desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/10 transition-colors text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/support"
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/10 transition-colors text-muted-foreground"
              )}
            >
              <LifeBuoy className="h-4 w-4" />
              <span>Support</span>
            </Link>
            <div className="h-6 border-l mx-2"></div>
            <Link to="/register">
              <Button variant="ghost" size="sm">Register</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t my-2 pt-2">
              <Link
                to="/support"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LifeBuoy className="h-4 w-4" />
                <span>Support</span>
              </Link>
              <div className="flex gap-2 mt-2 px-3">
                <Link to="/register" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Register</Button>
                </Link>
                <Link to="/login" className="flex-1">
                  <Button size="sm" className="w-full">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthHeader;
