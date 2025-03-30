
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, PenTool, Globe } from "lucide-react";

const WordPress = () => {
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  Blog Post Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create high-quality, SEO-optimized content that attracts readers and improves your site's visibility.
                </p>
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
                <p className="text-muted-foreground">
                  Track and improve your WordPress site's search engine optimization metrics.
                </p>
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
                <p className="text-muted-foreground">
                  Monitor comments, social sharing, and other engagement metrics on your WordPress content.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">More WordPress analytics and management features coming soon</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WordPress;
