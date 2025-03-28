
import { useProfile } from "@/contexts/ProfileContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const ProfileSwitcher = () => {
  const { currentProfile, setCurrentProfile, availableProfiles } = useProfile();

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileSwitcher;
