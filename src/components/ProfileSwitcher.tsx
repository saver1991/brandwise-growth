
import { useProfile } from "@/contexts/ProfileContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSwitcher = () => {
  const { currentProfile, setCurrentProfile, availableProfiles } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // In a real app, you would clear auth tokens, cookies, etc.
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-accent/10 transition-colors">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="text-xs">{currentProfile.fallback}</AvatarFallback>
          <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
        </Avatar>
        <span className="text-sm font-medium hidden sm:inline-block">
          {currentProfile.name.split(" ")[0]}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {availableProfiles.map((profile) => (
          <DropdownMenuItem
            key={profile.id}
            className="cursor-pointer"
            onClick={() => setCurrentProfile(profile)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{profile.fallback}</AvatarFallback>
                <AvatarImage src={profile.avatar} alt={profile.name} />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{profile.name}</span>
                <span className="text-xs text-muted-foreground">{profile.role}</span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <div className="flex items-center gap-2 text-red-500">
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileSwitcher;
