
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboarding: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("welcome");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      
      switch (currentStep) {
        case "welcome":
          setCurrentStep("profile");
          break;
        case "profile":
          setCurrentStep("preferences");
          break;
        case "preferences":
          setCurrentStep("connections");
          break;
        case "connections":
          // Onboarding complete
          toast.success("Onboarding completed successfully!", {
            description: "You're all set to start using BrandWise"
          });
          navigate("/dashboard");
          break;
        default:
          break;
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navigation />
      
      <div className="flex-1 container max-w-5xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to BrandWise</h1>
          <p className="text-muted-foreground">Let's set up your account in just a few steps</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-2xl mb-8">
            {["welcome", "profile", "preferences", "connections"].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === step 
                        ? "bg-primary text-primary-foreground"
                        : ["welcome", "profile", "preferences", "connections"].indexOf(currentStep) > 
                          ["welcome", "profile", "preferences", "connections"].indexOf(step)
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {["welcome", "profile", "preferences", "connections"].indexOf(currentStep) > 
                      ["welcome", "profile", "preferences", "connections"].indexOf(step) ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-1">
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                </div>
                {index < 3 && (
                  <div 
                    className={`w-full h-1 max-w-[60px] ${
                      ["welcome", "profile", "preferences", "connections"].indexOf(currentStep) > 
                      ["welcome", "profile", "preferences", "connections"].indexOf(step)
                        ? "bg-green-500"
                        : "bg-muted"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <Tabs value={currentStep} className="space-y-8">
          <TabsContent value="welcome" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to BrandWise!</CardTitle>
                <CardDescription>
                  Thanks for joining us! Let's get your account set up so you can start using all the features.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Here's what you can do with BrandWise:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Manage and publish content across multiple platforms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Track engagement and performance analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Generate content ideas with AI assistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Plan your content calendar efficiently</span>
                    </li>
                  </ul>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleContinue} disabled={loading}>
                    {loading ? "Loading..." : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>
                  Tell us more about yourself and your brand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="displayName">Display Name</label>
                      <Input id="displayName" defaultValue={user?.user_metadata?.full_name || ""} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="jobTitle">Job Title</label>
                      <Input id="jobTitle" placeholder="Content Creator" />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium" htmlFor="bio">Bio</label>
                      <Textarea id="bio" placeholder="Tell us about yourself or your brand..." />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="industry">Industry</label>
                      <Input id="industry" placeholder="Technology, Marketing, etc." />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="website">Website</label>
                      <Input id="website" placeholder="https://yourwebsite.com" />
                    </div>
                  </div>
                </form>
                
                <div className="pt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep("welcome")}>
                    Back
                  </Button>
                  <Button onClick={handleContinue} disabled={loading}>
                    {loading ? "Saving..." : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
                <CardDescription>
                  Customize your content preferences to get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Content Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Marketing", "Social Media", "Technology", "Business", "Design", 
                        "SEO", "Content Creation", "Analytics"].map(topic => (
                        <Button key={topic} variant="outline" className="rounded-full">
                          {topic}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Content Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Blog Posts", "Images", "Videos", "Infographics", "Podcasts", 
                        "Short-form", "Long-form"].map(type => (
                        <Button key={type} variant="outline" className="rounded-full">
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Content Goals</h3>
                    <Textarea 
                      placeholder="What are you trying to achieve with your content? (e.g., brand awareness, lead generation, etc.)" 
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep("profile")}>
                      Back
                    </Button>
                    <Button onClick={handleContinue} disabled={loading}>
                      {loading ? "Saving..." : "Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="connections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Platforms</CardTitle>
                <CardDescription>
                  Connect your social media and content platforms to start managing them in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "WordPress", icon: "W", connected: false },
                      { name: "LinkedIn", icon: "In", connected: false },
                      { name: "Medium", icon: "M", connected: false },
                      { name: "Twitter", icon: "T", connected: false },
                    ].map(platform => (
                      <div key={platform.name} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                            {platform.icon}
                          </div>
                          <span>{platform.name}</span>
                        </div>
                        <Button variant={platform.connected ? "outline" : "default"}>
                          {platform.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md">
                    <p className="text-sm">
                      You can always connect more platforms later from your account settings.
                    </p>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep("preferences")}>
                      Back
                    </Button>
                    <Button onClick={handleContinue} disabled={loading}>
                      {loading ? "Finishing..." : "Complete Setup"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Onboarding;
