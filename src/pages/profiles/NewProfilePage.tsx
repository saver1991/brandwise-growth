
import React, { useState, useEffect } from "react";
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
  RefreshCw,
  Plus,
  Check,
  Sparkles
} from "lucide-react";
import { aiGenerationService } from "@/services/aiGenerationService";

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

// Base tag suggestions
const BASE_TAG_SUGGESTIONS = [
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

// Additional tags that might be suggested based on user input
const ADDITIONAL_TAGS = [
  { label: "Social Media", bgColor: "bg-blue-500/10", textColor: "text-blue-500" },
  { label: "Content Creation", bgColor: "bg-green-500/10", textColor: "text-green-500" },
  { label: "Startups", bgColor: "bg-purple-500/10", textColor: "text-purple-500" },
  { label: "E-commerce", bgColor: "bg-yellow-500/10", textColor: "text-yellow-600" },
  { label: "Personal Branding", bgColor: "bg-orange-500/10", textColor: "text-orange-500" },
  { label: "Coaching", bgColor: "bg-red-500/10", textColor: "text-red-500" },
  { label: "Consulting", bgColor: "bg-indigo-500/10", textColor: "text-indigo-500" },
  { label: "Sales", bgColor: "bg-pink-500/10", textColor: "text-pink-500" },
  { label: "Analytics", bgColor: "bg-cyan-500/10", textColor: "text-cyan-500" },
  { label: "Blogging", bgColor: "bg-emerald-500/10", textColor: "text-emerald-500" },
  { label: "SaaS", bgColor: "bg-blue-700/10", textColor: "text-blue-700" },
  { label: "Software", bgColor: "bg-green-700/10", textColor: "text-green-700" },
  { label: "Agency", bgColor: "bg-purple-700/10", textColor: "text-purple-700" },
  { label: "Influencer", bgColor: "bg-yellow-700/10", textColor: "text-yellow-700" },
  { label: "Recruitment", bgColor: "bg-orange-700/10", textColor: "text-orange-700" },
  { label: "Healthcare", bgColor: "bg-red-700/10", textColor: "text-red-700" },
  { label: "Media", bgColor: "bg-indigo-700/10", textColor: "text-indigo-700" },
  { label: "Real Estate", bgColor: "bg-pink-700/10", textColor: "text-pink-700" },
  { label: "Entertainment", bgColor: "bg-cyan-700/10", textColor: "text-cyan-700" },
  { label: "Legal", bgColor: "bg-emerald-700/10", textColor: "text-emerald-700" },
];

const NewProfilePage = () => {
  const navigate = useNavigate();
  const { addProfile } = useProfile();
  const [currentStep, setCurrentStep] = useState<"profile" | "integrations" | "review">("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectionStates, setConnectionStates] = useState<Record<string, "idle" | "connecting" | "connected">>({});
  const [customTagInput, setCustomTagInput] = useState("");
  const [isEnhancingDescription, setIsEnhancingDescription] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    role: "",
    description: "",
    selectedTags: [] as string[]
  });
  
  // Integration state
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);

  // Suggested tags state based on profile data
  const [suggestedTags, setSuggestedTags] = useState(BASE_TAG_SUGGESTIONS);

  // Generate tag suggestions based on profile information
  useEffect(() => {
    if (profileForm.name || profileForm.role || profileForm.description) {
      // Simulate AI analyzing the content and suggesting relevant tags
      const combinedText = `${profileForm.name} ${profileForm.role} ${profileForm.description}`.toLowerCase();
      
      // Add base tags first
      const newSuggestions = [...BASE_TAG_SUGGESTIONS];
      
      // Add relevant additional tags based on keywords found in the profile text
      ADDITIONAL_TAGS.forEach(tag => {
        // Only add tags that aren't already in the suggestions
        if (!newSuggestions.some(t => t.label === tag.label)) {
          const shouldAdd = matchTagToContent(tag.label, combinedText);
          if (shouldAdd) {
            newSuggestions.push(tag);
          }
        }
      });
      
      setSuggestedTags(newSuggestions);
    }
  }, [profileForm.name, profileForm.role, profileForm.description]);

  // Simple keyword matching function
  const matchTagToContent = (tagLabel: string, content: string): boolean => {
    const keywords = {
      'Social Media': ['social', 'media', 'content', 'post', 'engagement', 'followers'],
      'Content Creation': ['content', 'create', 'video', 'blog', 'article', 'write', 'creator'],
      'Startups': ['startup', 'founder', 'entrepreneur', 'launch', 'venture'],
      'E-commerce': ['ecommerce', 'shop', 'store', 'product', 'sell', 'retail'],
      'Personal Branding': ['personal', 'brand', 'image', 'presence', 'professional'],
      'Coaching': ['coach', 'mentor', 'guide', 'help', 'improve'],
      'Consulting': ['consult', 'advice', 'expert', 'strategy'],
      'Sales': ['sales', 'sell', 'revenue', 'business development', 'leads'],
      'Analytics': ['analytics', 'data', 'metrics', 'insights', 'performance'],
      'Blogging': ['blog', 'write', 'post', 'article', 'content'],
      'SaaS': ['saas', 'software', 'cloud', 'subscription', 'service'],
      'Software': ['software', 'development', 'code', 'tech', 'application'],
      'Agency': ['agency', 'client', 'service', 'manage', 'campaign'],
      'Influencer': ['influencer', 'followers', 'audience', 'reach', 'impact'],
      'Recruitment': ['recruit', 'hire', 'talent', 'hr', 'human resources'],
      'Healthcare': ['health', 'medical', 'doctor', 'care', 'patient', 'wellness'],
      'Media': ['media', 'press', 'news', 'journalist', 'publication'],
      'Real Estate': ['real estate', 'property', 'home', 'house', 'land', 'agent'],
      'Entertainment': ['entertainment', 'music', 'film', 'movie', 'actor', 'art'],
      'Legal': ['legal', 'law', 'attorney', 'lawyer', 'rights', 'compliance'],
    };
    
    const tagKeywords = keywords[tagLabel as keyof typeof keywords] || [tagLabel.toLowerCase()];
    return tagKeywords.some(keyword => content.includes(keyword.toLowerCase()));
  };

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

  const addCustomTag = () => {
    if (customTagInput && !profileForm.selectedTags.includes(customTagInput)) {
      setProfileForm(prev => ({
        ...prev,
        selectedTags: [...prev.selectedTags, customTagInput]
      }));
      setCustomTagInput("");
    }
  };

  const enhanceProfileDescription = () => {
    if (!profileForm.description) {
      toast.error("Please add a description before enhancing");
      return;
    }
    
    setIsEnhancingDescription(true);
    
    // Simulate AI enhancing the description
    setTimeout(() => {
      // Create a more professional version of the description
      const enhancedDescription = improveDescription(profileForm.description, profileForm.role);
      
      // Update the form with enhanced description
      setProfileForm(prev => ({
        ...prev,
        description: enhancedDescription
      }));
      
      setIsEnhancingDescription(false);
      toast.success("Profile description enhanced!");
    }, 1500);
  };
  
  // Function to improve description with AI
  const improveDescription = (description: string, role: string): string => {
    // This is a simple simulation of AI enhancement
    // In a real implementation, this would call an API like OpenAI
    if (!description) return "";
    
    // Add professional tone and language
    let enhanced = description;
    
    // Add industry-specific terminology based on role
    if (role.toLowerCase().includes("market")) {
      enhanced = `With extensive experience in strategic marketing and brand development, ${enhanced} Specializing in data-driven approaches to maximize ROI and brand visibility.`;
    } else if (role.toLowerCase().includes("tech") || role.toLowerCase().includes("develop")) {
      enhanced = `Leveraging cutting-edge technical expertise and innovative problem-solving abilities, ${enhanced} Committed to building scalable solutions that drive business growth.`;
    } else if (role.toLowerCase().includes("design")) {
      enhanced = `Bringing creative vision and user-centric design thinking to every project, ${enhanced} Focused on delivering engaging experiences that balance aesthetics and functionality.`;
    } else if (role.toLowerCase().includes("sales")) {
      enhanced = `Driving revenue growth through strategic relationship building and consultative sales approaches, ${enhanced} Dedicated to understanding client needs and delivering tailored solutions.`;
    } else {
      enhanced = `As an accomplished ${role}, ${enhanced} Committed to delivering exceptional results and driving continuous improvement.`;
    }
    
    // Make sure it's not too long
    if (enhanced.length > 500) {
      enhanced = enhanced.substring(0, 497) + "...";
    }
    
    return enhanced;
  };

  const connectIntegration = (integrationId: string) => {
    // Set to connecting state
    setConnectionStates(prev => ({
      ...prev,
      [integrationId]: "connecting"
    }));

    // Simulate connection process
    setTimeout(() => {
      // Update to connected state
      setConnectionStates(prev => ({
        ...prev,
        [integrationId]: "connected"
      }));
      
      // Add to selected integrations
      setSelectedIntegrations(prev => {
        if (!prev.includes(integrationId)) {
          toast.success(`Connected to ${AVAILABLE_INTEGRATIONS.find(i => i.id === integrationId)?.name}`);
          return [...prev, integrationId];
        }
        return prev;
      });
    }, 1500); // Simulate a 1.5 second connection time
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
          const foundTag = [...suggestedTags, ...ADDITIONAL_TAGS].find(t => t.label === tag);
          return foundTag || { label: tag, bgColor: "bg-muted", textColor: "text-foreground" };
        }),
        integrations: selectedIntegrations
      };
      
      addProfile(newProfile);
      toast.success("Profile created successfully!");
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
              <div className="relative">
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Describe the purpose and goals of this profile" 
                  value={profileForm.description}
                  onChange={handleProfileChange}
                  className="text-base h-32"
                />
                <Button 
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 gap-1"
                  onClick={enhanceProfileDescription}
                  disabled={isEnhancingDescription || !profileForm.description}
                >
                  {isEnhancingDescription ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isEnhancingDescription ? "Enhancing..." : "Enhance with AI"}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Tags</Label>
                <div className="text-sm text-muted-foreground italic">
                  AI-suggested based on your profile
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestedTags.map((tag) => (
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
              
              <div className="flex items-center gap-2 mt-4">
                <Input 
                  placeholder="Add a custom tag..." 
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomTag();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={addCustomTag}
                  disabled={!customTagInput}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        );
        
      case "integrations":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Connect Your Platforms</h3>
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
                    <Card key={integration.id} className={`transition-colors ${selectedIntegrations.includes(integration.id) ? 'border-primary' : 'hover:border-primary/50'}`}>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div>{integration.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                        {!selectedIntegrations.includes(integration.id) ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => connectIntegration(integration.id)}
                            disabled={connectionStates[integration.id] === "connecting"}
                          >
                            {connectionStates[integration.id] === "connecting" ? (
                              <>
                                <RefreshCw className="mr-1 h-3 w-3 animate-spin" /> 
                                Connecting
                              </>
                            ) : "Connect"}
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="text-green-500 border-green-500">
                            <Check className="mr-1 h-3 w-3" /> Connected
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))
                }
              </TabsContent>
              
              <TabsContent value="email" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AVAILABLE_INTEGRATIONS
                  .filter(integration => ["email", "cms"].includes(integration.category))
                  .map(integration => (
                    <Card key={integration.id} className={`transition-colors ${selectedIntegrations.includes(integration.id) ? 'border-primary' : 'hover:border-primary/50'}`}>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div>{integration.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                        {!selectedIntegrations.includes(integration.id) ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => connectIntegration(integration.id)}
                            disabled={connectionStates[integration.id] === "connecting"}
                          >
                            {connectionStates[integration.id] === "connecting" ? (
                              <>
                                <RefreshCw className="mr-1 h-3 w-3 animate-spin" /> 
                                Connecting
                              </>
                            ) : "Connect"}
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="text-green-500 border-green-500">
                            <Check className="mr-1 h-3 w-3" /> Connected
                          </Button>
                        )}
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
                        const tagConfig = [...suggestedTags, ...ADDITIONAL_TAGS].find(t => t.label === tag);
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
