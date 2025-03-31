import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Linkedin, TrendingUp, Users, MessageSquare, Award, Calendar, Link2, ExternalLink } from "lucide-react";
import { linkedinService } from "@/services/linkedinService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const performanceData = [
  { date: "Jun 1", followers: 2450, engagement: 3.2, posts: 2 },
  { date: "Jun 8", followers: 2520, engagement: 3.5, posts: 1 },
  { date: "Jun 15", followers: 2580, engagement: 4.1, posts: 3 },
  { date: "Jun 22", followers: 2650, engagement: 3.8, posts: 2 },
  { date: "Jun 29", followers: 2720, engagement: 4.5, posts: 2 },
  { date: "Jul 6", followers: 2845, engagement: 4.8, posts: 3 },
];

const topPerformingPosts = [
  {
    id: 1,
    title: "The Future of Design Systems in Product Development",
    date: "Jul 2, 2023",
    views: 2850,
    likes: 189,
    comments: 42,
    shares: 28,
  },
  {
    id: 2,
    title: "UX Research Methods That Drive Product Innovation",
    date: "Jun 18, 2023",
    views: 2240,
    likes: 152,
    comments: 31,
    shares: 19,
  },
  {
    id: 3,
    title: "Building Cross-Functional Product Teams: A Designer's Perspective",
    date: "Jun 5, 2023",
    views: 1980,
    likes: 124,
    comments: 28,
    shares: 15,
  },
];

