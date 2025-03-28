import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Linkedin, MessageSquare, Twitter, CalendarClock, Sparkles, Edit } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import aiGenerationService from "@/services/aiGenerationService";
import { EditContentDialog, CalendarEvent } from "@/components/EditContentDialog";

const initialCalendarEvents: CalendarEvent[] = [
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

// Best posting times based on platform analytics
const platformBestTimes = {
  linkedin: { days: [1, 3, 5], hours: [9, 12, 17] }, // Mon, Wed, Fri at 9am, 12pm, 5pm
  medium: { days: [2, 4], hours: [8, 20] },          // Tue, Thu at 8am, 8pm
  twitter: { days: [0, 1, 3, 5], hours: [7, 12, 15, 19] } // Sun, Mon, Wed, Fri at 7am, 12pm, 3pm, 7pm
};

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const { toast } = useToast();

  const filteredEvents = date 
    ? events.filter(event => 
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

  const daysWithEvents = events.map(event => event.date);

  // Function to generate AI-powered content schedule
  const generateContentSchedule = async () => {
    setIsGenerating(true);
    toast({
      title: "Generating optimal content schedule",
      description: "Analyzing platform data and best posting times...",
    });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const currentDate = new Date();
      const newEvents = [];
      
      // Generate content for the next 14 days based on platform best practices
      for (let i = 0; i < 14; i++) {
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + i);
        const dayOfWeek = futureDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Check if this day is good for any platform
        const platformsForDay = Object.entries(platformBestTimes)
          .filter(([_, times]) => times.days.includes(dayOfWeek))
          .map(([platform]) => platform);
        
        if (platformsForDay.length > 0) {
          // Choose a random platform from the available ones for this day
          const platform = platformsForDay[Math.floor(Math.random() * platformsForDay.length)];
          
          // Get best hours for this platform
          const hours = platformBestTimes[platform as keyof typeof platformBestTimes].hours;
          const hour = hours[Math.floor(Math.random() * hours.length)];
          
          // Generate content for this platform
          const content = await aiGenerationService.generateContent({ platform });
          
          // Set the time of the future date
          futureDate.setHours(hour, 0, 0, 0);
          
          // Create a new event
          newEvents.push({
            id: events.length + newEvents.length + 1,
            title: content.title,
            platform,
            date: new Date(futureDate),
            status: "scheduled"
          });
        }
      }
      
      // Add new events to the calendar
      setEvents([...events, ...newEvents]);
      
      toast({
        title: "Schedule generated successfully",
        description: `Added ${newEvents.length} new content items to your calendar based on optimal posting times.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to generate schedule",
        description: "An error occurred while generating your content schedule.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditContent = (event: CalendarEvent) => {
    setCurrentEvent(event);
    setEditDialogOpen(true);
  };

  const handleAddNewContent = () => {
    setCurrentEvent(null);
    setEditDialogOpen(true);
  };

  const handleSaveContent = (updatedEvent: CalendarEvent) => {
    if (currentEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      ));
    } else {
      // Add new event
      setEvents([...events, updatedEvent]);
    }
  };

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
            <Button 
              className="bg-brand-teal hover:bg-brand-teal/90"
              onClick={handleAddNewContent}
            >
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
                      fontWeight: "bold",
                      textDecoration: "underline",
                      textDecorationColor: "#2A9D8F",
                      textDecorationThickness: "2px",
                    },
                    selected: {
                      backgroundColor: "#2A9D8F",
                      color: "white",
                      fontWeight: "bold"
                    }
                  }}
                  styles={{
                    day_selected: { 
                      backgroundColor: "#2A9D8F !important",
                      color: "white !important", 
                      fontWeight: "bold" 
                    }
                  }}
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Scheduled Content</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 bg-gradient-to-r from-brand-teal/30 to-blue-400/30 hover:from-brand-teal/40 hover:to-blue-400/40 border-brand-teal/50"
                      onClick={generateContentSchedule}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="h-4 w-4 border-2 border-t-transparent border-brand-teal animate-spin rounded-full"></div>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-brand-teal" />
                          <span>AI Schedule</span>
                        </>
                      )}
                    </Button>
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
                                  })} {event.date.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(event.status)}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleEditContent(event)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <p>No content scheduled for this date</p>
                        <Button variant="link" className="text-brand-teal mt-2" onClick={handleAddNewContent}>
                          <Plus className="mr-1 h-4 w-4" /> Add Content
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="week" className="animate-slide-up">
                    <div className="space-y-4">
                      {events
                        .filter(event => {
                          if (!date) return false;
                          const eventDate = new Date(event.date);
                          const selectedDate = new Date(date);
                          
                          // Get the start of the week (Sunday)
                          const startOfWeek = new Date(selectedDate);
                          startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
                          
                          // Get the end of the week (Saturday)
                          const endOfWeek = new Date(startOfWeek);
                          endOfWeek.setDate(startOfWeek.getDate() + 6);
                          
                          return eventDate >= startOfWeek && eventDate <= endOfWeek;
                        })
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((event) => (
                          <div key={event.id} className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  {getPlatformIcon(event.platform)}
                                  <h3 className="font-medium">{event.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {event.date.toLocaleDateString('en-US', { 
                                    weekday: 'short',
                                    month: 'short', 
                                    day: 'numeric'
                                  })} {event.date.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(event.status)}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleEditContent(event)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      {events.filter(event => {
                        if (!date) return false;
                        const eventDate = new Date(event.date);
                        const selectedDate = new Date(date);
                        
                        // Get the start of the week (Sunday)
                        const startOfWeek = new Date(selectedDate);
                        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
                        
                        // Get the end of the week (Saturday)
                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 6);
                        
                        return eventDate >= startOfWeek && eventDate <= endOfWeek;
                      }).length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>No content scheduled for this week</p>
                          <div className="mt-4 flex justify-center gap-4">
                            <Button variant="outline" className="text-brand-teal" onClick={handleAddNewContent}>
                              <Plus className="mr-1 h-4 w-4" /> Add Content
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex items-center gap-2 text-brand-teal"
                              onClick={generateContentSchedule}
                              disabled={isGenerating}
                            >
                              <Sparkles className="h-4 w-4" />
                              <span>AI Schedule</span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="month" className="animate-slide-up">
                    <div className="space-y-4">
                      {events
                        .filter(event => {
                          if (!date) return false;
                          const eventDate = new Date(event.date);
                          const selectedDate = new Date(date);
                          
                          return eventDate.getMonth() === selectedDate.getMonth() && 
                                 eventDate.getFullYear() === selectedDate.getFullYear();
                        })
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((event) => (
                          <div key={event.id} className="border rounded-lg p-4 hover:border-brand-teal/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  {getPlatformIcon(event.platform)}
                                  <h3 className="font-medium">{event.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {event.date.toLocaleDateString('en-US', { 
                                    weekday: 'short',
                                    month: 'short', 
                                    day: 'numeric'
                                  })} {event.date.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(event.status)}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleEditContent(event)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      {events.filter(event => {
                        if (!date) return false;
                        const eventDate = new Date(event.date);
                        const selectedDate = new Date(date);
                        
                        return eventDate.getMonth() === selectedDate.getMonth() && 
                               eventDate.getFullYear() === selectedDate.getFullYear();
                      }).length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>No content scheduled for this month</p>
                          <div className="mt-4 flex justify-center gap-4">
                            <Button variant="outline" className="text-brand-teal" onClick={handleAddNewContent}>
                              <Plus className="mr-1 h-4 w-4" /> Add Content
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex items-center gap-2 text-brand-teal"
                              onClick={generateContentSchedule}
                              disabled={isGenerating}
                            >
                              <Sparkles className="h-4 w-4" />
                              <span>AI Schedule</span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <EditContentDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        event={currentEvent}
        onSave={handleSaveContent}
      />
    </div>
  );
};

export default Calendar;
