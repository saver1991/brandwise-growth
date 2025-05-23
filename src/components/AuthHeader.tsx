
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LifeBuoy, Menu, X } from "lucide-react";
import ProfileSwitcher from "./ProfileSwitcher";

const AuthHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if user is logged in by checking if the path includes dashboard or other authenticated routes
  const isLoggedIn = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/calendar') || 
                     location.pathname.includes('/ideas') ||
                     location.pathname.includes('/profiles') ||
                     location.pathname.includes('/account');

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
          {/* Logo - fixed to point to /home instead of / */}
          <Link to={isLoggedIn ? "/dashboard" : "/home"} className="flex items-center gap-2">
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
            
            {isLoggedIn ? (
              <ProfileSwitcher />
            ) : (
              <>
                <Link to="/register">
                  <Button variant="ghost" size="sm">Register</Button>
                </Link>
                <Link to="/login">
                  <Button size="sm">Login</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu - vertically stacked */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/10 w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t my-2 pt-2 space-y-2">
              <Link
                to="/support"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/10 w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LifeBuoy className="h-4 w-4" />
                <span>Support</span>
              </Link>
              
              {isLoggedIn ? (
                <Link to="/dashboard" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Register</Button>
                  </Link>
                  <Link to="/login" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full">Login</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthHeader;
