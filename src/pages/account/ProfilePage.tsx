
import { useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import AccountSidebar from "@/components/account/AccountSidebar";

const ProfilePage = () => {
  const { currentProfile } = useProfile();
  const { toast } = useToast();
  const [name, setName] = useState(currentProfile.name);
  const [email, setEmail] = useState("example@brandwise.com");
  const [description, setDescription] = useState(currentProfile.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to API
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <AccountSidebar activeItem="profile" />
          </div>
          
          <div className="md:w-3/4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account profile information</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-xl">{currentProfile.fallback}</AvatarFallback>
                      <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
                    </Avatar>
                    <div className="flex flex-col gap-2 w-full">
                      <Button type="button" variant="outline" className="w-full sm:w-auto">
                        Change Avatar
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        JPG, GIF or PNG. 1MB max.
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4} 
                      />
                      <p className="text-xs text-muted-foreground">
                        Brief description for your profile.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
