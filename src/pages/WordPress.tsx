
import { useProfile } from "@/contexts/ProfileContext";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, PenTool, Globe, BarChart2, Users, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const wordpressData = [
  { month: "Jan", views: 1200, comments: 45 },
  { month: "Feb", views: 1800, comments: 82 },
  { month: "Mar", views: 2400, comments: 124 },
  { month: "Apr", views: 2100, comments: 98 },
  { month: "May", views: 2800, comments: 136 },
  { month: "Jun", views: 3200, comments: 175 },
];

const WordPress = () => {
  const { currentProfile } = useProfile();
  const hasWordPress = currentProfile.integrations?.includes('wordpress');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-8">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">WordPress Strategy</h1>
            <p className="text-muted-foreground">
              Manage and optimize your WordPress content for better engagement
            </p>
          </div>
          
          {!hasWordPress ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Globe className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">WordPress Not Connected</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Connect your WordPress account to access analytics, manage content, and optimize your blog posts.
              </p>
              <Button onClick={() => window.location.href = '/integrations'}>
                Connect WordPress
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PenTool className="h-5 w-5" />
                      Blog Post Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Create high-quality, SEO-optimized content that attracts readers and improves your site's visibility.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">View Strategy</Button>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      SEO Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Track and improve your WordPress site's search engine optimization metrics.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">Analyze SEO</Button>
                  </CardContent>
                </Card>
                
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Audience Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Monitor comments, social sharing, and other engagement metrics on your WordPress content.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">View Engagement</Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Blog Performance</CardTitle>
                  <CardDescription>
                    Views and comments over the past 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={wordpressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="views" name="Page Views" stroke="#0088FE" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="comments" name="Comments" stroke="#00C49F" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">10 WordPress SEO Tips for Beginners</p>
                          <p className="text-sm text-muted-foreground">Published 2 weeks ago</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">1,245 views</p>
                          <p className="text-sm text-muted-foreground">32 comments</p>
                        </div>
                      </li>
                      <li className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">How to Speed Up Your WordPress Site</p>
                          <p className="text-sm text-muted-foreground">Published 1 month ago</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">987 views</p>
                          <p className="text-sm text-muted-foreground">24 comments</p>
                        </div>
                      </li>
                      <li className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">The Best WordPress Plugins for 2023</p>
                          <p className="text-sm text-muted-foreground">Published 2 months ago</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">856 views</p>
                          <p className="text-sm text-muted-foreground">19 comments</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Content Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">WordPress Security Guide</p>
                          <p className="text-sm text-muted-foreground">Scheduled for Jul 15</p>
                        </div>
                        <Button size="sm" variant="outline">Edit Draft</Button>
                      </li>
                      <li className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Custom Theme Development</p>
                          <p className="text-sm text-muted-foreground">Scheduled for Jul 22</p>
                        </div>
                        <Button size="sm" variant="outline">Edit Draft</Button>
                      </li>
                      <li className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">WooCommerce Optimization</p>
                          <p className="text-sm text-muted-foreground">Scheduled for Jul 29</p>
                        </div>
                        <Button size="sm" variant="outline">Edit Draft</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WordPress;
