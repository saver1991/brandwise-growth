
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, BarChart2, Download, ArrowUpRight, ArrowDownRight, Users, MessageSquare, Linkedin } from "lucide-react";

const overallGrowth = [
  { month: "Jan", audience: 3200, engagement: 2.8 },
  { month: "Feb", audience: 3500, engagement: 3.1 },
  { month: "Mar", audience: 3800, engagement: 3.4 },
  { month: "Apr", audience: 4100, engagement: 3.8 },
  { month: "May", audience: 4300, engagement: 4.2 },
  { month: "Jun", audience: 4520, engagement: 4.8 },
];

const platformBreakdown = [
  { name: "LinkedIn", value: 2845 },
  { name: "Medium", value: 1249 },
  { name: "Twitter", value: 710 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const contentStats = [
  { type: "Articles", count: 18, growth: "+15%", trend: "up" },
  { type: "Case Studies", count: 7, growth: "+28%", trend: "up" },
  { type: "Guides", count: 5, growth: "+10%", trend: "up" },
  { type: "Analyses", count: 4, growth: "-5%", trend: "down" },
];

const keyInsights = [
  { 
    title: "Content Format Impact",
    description: "Case studies generate 35% more engagement than other content formats",
    trend: "up"
  },
  { 
    title: "Optimal Posting Time",
    description: "Tuesday and Thursday mornings show 22% higher engagement rates",
    trend: "up"
  },
  { 
    title: "Growth Channels",
    description: "LinkedIn connections yield 3x the growth rate of organic discovery",
    trend: "up"
  },
  { 
    title: "Topic Performance",
    description: "Design systems content has seen 15% decline in engagement this quarter",
    trend: "down"
  },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-heading">Growth Analytics</h1>
              <p className="text-muted-foreground">
                Comprehensive insights into your brand growth metrics
              </p>
            </div>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <Download className="mr-1 h-4 w-4" /> Export Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-card to-brand-blue/5 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <div className="text-2xl font-bold">4,520</div>
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    +10% this month
                  </Badge>
                </div>
                <Progress value={75} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  75% to quarterly goal (6,000)
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-brand-teal/5 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <div className="text-2xl font-bold">4.8%</div>
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    +0.5% this month
                  </Badge>
                </div>
                <Progress value={80} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  80% to target (6%)
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-[#0077B5]/5 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Content Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <div className="text-2xl font-bold">34</div>
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    +8 this quarter
                  </Badge>
                </div>
                <Progress value={85} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  85% to quarterly goal (40)
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-brand-orange/5 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <div className="text-2xl font-bold">8.5%</div>
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    +1.2% this month
                  </Badge>
                </div>
                <Progress value={85} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  85% to target (10%)
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>
                  Audience size and engagement rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="audience">
                  <TabsList className="mb-4">
                    <TabsTrigger value="audience">Audience</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    <TabsTrigger value="combined">Combined</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="audience" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={overallGrowth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                        <Line type="monotone" name="Audience Size" dataKey="audience" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="engagement" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={overallGrowth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                        <Line type="monotone" name="Engagement Rate %" dataKey="engagement" stroke="#00C49F" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="combined" className="animate-slide-up">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={overallGrowth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Legend />
                        <Line yAxisId="left" type="monotone" name="Audience Size" dataKey="audience" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" name="Engagement Rate %" dataKey="engagement" stroke="#00C49F" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Platform Breakdown</CardTitle>
                <CardDescription>
                  Audience distribution across platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={platformBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {platformBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>
                  Metrics by content type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentStats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-1.5 ${
                          stat.type.includes("Article") ? "bg-[#0077B5]/10" : 
                          stat.type.includes("Case") ? "bg-[#00AB6C]/10" :
                          stat.type.includes("Guide") ? "bg-[#FFBB28]/10" :
                          "bg-[#FF8042]/10"
                        }`}>
                          {stat.type.includes("Article") ? <Linkedin className="h-3 w-3 text-[#0077B5]" /> : 
                           stat.type.includes("Case") ? <MessageSquare className="h-3 w-3 text-[#00AB6C]" /> :
                           stat.type.includes("Guide") ? <BarChart2 className="h-3 w-3 text-[#FFBB28]" /> :
                           <Users className="h-3 w-3 text-[#FF8042]" />}
                        </div>
                        <span className="text-sm">{stat.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{stat.count}</span>
                        <span className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.growth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>
                  Important patterns detected in your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {keyInsights.map((insight, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          {insight.trend === 'up' ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                          {insight.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Content Performance Analysis</CardTitle>
              <CardDescription>
                Engagement metrics by content type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: 'Case Studies', linkedinEngagement: 5.2, mediumEngagement: 4.8 },
                    { name: 'How-to Guides', linkedinEngagement: 4.1, mediumEngagement: 4.5 },
                    { name: 'Industry Analysis', linkedinEngagement: 3.8, mediumEngagement: 3.5 },
                    { name: 'Thought Leadership', linkedinEngagement: 4.7, mediumEngagement: 3.9 },
                    { name: 'Quick Tips', linkedinEngagement: 3.2, mediumEngagement: 2.8 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Engagement Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar name="LinkedIn" dataKey="linkedinEngagement" fill="#0077B5" />
                  <Bar name="Medium" dataKey="mediumEngagement" fill="#00AB6C" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
