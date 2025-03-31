
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile, Profile } from "@/contexts/ProfileContext";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  Share2, 
  Video, 
  AtSign, 
  Slack,
  Mail,
  BarChart4,
  Calendar,
  MessageSquare,
  ArrowRight,
  RefreshCw
} from "lucide-react";

// Define all available integrations
const AVAILABLE_INTEGRATIONS = [
  { 
    id: "facebook",
    name: "Facebook", 
    icon: <Facebook className="h-6 w-6 text-blue-600" />, 
    description: "Connect your Facebook pages and groups", 
    category: "social" 
  },
  { 
    id: "instagram",
    name: "Instagram", 
    icon: <Instagram className="h-6 w-6 text-pink-600" />, 
    description: "Schedule and publish Instagram posts", 
    category: "social" 
  },
  { 
    id: "linkedin",
    name: "LinkedIn", 
    icon: <Linkedin className="h-6 w-6 text-blue-800" />, 
    description: "Publish professional content", 
    category: "social" 
  },
  { 
    id: "twitter",
    name: "Twitter", 
    icon: <Twitter className="h-6 w-6 text-blue-400" />, 
    description: "Schedule tweets and analyze metrics", 
    category: "social" 
  },
  { 
    id: "youtube",
    name: "YouTube", 
    icon: <Youtube className="h-6 w-6 text-red-600" />, 
    description: "Manage your YouTube channel", 
    category: "social" 
  },
  { 
    id: "pinterest",
    name: "Pinterest", 
    icon: <Share2 className="h-6 w-6 text-red-700" />, 
    description: "Create and schedule pins", 
    category: "social" 
  },
  { 
    id: "tiktok",
    name: "TikTok", 
    icon: <Video className="h-6 w-6 text-black dark:text-white" />, 
    description: "Plan your TikTok content strategy", 
    category: "social" 
  },
  { 
    id: "mailchimp",
    name: "Mailchimp", 
    icon: <AtSign className="h-6 w-6 text-yellow-500" />, 
    description: "Sync your email campaigns", 
    category: "email" 
  },
  { 
    id: "wordpress",
    name: "WordPress", 
    icon: <MessageSquare className="h-6 w-6 text-blue-500" />, 
    description: "Manage your WordPress blog", 
    category: "cms" 
  },
  { 
    id: "medium",
    name: "Medium", 
    icon: <MessageSquare className="h-6 w-6 text-gray-700 dark:text-gray-300" />, 
    description: "Publish articles on Medium", 
    category: "cms" 
  }
];

const PREDEFINED_TAGS = [
  { label: "Business", bgColor: "bg-blue-500/10", textColor: "text-blue-500" },
  { label: "Marketing", bgColor: "bg-green-500/10", textColor: "text-green-500" },
  { label: "Design", bgColor: "bg-purple-500/10", textColor: "text-purple-500" },
  { label: "Tech", bgColor: "bg-yellow-500/10", textColor: "text-yellow-600" },
  { label: "Education", bgColor: "bg-orange-500/10", textColor: "text-orange-500" },
  { label: "Food", bgColor: "bg-red-500/10", textColor: "text-red-500" },
  { label: "Travel", bgColor: "bg-indigo-500/10", textColor: "text-indigo-500" },
  { label: "Health", bgColor: "bg-pink-500/10", textColor: "text-pink-500" },
  { label: "Finance", bgColor: "bg-cyan-500/10", textColor: "text-cyan-500" },
  { label: "Photography", bgColor: "bg-emerald-500/10", textColor: "text-emerald-500" },
];

