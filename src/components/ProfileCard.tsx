import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile, useProfile } from "@/contexts/ProfileContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Share2, Video, MessageSquare, Globe, Pencil, Trash2 } from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
  isActive: boolean;
  onSelect: () => void;
}

const INTEGRATION_ICONS: Record<string, JSX.Element> = {
  facebook: <Facebook className="h-4 w-4 text-blue-600" />,
  instagram: <Instagram className="h-4 w-4 text-pink-600" />,
  linkedin: <Linkedin className="h-4 w-4 text-blue-800" />,
  twitter: <Twitter className="h-4 w-4 text-blue-400" />,
  youtube: <Youtube className="h-4 w-4 text-red-600" />,
  pinterest: <Share2 className="h-4 w-4 text-red-700" />,
  tiktok: <Video className="h-4 w-4 text-black dark:text-white" />,
  medium: <MessageSquare className="h-4 w-4 text-gray-700 dark:text-gray-300" />,
  wordpress: <Globe className="h-4 w-4 text-blue-500" />,
};

const ProfileCard = ({ profile, isActive, onSelect }: ProfileCardProps) => {
  const navigate = useNavigate();
  const { deleteProfile } = useProfile();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleDeleteProfile = () => {
    deleteProfile(profile.id);
    setDeleteDialogOpen(false);
  };
  
  return (
    <>
      <Card className={`transition-all ${isActive ? 'border-primary shadow-md' : 'hover:border-primary/50'}`}>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarFallback>{profile.fallback}</AvatarFallback>
              <AvatarImage src={profile.avatar} alt={profile.name} />
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.role}</p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.tags.slice(0, 3).map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    className={`${tag.bgColor} ${tag.textColor}`} 
                    variant="outline"
                  >
                    {tag.label}
                  </Badge>
                ))}
                {profile.tags.length > 3 && (
                  <Badge variant="outline" className="bg-muted/50">
                    +{profile.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {profile.description && (
            <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{profile.description}</p>
          )}
          
          {profile.integrations && profile.integrations.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Connected Platforms:</p>
              <div className="flex flex-wrap gap-2">
                {profile.integrations.map(integration => 
                  INTEGRATION_ICONS[integration] ? (
                    <div key={integration} className="rounded-full bg-muted/50 p-1">
                      {INTEGRATION_ICONS[integration]}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex gap-2">
            {isActive ? (
              <Button variant="outline" onClick={() => navigate('/integrations')}>
                Manage Integrations
              </Button>
            ) : (
              <Button variant="outline" onClick={onSelect}>
                Switch to this Profile
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/profiles/edit/${profile.id}`)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            {!isActive && (
              <Button 
                variant="ghost" 
                onClick={() => setDeleteDialogOpen(true)}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{profile.name}</span>? This action cannot be undone.
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

export default ProfileCard;
