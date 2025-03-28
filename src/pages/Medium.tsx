
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MessageSquare, Users, TrendingUp, Bookmark, Clock, ArrowUpRight, BookOpen } from "lucide-react";
import StatCard from "@/components/StatCard";

const performanceData = [
  { month: "Jan", views: 3200, reads: 1850, followers: 980 },
  { month: "Feb", views: 3800, reads: 2200, followers: 1020 },
  { month: "Mar", views: 4200, reads: 2500, followers: 1080 },
  { month: "Apr", views: 4500, reads: 2650, followers: 1150 },
  { month: "May", views: 4800, reads: 2750, followers: 1220 },
  { month: "Jun", views: 5200, reads: 2950, followers: 1249 },
];

const topArticles = [
  {
    id: 1,
    title: "10 UX Research Methods Every Product Designer Should Master",
    date: "Jun 15, 2023",
    stats: {
      views: 1850,
      reads: 1200,
      claps: 380,
      responses: 28
    }
  },
  {
    id: 2,
    title: "Building a Design System from Scratch: A Practical Guide",
    date: "May 22, 2023",
    stats: {
      views: 1620,
      reads: 980,
      claps: 310,
      responses: 22
    }
  },
  {
    id: 3,
    title: "The Product Designer's Guide to Working with Engineers",
    date: "Apr 10, 2023",
    stats: {
      views: 1400,
      reads: 850,
      claps: 280,
      responses: 18
    }
  }
];

const topicsPerformance = [
  { name: "UX Research", articles: 5, claps: 1250, views: 8500 },
  { name: "Design Systems", articles: 4, claps: 980, views: 7200 },
  { name: "Product Strategy", articles: 3, claps: 820, views: 6400 },
  { name: "Design Leadership", articles: 2, claps: 650, views: 4800 },
  { name: "Design Process", articles: 3, claps: 720, views: 5300 },
];

const Medium = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-heading">Medium Content</h1>
              <p className="text-muted-foreground">
                Track and optimize your Medium articles and audience
              </p>
            </div>
            <Button className="bg-[#00AB6C] hover:bg-[#00AB6C]/90">
              <MessageSquare className="mr-1 h-4 w-4" /> Post to Medium
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Medium Followers" 
              value="1,249" 
              change={{ value: "8%", positive: true }}
              icon={MessageSquare}
              className="bg-gradient-to-br from-card to-[#00AB6C]/5"
            />
            <StatCard 
              title="Total Views" 
              value="5,200" 
              change={{ value: "12%", positive: true }}
              icon={Users}
              className="bg-gradient-to-br from-card to-[#00AB6C]/5"
            />
            <StatCard 
              title="Read Ratio" 
              value="58%" 
              change={{ value: "3%", positive: true }}
              icon={TrendingUp}
              className="bg-gradient-to-br from-card to-[#00AB6C]/5"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Medium views, reads, and follower growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="views">
                  <TabsList className="mb-4">
                    <TabsTrigger value="views">Views</TabsTrigger>
                    <TabsTrigger value="reads">Reads</TabsTrigger>
                    <TabsTrigger value="followers">Followers</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="views" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
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
                        <Line type="monotone" name="Views" dataKey="views" stroke="#00AB6C" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="reads" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
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
                        <Line type="monotone" name="Reads" dataKey="reads" stroke="#F4A261" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="followers" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
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
                        <Line type="monotone" name="Followers" dataKey="followers" stroke="#2A9D8F" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Topic Performance</CardTitle>
                <CardDescription>
                  Engagement by content topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={topicsPerformance}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" scale="band" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="claps" name="Claps" fill="#00AB6C" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Top Performing Articles</CardTitle>
              <CardDescription>
                Your most successful Medium content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {topArticles.map((article) => (
                  <Card key={article.id} className="border bg-card">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="bg-[#00AB6C]/10 text-[#00AB6C]">
                            <MessageSquare className="mr-1 h-3 w-3" /> Medium
                          </Badge>
                          <span className="text-xs text-muted-foreground">{article.date}</span>
                        </div>
                        
                        <h3 className="font-medium text-sm">{article.title}</h3>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {article.stats.views.toLocaleString()} views
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {article.stats.reads.toLocaleString()} reads
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {article.stats.claps.toLocaleString()} claps
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {article.stats.responses} responses
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Publication Strategy</CardTitle>
                <CardDescription>
                  Key areas to focus on for Medium growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-[#00AB6C]/10">
                      <Clock className="h-4 w-4 text-[#00AB6C]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Consistency Strategy</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Publish 2-3 in-depth articles per month to maintain audience growth
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-brand-teal/10">
                      <BookOpen className="h-4 w-4 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Content Strategy</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Focus on UX Research and Design Systems topics for optimal engagement
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-brand-orange/10">
                      <Users className="h-4 w-4 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Audience Strategy</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Engage with responses and follow relevant accounts to boost visibility
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-purple-100">
                      <ArrowUpRight className="h-4 w-4 text-purple-800" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Growth Strategy</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Submit articles to popular publications to reach wider audiences
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>
                  Upcoming and scheduled Medium articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-green-500 pl-4 py-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">The ROI of Design Systems: A Business Case</h3>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Ready</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Scheduled: July 5, 2023
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-amber-500 pl-4 py-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">User Research Methods That Drive Innovation</h3>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">In Progress</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: July 18, 2023
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-blue-500 pl-4 py-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">Design Leadership: Building High-Performing Teams</h3>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Planned</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: August 2, 2023
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-blue-500 pl-4 py-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">Product Design Portfolio: Standing Out in 2023</h3>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Planned</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: August 15, 2023
                    </p>
                  </div>
                </div>
                
                <Button variant="link" className="text-[#00AB6C] mt-4 p-0 h-auto">
                  View complete content calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Medium;
