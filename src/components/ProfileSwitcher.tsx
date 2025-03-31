
import { useProfile } from "@/contexts/ProfileContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  ChevronDown, 
  LogOut, 
  Settings, 
  CreditCard, 
  Lock, 
  User,
  UserPlus,
  Users,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProfileSwitcher = () => {
  const { currentProfile, setCurrentProfile, availableProfiles, isLoading, hasProfiles } = useProfile();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-accent/10 transition-colors">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="text-xs">
            <Loader2 className="h-4 w-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden sm:inline-block">
          Loading...
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-2 py-1.5 hover:bg-accent/10 transition-colors">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="text-xs">{currentProfile.fallback}</AvatarFallback>
          <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
        </Avatar>
        <span className="text-sm font-medium hidden sm:inline-block">
          {hasProfiles 
            ? currentProfile.name.split(" ")[0] 
            : user?.user_metadata?.full_name?.split(" ")[0] || "Account"}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user_metadata?.full_name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || "example@brandwise.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {hasProfiles ? (
          <>
            {availableProfiles.map((profile) => (
              <DropdownMenuItem
                key={profile.id}
                className="cursor-pointer py-2"
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
          </>
        ) : (
          <DropdownMenuItem className="cursor-pointer py-2 opacity-70">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">No profiles yet</span>
                <span className="text-xs text-muted-foreground">Create your first profile</span>
              </div>
            </div>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profiles/new')}>
          <div className="flex items-center gap-2 text-primary">
            <UserPlus className="h-4 w-4" />
            <span>{hasProfiles ? "Create New Profile" : "Create First Profile"}</span>
          </div>
        </DropdownMenuItem>
        
        {hasProfiles && (
          <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profiles')}>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Manage All Profiles</span>
            </div>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/account/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/account/security")}>
          <Lock className="mr-2 h-4 w-4" />
          <span>Security</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/account/billing")}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/account/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
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
