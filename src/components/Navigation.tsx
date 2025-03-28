
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
  X,
  LogOut,
  User,
  Key,
  UserCog
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();

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
      title: "Content Ideas",
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
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                          <UserCog className="h-4 w-4" />
                          Profile Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/credentials" className="flex items-center gap-2 cursor-pointer">
                          <Key className="h-4 w-4" />
                          API Credentials
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <UserCog className="h-4 w-4" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/credentials" className="flex items-center gap-2 cursor-pointer">
                        <Key className="h-4 w-4" />
                        API Credentials
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
