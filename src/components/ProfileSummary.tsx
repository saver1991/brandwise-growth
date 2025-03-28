
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/contexts/ProfileContext";

const ProfileSummary = () => {
  const { currentProfile } = useProfile();

  return (
    <Card className="bg-gradient-to-br from-card via-card to-accent/10 card-hover">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-accent">
            <AvatarFallback className="text-xl">{currentProfile.fallback}</AvatarFallback>
            <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
          </Avatar>
          
          <div className="space-y-3 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold">{currentProfile.name}</h2>
              <p className="text-muted-foreground">{currentProfile.role}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {currentProfile.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className={`${tag.bgColor} ${tag.textColor}`}>
                  {tag.label}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm max-w-md">
              {currentProfile.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
