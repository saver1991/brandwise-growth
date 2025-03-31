
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  ChevronDown, 
  LogOut, 
  Settings, 
  CreditCard, 
  Lock, 
  User,
  UserPlus,
  Users,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfileSwitcher = () => {
  const { currentProfile, setCurrentProfile, availableProfiles, deleteProfile } = useProfile();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);

  const handleSignOut = () => {
    // In a real app, you would clear auth tokens, cookies, etc.
    navigate("/login");
  };
  
  const openDeleteDialog = (profileId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent dropdown item click
    setProfileToDelete(profileId);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteProfile = () => {
    if (profileToDelete) {
      deleteProfile(profileToDelete);
      setDeleteDialogOpen(false);
      setProfileToDelete(null);
    }
  };

  return (
    <>
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
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{currentProfile.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                example@brandwise.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableProfiles.map((profile) => (
            <DropdownMenuItem
              key={profile.id}
              className="cursor-pointer py-2"
            >
              <div 
                className="flex items-center gap-2 flex-1"
                onClick={() => setCurrentProfile(profile)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{profile.fallback}</AvatarFallback>
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{profile.name}</span>
                  <span className="text-xs text-muted-foreground">{profile.role}</span>
                </div>
              </div>
              {profile.id !== currentProfile.id && availableProfiles.length > 1 && (
                <button 
                  className="p-1 rounded-full hover:bg-red-100 text-muted-foreground hover:text-red-500 ml-2"
                  onClick={(e) => openDeleteDialog(profile.id, e)}
                  title="Delete profile"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profiles/new')}>
            <div className="flex items-center gap-2 text-primary">
              <UserPlus className="h-4 w-4" />
              <span>Create New Profile</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profiles')}>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Manage All Profiles</span>
            </div>
          </DropdownMenuItem>
          
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this profile? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProfile} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileSwitcher;
