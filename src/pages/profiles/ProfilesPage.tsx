
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import AuthHeader from '@/components/AuthHeader';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const ProfilesPage = () => {
  const navigate = useNavigate();
  const { availableProfiles, currentProfile, setCurrentProfile } = useProfile();

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Manage Profiles</h1>
            <p className="text-muted-foreground mt-1">
              Switch between profiles or create new ones to manage different brands or purposes
            </p>
          </div>
          <Button onClick={() => navigate('/profiles/new')} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableProfiles.map(profile => (
            <ProfileCard 
              key={profile.id}
              profile={profile}
              isActive={currentProfile.id === profile.id}
              onSelect={() => setCurrentProfile(profile)}
            />
          ))}

          <div 
            className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-primary transition-colors min-h-[280px]"
            onClick={() => navigate('/profiles/new')}
          >
            <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg">Create New Profile</h3>
            <p className="text-muted-foreground text-center max-w-xs mt-2">
              Add a new profile to manage another brand, project, or client
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilesPage;
