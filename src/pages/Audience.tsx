import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, TrendingUp, ArrowUpRight, UserCircle, Globe, Share2, FileText } from "lucide-react";

const demographicData = [
  { name: "25-34", value: 40 },
  { name: "35-44", value: 30 },
  { name: "45-54", value: 20 },
  { name: "Other", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const growthData = [
  { month: "Jan", linkedin: 2200, medium: 950, wordpress: 450 },
  { month: "Feb", linkedin: 2350, medium: 1050, wordpress: 500 },
  { month: "Mar", linkedin: 2500, medium: 1150, wordpress: 580 },
  { month: "Apr", linkedin: 2630, medium: 1200, wordpress: 620 },
  { month: "May", linkedin: 2750, medium: 1250, wordpress: 680 },
  { month: "Jun", linkedin: 2845, medium: 1249, wordpress: 710 },
];

const topReferrers = [
  { source: "LinkedIn Posts", count: 842, change: "+12%" },
  { source: "Medium Articles", count: 536, change: "+8%" },
  { source: "WordPress Blogs", count: 324, change: "+5%" },
  { source: "Newsletter Mentions", count: 218, change: "+15%" },
  { source: "Industry Forums", count: 185, change: "-3%" },
];

const Audience = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-heading">Audience Growth</h1>
              <p className="text-muted-foreground">
                Track and analyze your audience demographics and growth
              </p>
            </div>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <Users className="mr-1 h-4 w-4" /> Export Audience Data
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <CardTitle>Audience Growth</CardTitle>
                <CardDescription>
                  Track growth across platforms over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                    <Line type="monotone" name="LinkedIn" dataKey="linkedin" stroke="#0077B5" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" name="Medium" dataKey="medium" stroke="#00AB6C" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" name="WordPress" dataKey="wordpress" stroke="#21759b" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>
                  Age distribution of your audience
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {demographicData.map((entry, index) => (
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
                <CardTitle>Top Referral Sources</CardTitle>
                <CardDescription>
                  Where your audience is coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topReferrers.map((source, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-1.5 ${
                          source.source.includes("LinkedIn") ? "bg-[#0077B5]/10" : 
                          source.source.includes("Medium") ? "bg-[#00AB6C]/10" :
                          source.source.includes("WordPress") ? "bg-[#21759b]/10" :
                          source.source.includes("Newsletter") ? "bg-purple-100" :
                          "bg-gray-100"
                        }`}>
                          {source.source.includes("LinkedIn") ? <UserCircle className="h-3 w-3 text-[#0077B5]" /> : 
                           source.source.includes("Medium") ? <Share2 className="h-3 w-3 text-[#00AB6C]" /> :
                           source.source.includes("WordPress") ? <FileText className="h-3 w-3 text-[#21759b]" /> :
                           source.source.includes("Newsletter") ? <Globe className="h-3 w-3 text-purple-800" /> :
                           <Globe className="h-3 w-3 text-gray-500" />}
                        </div>
                        <span className="text-sm">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{source.count}</span>
                        <span className={`text-xs ${source.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {source.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>
                  Key demographics and behavioral patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="demographics">
                  <TabsList className="mb-4">
                    <TabsTrigger value="demographics">Demographics</TabsTrigger>
                    <TabsTrigger value="interests">Interests</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="demographics" className="animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Top Industries</h3>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>Product & Design</span>
                            <span>42%</span>
                          </div>
                          <Progress value={42} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Software Development</span>
                            <span>28%</span>
                          </div>
                          <Progress value={28} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Marketing</span>
                            <span>15%</span>
                          </div>
                          <Progress value={15} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Consulting</span>
                            <span>10%</span>
                          </div>
                          <Progress value={10} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Other</span>
                            <span>5%</span>
                          </div>
                          <Progress value={5} className="h-1" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Job Roles</h3>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>UX/Product Designers</span>
                            <span>35%</span>
                          </div>
                          <Progress value={35} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Product Managers</span>
                            <span>25%</span>
                          </div>
                          <Progress value={25} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Engineers</span>
                            <span>20%</span>
                          </div>
                          <Progress value={20} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Executives</span>
                            <span>12%</span>
                          </div>
                          <Progress value={12} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Other</span>
                            <span>8%</span>
                          </div>
                          <Progress value={8} className="h-1" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Geography</h3>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>United States</span>
                            <span>40%</span>
                          </div>
                          <Progress value={40} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Europe</span>
                            <span>30%</span>
                          </div>
                          <Progress value={30} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Asia</span>
                            <span>15%</span>
                          </div>
                          <Progress value={15} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>South America</span>
                            <span>10%</span>
                          </div>
                          <Progress value={10} className="h-1" />
                          
                          <div className="flex justify-between mt-2">
                            <span>Other</span>
                            <span>5%</span>
                          </div>
                          <Progress value={5} className="h-1" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="interests" className="animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Professional Interests</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            UX Design
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            Product Strategy
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            Design Systems
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            User Research
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            Design Leadership
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            Product Management
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            SaaS
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            Startups
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Content Preferences</h3>
                        <div className="text-xs text-muted-foreground space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Case Studies</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>How-to Guides</span>
                              <span>30%</span>
                            </div>
                            <Progress value={30} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Industry Analysis</span>
                              <span>15%</span>
                            </div>
                            <Progress value={15} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Thought Leadership</span>
                              <span>10%</span>
                            </div>
                            <Progress value={10} className="h-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="behavior" className="animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Engagement Patterns</h3>
                        <div className="text-xs text-muted-foreground space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Morning (6am-12pm)</span>
                              <span>35%</span>
                            </div>
                            <Progress value={35} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Afternoon (12pm-6pm)</span>
                              <span>40%</span>
                            </div>
                            <Progress value={40} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Evening (6pm-12am)</span>
                              <span>20%</span>
                            </div>
                            <Progress value={20} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Night (12am-6am)</span>
                              <span>5%</span>
                            </div>
                            <Progress value={5} className="h-1" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Platform Preferences</h3>
                        <div className="text-xs text-muted-foreground space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>LinkedIn</span>
                              <span>60%</span>
                            </div>
                            <Progress value={60} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Medium</span>
                              <span>25%</span>
                            </div>
                            <Progress value={25} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>WordPress</span>
                              <span>10%</span>
                            </div>
                            <Progress value={10} className="h-1" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Other</span>
                              <span>5%</span>
                            </div>
                            <Progress value={5} className="h-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Audience;
