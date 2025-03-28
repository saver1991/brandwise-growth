
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { useState } from "react";

const calendarEvents = [
  {
    id: 1,
    title: "Design System Article",
    platform: "medium",
    date: new Date(2023, 6, 10),
    status: "scheduled",
  },
  {
    id: 2,
    title: "UX Research Interview Series",
    platform: "linkedin",
    date: new Date(2023, 6, 15),
    status: "draft",
  },
  {
    id: 3,
    title: "Product Strategy Insights",
    platform: "twitter",
    date: new Date(2023, 6, 20),
    status: "scheduled",
  },
  {
    id: 4,
    title: "Career Growth for Designers",
    platform: "linkedin",
    date: new Date(2023, 6, 22),
    status: "draft",
  },
  {
    id: 5,
    title: "Case Study: Redesign Project",
    platform: "medium",
    date: new Date(2023, 6, 25),
    status: "scheduled",
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredEvents = date 
    ? calendarEvents.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      )
    : [];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-[#0077B5]" />;
      case "medium":
        return <MessageSquare className="h-4 w-4 text-[#00AB6C]" />;
      case "twitter":
        return <Twitter className="h-4 w-4 text-[#1DA1F2]" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Scheduled</Badge>;
      default:
        return null;
    }
  };

  const daysWithEvents = calendarEvents.map(event => event.date);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-heading">Content Calendar</h1>
              <p className="text-muted-foreground">
                Schedule and manage your content across platforms
              </p>
            </div>
            <Button className="bg-brand-teal hover:bg-brand-teal/90">
              <Plus className="mr-1 h-4 w-4" /> New Content
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 card-hover">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{
                    hasEvent: daysWithEvents,
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      backgroundColor: "#fff",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      textDecorationColor: "#2A9D8F",
                      textDecorationThickness: "2px",
                    },
                  }}
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Scheduled Content</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="day">
                  <TabsList className="mb-4">
                    <TabsTrigger value="day">Selected Day</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="day" className="animate-slide-up">
                    {filteredEvents.length > 0 ? (
                      <div className="space-y-4">
                        {filteredEvents.map((event) => (
                          <div key={event.id} className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  {getPlatformIcon(event.platform)}
                                  <h3 className="font-medium">{event.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {event.date.toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </p>
                              </div>
                              {getStatusBadge(event.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>No content scheduled for this date</p>
                        <Button variant="link" className="text-brand-teal mt-2">
                          <Plus className="mr-1 h-4 w-4" /> Add Content
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="week" className="animate-slide-up">
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Weekly content view will be available soon</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="month" className="animate-slide-up">
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Monthly content view will be available soon</p>
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

export default Calendar;
