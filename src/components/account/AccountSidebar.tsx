
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { User, Lock, CreditCard, Settings } from "lucide-react";

interface AccountSidebarProps {
  activeItem: "profile" | "security" | "billing" | "settings";
}

const AccountSidebar = ({ activeItem }: AccountSidebarProps) => {
  const menuItems = [
    {
      name: "Profile",
      href: "/account/profile",
      icon: <User className="h-5 w-5" />,
      id: "profile" as const,
    },
    {
      name: "Security",
      href: "/account/security",
      icon: <Lock className="h-5 w-5" />,
      id: "security" as const,
    },
    {
      name: "Billing",
      href: "/account/billing",
      icon: <CreditCard className="h-5 w-5" />,
      id: "billing" as const,
    },
    {
      name: "Settings",
      href: "/account/settings",
      icon: <Settings className="h-5 w-5" />,
      id: "settings" as const,
    },
  ];

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
            activeItem === item.id
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
          )}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default AccountSidebar;
