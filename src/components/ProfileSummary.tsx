
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfileSummary = () => {
  return (
    <Card className="bg-gradient-to-br from-card via-card to-accent/10 card-hover">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-accent">
            <AvatarFallback className="text-xl">SM</AvatarFallback>
            <AvatarImage src="https://placehold.co/200x200/0F2E3D/FFFFFF?text=SM" alt="Salvatore Mezzatesta" />
          </Avatar>
          
          <div className="space-y-3 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold">Salvatore Mezzatesta</h2>
              <p className="text-muted-foreground">Product Design & Strategy Expert</p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue">
                Product Design
              </Badge>
              <Badge variant="outline" className="bg-brand-teal/10 text-brand-teal">
                Product Strategy
              </Badge>
              <Badge variant="outline" className="bg-brand-orange/10 text-brand-orange">
                UX Leadership
              </Badge>
              <Badge variant="outline" className="bg-muted">
                Thought Leader
              </Badge>
            </div>
            
            <p className="text-sm max-w-md">
              Building a strong personal brand to establish authority in product design and strategy, 
              drive audience growth, and increase industry recognition.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
