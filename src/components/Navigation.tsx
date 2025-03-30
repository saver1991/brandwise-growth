import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  MessageSquare,
  BarChart2,
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileSwitcher from "./ProfileSwitcher";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Content Calendar",
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Content Creation",
      href: "/ideas",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Audience Growth",
      href: "/audience",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "LinkedIn Strategy",
      href: "/linkedin",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      title: "Medium Content",
      href: "/medium",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "WordPress",
      href: "/wordpress",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Growth Analytics",
      href: "/analytics",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange bg-clip-text text-transparent">
              BrandWise
            </span>
          </Link>

          {isMobile ? (
            <>
              <div className="flex items-center gap-2">
                <ProfileSwitcher />
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={toggleMobileMenu}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>

              {mobileMenuOpen && (
                <div className="fixed inset-0 top-16 z-50 bg-background animate-fade-in">
                  <nav className="flex flex-col gap-2 p-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/10 transition-colors",
                      window.location.pathname === item.href ? "bg-accent/20 text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
              <ProfileSwitcher />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
