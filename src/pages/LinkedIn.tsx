
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Linkedin, TrendingUp, Users, MessageSquare, Award, Calendar } from "lucide-react";

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

const LinkedInPage = () => {
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
            <Button className="bg-[#0077B5] hover:bg-[#0077B5]/90">
              <Linkedin className="mr-1 h-4 w-4" /> Post to LinkedIn
            </Button>
          </div>
          
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

export default LinkedInPage;
