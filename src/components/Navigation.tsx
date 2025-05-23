
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  X,
  UserPlus,
  Percent
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileSwitcher from "./ProfileSwitcher";
import { useProfile } from "@/contexts/ProfileContext";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  requiresProfile?: boolean;
}

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { hasProfiles } = useProfile();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Content Calendar",
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
      requiresProfile: true,
    },
    {
      title: "Content Creation",
      href: "/ideas",
      icon: <BookOpen className="h-5 w-5" />,
      requiresProfile: true,
    },
    {
      title: "Audience Growth",
      href: "/audience",
      icon: <Users className="h-5 w-5" />,
      requiresProfile: true,
    },
    {
      title: "LinkedIn Strategy",
      href: "/linkedin",
      icon: <Linkedin className="h-5 w-5" />,
      requiresProfile: true,
    },
    {
      title: "Medium Content",
      href: "/medium",
      icon: <MessageSquare className="h-5 w-5" />,
      requiresProfile: true,
    },
    {
      title: "WordPress",
      href: "/wordpress",
      icon: <MessageSquare className="h-5 w-5" />,
      requiresProfile: true,
    },
    {
      title: "Growth Analytics",
      href: "/analytics",
      icon: <TrendingUp className="h-5 w-5" />,
      requiresProfile: true,
    },
    {
      title: "Manage Profiles",
      href: "/profiles",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  // Check if we're on a marketing page
  const isMarketingPage = ["/home", "/features", "/about", "/pricing", "/support", "/affiliate", "/register", "/login", "/forgot-password"].includes(location.pathname);

  const marketingNavItems: NavItem[] = [
    {
      title: "Home",
      href: "/home",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Features",
      href: "/features",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Pricing",
      href: "/pricing",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Affiliate",
      href: "/affiliate",
      icon: <Percent className="h-5 w-5" />,
    },
    {
      title: "About",
      href: "/about",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Support",
      href: "/support",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  // Filter nav items based on whether a profile exists if needed
  const filteredNavItems = isMarketingPage 
    ? marketingNavItems 
    : navItems.filter(item => !item.requiresProfile || hasProfiles);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full justify-between items-center">
          <Link to={isMarketingPage ? "/home" : "/dashboard"} className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange bg-clip-text text-transparent">
              BrandWise
            </span>
          </Link>

          {isMobile ? (
            <>
              <div className="flex items-center gap-2">
                {!isMarketingPage && <ProfileSwitcher />}
                {isMarketingPage && (
                  <Link to="/register">
                    <Button size="sm" variant="outline" className="mr-2">
                      <UserPlus className="h-4 w-4 mr-1" /> Register
                    </Button>
                  </Link>
                )}
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
                    {filteredNavItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium hover:bg-accent",
                          !hasProfiles && item.requiresProfile && "opacity-50 pointer-events-none"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon}
                        {item.title}
                        {!hasProfiles && item.requiresProfile && " (Create profile first)"}
                      </Link>
                    ))}
                    {isMarketingPage && (
                      <>
                        <div className="h-px my-2 bg-border" />
                        <Link
                          to="/login"
                          className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium hover:bg-accent"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <nav className="hidden md:flex items-center gap-1">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/10 transition-colors",
                      location.pathname === item.href ? "bg-accent/20 text-accent-foreground" : "text-muted-foreground",
                      !hasProfiles && item.requiresProfile && "opacity-50 pointer-events-none"
                    )}
                    title={!hasProfiles && item.requiresProfile ? "Create a profile first" : ""}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
              {isMarketingPage ? (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>
                      <UserPlus className="h-4 w-4 mr-1" /> Register
                    </Button>
                  </Link>
                </div>
              ) : (
                <ProfileSwitcher />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