const NewProfilePage = () => {
  const navigate = useNavigate();
  const { addProfile } = useProfile();
  const [currentStep, setCurrentStep] = useState<"profile" | "integrations" | "review">("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    role: "",
    description: "",
    selectedTags: [] as string[]
  });
  
  // Integration state
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tag: string) => {
    setProfileForm(prev => {
      if (prev.selectedTags.includes(tag)) {
        return { ...prev, selectedTags: prev.selectedTags.filter(t => t !== tag) };
      } else {
        return { ...prev, selectedTags: [...prev.selectedTags, tag] };
      }
    });
  };

  const toggleIntegration = (integrationId: string) => {
    setSelectedIntegrations(prev => {
      if (prev.includes(integrationId)) {
        return prev.filter(id => id !== integrationId);
      } else {
        return [...prev, integrationId];
      }
    });
  };

  const nextStep = () => {
    if (currentStep === "profile") {
      if (!profileForm.name || !profileForm.role) {
        toast.error("Please fill in the required fields");
        return;
      }
      setCurrentStep("integrations");
    } else if (currentStep === "integrations") {
      setCurrentStep("review");
    }
  };

  const prevStep = () => {
    if (currentStep === "integrations") {
      setCurrentStep("profile");
    } else if (currentStep === "review") {
      setCurrentStep("integrations");
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    try {
      // Generate initials for the fallback
      const nameParts = profileForm.name.split(" ");
      const fallback = nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` 
        : profileForm.name.substring(0, 2);
      
      // Create the new profile object
      const newProfile: Profile = {
        id: `profile-${Date.now()}`,
        name: profileForm.name,
        role: profileForm.role,
        description: profileForm.description,
        avatar: `https://placehold.co/200x200/${Math.floor(Math.random()*16777215).toString(16)}/${Math.floor(Math.random()*16777215).toString(16)}?text=${fallback}`,
        fallback: fallback,
        tags: profileForm.selectedTags.map(tag => {
          const foundTag = PREDEFINED_TAGS.find(t => t.label === tag);
          return foundTag || { label: tag, bgColor: "bg-muted", textColor: "text-foreground" };
        }),
        integrations: selectedIntegrations
      };
      
      addProfile(newProfile);
      navigate("/dashboard");
    } catch (error) {
      toast.error("An error occurred while creating the profile");
      console.error("Profile creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render different steps based on currentStep
  const renderStepContent = () => {
    switch(currentStep) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">Profile Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                name="name"
                placeholder="e.g., John Smith or Marketing Agency" 
                value={profileForm.name}
                onChange={handleProfileChange}
                className="text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-base font-medium">Role or Title <span className="text-red-500">*</span></Label>
              <Input 
                id="role" 
                name="role"
                placeholder="e.g., Digital Marketing Specialist" 
                value={profileForm.role}
                onChange={handleProfileChange}
                className="text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">Profile Description</Label>
              <Textarea 
                id="description" 
                name="description"
                placeholder="Describe the purpose and goals of this profile" 
                value={profileForm.description}
                onChange={handleProfileChange}
                className="text-base h-32"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-base font-medium">Tags</Label>
              <p className="text-sm text-muted-foreground">Select tags that describe this profile</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {PREDEFINED_TAGS.map((tag) => (
                  <Badge 
                    key={tag.label}
                    variant={profileForm.selectedTags.includes(tag.label) ? "default" : "outline"}
                    className={`cursor-pointer ${profileForm.selectedTags.includes(tag.label) ? tag.bgColor : ""} ${profileForm.selectedTags.includes(tag.label) ? tag.textColor : ""}`}
                    onClick={() => toggleTag(tag.label)}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "integrations":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Select Integrations</h3>
              <p className="text-sm text-muted-foreground">Choose the platforms you want to connect to this profile</p>
            </div>
            
            <Tabs defaultValue="social">
              <TabsList className="mb-4">
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="email">Email & CMS</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              
              <TabsContent value="social" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AVAILABLE_INTEGRATIONS
                  .filter(integration => integration.category === "social")
                  .map(integration => (
                    <Card key={integration.id} className={`cursor-pointer transition-colors ${selectedIntegrations.includes(integration.id) ? 'border-primary' : 'hover:border-primary/50'}`} onClick={() => toggleIntegration(integration.id)}>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div>{integration.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                        <Switch checked={selectedIntegrations.includes(integration.id)} onCheckedChange={() => toggleIntegration(integration.id)} />
                      </CardContent>
                    </Card>
                  ))
                }
              </TabsContent>
              
              <TabsContent value="email" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AVAILABLE_INTEGRATIONS
                  .filter(integration => ["email", "cms"].includes(integration.category))
                  .map(integration => (
                    <Card key={integration.id} className={`cursor-pointer transition-colors ${selectedIntegrations.includes(integration.id) ? 'border-primary' : 'hover:border-primary/50'}`} onClick={() => toggleIntegration(integration.id)}>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div>{integration.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                        <Switch checked={selectedIntegrations.includes(integration.id)} onCheckedChange={() => toggleIntegration(integration.id)} />
                      </CardContent>
                    </Card>
                  ))
                }
              </TabsContent>
              
              <TabsContent value="other" className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Visit the Integrations page to discover more connection options for your profile.</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate('/integrations')}>
                    Explore All Integrations
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
        
      case "review":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Review Your New Profile</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>{profileForm.name}</CardTitle>
                <CardDescription>{profileForm.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileForm.description && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Description:</h4>
                    <p>{profileForm.description}</p>
                  </div>
                )}
                
                {profileForm.selectedTags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {profileForm.selectedTags.map(tag => {
                        const tagConfig = PREDEFINED_TAGS.find(t => t.label === tag);
                        return (
                          <Badge 
                            key={tag} 
                            className={`${tagConfig?.bgColor || 'bg-muted'} ${tagConfig?.textColor || 'text-foreground'}`}
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {selectedIntegrations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Connected Integrations:</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedIntegrations.map(id => {
                        const integration = AVAILABLE_INTEGRATIONS.find(i => i.id === id);
                        return integration ? (
                          <div key={id} className="flex items-center gap-1">
                            {integration.icon}
                            <span className="text-sm">{integration.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Profile</h1>
          <p className="text-muted-foreground mt-2">Set up a new profile and connect your platforms</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex items-center gap-2 ${currentStep === "profile" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "profile" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</div>
              <span>Profile Details</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className={`flex items-center gap-2 ${currentStep === "integrations" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "integrations" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>2</div>
              <span>Integrations</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className={`flex items-center gap-2 ${currentStep === "review" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "review" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>3</div>
              <span>Review</span>
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
          <CardFooter className="px-6 py-4 border-t flex justify-between">
            {currentStep !== "profile" && (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {currentStep === "profile" && (
              <div></div>
            )}
            
            {currentStep !== "review" ? (
              <Button onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default NewProfilePage;