const LinkedIn = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>("");
  
  useEffect(() => {
    const checkLinkedInConnection = async () => {
      try {
        setIsLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUserId(user.id);
          
          const connected = await linkedinService.isConnected(user.id);
          setIsConnected(connected);
          
          if (connected) {
            const tokens = await linkedinService.getTokens(user.id);
            
            if (tokens) {
              const profile = await linkedinService.getProfile(tokens.access_token);
              
              if (profile) {
                setProfileName(`${profile.localizedFirstName} ${profile.localizedLastName}`);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error checking LinkedIn connection:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLinkedInConnection();
  }, []);
  
  const handleConnect = async () => {
    try {
      setIsLoading(true);
      console.log("Starting LinkedIn connection process");
      
      const authUrl = await linkedinService.getAuthUrl();
      
      console.log("LinkedIn Auth URL:", authUrl ? `Generated (${authUrl.length} chars)` : "Failed to generate URL");
      
      if (!authUrl) {
        toast.error("Failed to initialize LinkedIn authorization. Please try again later.");
        setIsLoading(false);
        return;
      }
      
      console.log("Full LinkedIn Auth URL:", authUrl);
      
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error starting LinkedIn connection:", error);
      toast.error("Failed to connect to LinkedIn: " + error.message);
      setIsLoading(false);
    }
  };
  
  const handleDisconnect = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      const disconnected = await linkedinService.disconnect(userId);
      
      if (disconnected) {
        setIsConnected(false);
        setProfileName("");
      }
    } catch (error) {
      console.error("Error disconnecting LinkedIn:", error);
      toast.error("Failed to disconnect LinkedIn account");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePostToLinkedIn = async () => {
    if (!userId) return;
    
    try {
      const tokens = await linkedinService.getTokens(userId);
      
      if (!tokens) {
        toast.error("LinkedIn connection not found");
        return;
      }
      
      const success = await linkedinService.sharePost(
        tokens.access_token,
        "your-linkedin-id",
        "Excited to share insights on design systems and product development! Check out my latest thoughts on this evolving field. #DesignSystems #ProductDevelopment #UX",
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80"
      );
      
      if (success) {
        toast.success("Post shared to LinkedIn successfully!");
      }
    } catch (error) {
      console.error("Error posting to LinkedIn:", error);
      toast.error("Failed to share post to LinkedIn");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-heading">LinkedIn Strategy</h1>
              <p className="text-muted-foreground">
                Optimize your LinkedIn presence and engagement
              </p>
            </div>
            
            {isConnected ? (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleDisconnect}
                  disabled={isLoading}
                >
                  <Link2 className="mr-1 h-4 w-4" /> Disconnect
                </Button>
                <Button 
                  className="bg-[#0077B5] hover:bg-[#0077B5]/90"
                  onClick={handlePostToLinkedIn}
                  disabled={isLoading}
                >
                  <Linkedin className="mr-1 h-4 w-4" /> Post to LinkedIn
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-[#0077B5] hover:bg-[#0077B5]/90"
                onClick={handleConnect}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    <Linkedin className="mr-1 h-4 w-4" /> Connect LinkedIn
                  </>
                )}
              </Button>
            )}
          </div>
          
          {isConnected && profileName && (
            <Alert className="bg-[#0077B5]/10 border-[#0077B5]/20">
              <div className="flex items-center">
                <Linkedin className="h-5 w-5 text-[#0077B5] mr-2" />
                <AlertDescription>
                  Connected as <strong>{profileName}</strong>
                </AlertDescription>
              </div>
            </Alert>
          )}
          
          {!isConnected && !isLoading && (
            <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30">
              <div className="flex items-center">
                <ExternalLink className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                <AlertDescription>
                  Connect your LinkedIn account to enable direct posting and analytics tracking
                </AlertDescription>
              </div>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-card to-[#0077B5]/5 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <div className="text-2xl font-bold">2,845</div>
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    +125 this month
                  </Badge>
                </div>
                <Progress value={70} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  70% to monthly goal (3,000)
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-[#0077B5]/5 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <div className="text-2xl font-bold">4.8%</div>
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    +0.6% this month
                  </Badge>
                </div>
                <Progress value={96} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  96% to monthly goal (5%)
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-[#0077B5]/5 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Posts This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <div className="text-2xl font-bold">8</div>
                  <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                    67% of goal
                  </Badge>
                </div>
                <Progress value={67} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  67% to monthly goal (12)
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Track followers, engagement, and posting frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="followers">
                  <TabsList className="mb-4">
                    <TabsTrigger value="followers">Followers</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="followers" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Legend />
                        <Line type="monotone" name="Followers" dataKey="followers" stroke="#0077B5" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="engagement" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Legend />
                        <Line type="monotone" name="Engagement %" dataKey="engagement" stroke="#F4A261" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="posts" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Legend />
                        <Line type="monotone" name="Posts" dataKey="posts" stroke="#2A9D8F" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Growth Strategy</CardTitle>
                <CardDescription>
                  Key areas to focus on this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-[#0077B5]/10">
                      <Users className="h-4 w-4 text-[#0077B5]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Connection Strategy</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Connect with 20 design leaders and product strategists each week
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-brand-teal/10">
                      <MessageSquare className="h-4 w-4 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Content Strategy</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Focus on case studies and thought leadership content to boost engagement
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-brand-orange/10">
                      <Award className="h-4 w-4 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Visibility Strategy</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Comment on posts from industry leaders to increase profile visibility
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-purple-100">
                      <Calendar className="h-4 w-4 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Consistency Strategy</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Maintain 3 posts per week to optimize algorithm visibility
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="col-span-full card-hover">
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>
                Your most successful LinkedIn content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {topPerformingPosts.map((post) => (
                  <Card key={post.id} className="border bg-card">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="bg-[#0077B5]/10 text-[#0077B5]">
                            <Linkedin className="mr-1 h-3 w-3" /> LinkedIn
                          </Badge>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        
                        <h3 className="font-medium text-sm">{post.title}</h3>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Views</span>
                            <span className="font-medium">{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Likes</span>
                            <span className="font-medium">{post.likes}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Comments</span>
                            <span className="font-medium">{post.comments}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Shares</span>
                            <span className="font-medium">{post.shares}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LinkedIn;
