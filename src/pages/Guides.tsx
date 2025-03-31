
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Users, TrendingUp, Calendar, Youtube, Linkedin } from "lucide-react";

const guideCategories = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-10 w-10" />,
    color: "bg-blue-100 text-blue-700",
    guides: [
      {
        id: "start-1",
        title: "Setting Up Your BrandWise Account",
        description: "Learn how to set up your account and configure your essential settings.",
        difficulty: "Beginner",
        timeToComplete: "10 minutes"
      },
      {
        id: "start-2",
        title: "Understanding the Dashboard",
        description: "A complete walkthrough of the BrandWise dashboard and its features.",
        difficulty: "Beginner",
        timeToComplete: "15 minutes"
      }
    ]
  },
  {
    title: "Content Creation",
    icon: <FileText className="h-10 w-10" />,
    color: "bg-green-100 text-green-700",
    guides: [
      {
        id: "content-1",
        title: "Creating Your First Content Calendar",
        description: "Steps to plan and organize your content schedule effectively.",
        difficulty: "Intermediate",
        timeToComplete: "30 minutes"
      },
      {
        id: "content-2",
        title: "AI-Powered Content Generation",
        description: "How to use BrandWise's AI tools to create engaging content.",
        difficulty: "Intermediate",
        timeToComplete: "20 minutes"
      }
    ]
  },
  {
    title: "Audience Growth",
    icon: <Users className="h-10 w-10" />,
    color: "bg-purple-100 text-purple-700",
    guides: [
      {
        id: "audience-1",
        title: "Audience Segmentation Strategies",
        description: "Learn how to segment your audience for targeted content.",
        difficulty: "Advanced",
        timeToComplete: "45 minutes"
      },
      {
        id: "audience-2",
        title: "Building Engagement with Your Community",
        description: "Techniques to increase engagement with your content.",
        difficulty: "Intermediate",
        timeToComplete: "30 minutes"
      }
    ]
  },
  {
    title: "Analytics & Reporting",
    icon: <TrendingUp className="h-10 w-10" />,
    color: "bg-orange-100 text-orange-700",
    guides: [
      {
        id: "analytics-1",
        title: "Understanding Content Performance Metrics",
        description: "A deep dive into BrandWise analytics and what they mean.",
        difficulty: "Intermediate",
        timeToComplete: "40 minutes"
      },
      {
        id: "analytics-2",
        title: "Creating Custom Performance Reports",
        description: "How to create customized reports to track your key metrics.",
        difficulty: "Advanced",
        timeToComplete: "35 minutes"
      }
    ]
  }
];

const featuredGuides = [
  {
    id: "featured-1",
    title: "The Complete LinkedIn Growth Strategy",
    description: "A comprehensive guide to building your professional brand on LinkedIn using BrandWise tools.",
    category: "LinkedIn",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800&h=500",
    icon: <Linkedin className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "featured-2",
    title: "Content Calendar Mastery",
    description: "Learn how to plan, schedule, and optimize your content across multiple platforms.",
    category: "Content Strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500",
    icon: <Calendar className="h-6 w-6" />,
    color: "bg-green-100 text-green-700"
  },
  {
    id: "featured-3",
    title: "Video Content Strategy Guide",
    description: "Tips and strategies for creating engaging video content for social media.",
    category: "Video Content",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800&h=500",
    icon: <Youtube className="h-6 w-6" />,
    color: "bg-red-100 text-red-700"
  }
];

const Guides = () => {
  useEffect(() => {
    document.title = "Guides | BrandWise";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-heading">
            BrandWise User Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to make the most of BrandWise with our comprehensive guides and tutorials.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGuides.map(guide => (
              <Card key={guide.id} className="overflow-hidden card-hover">
                <div className="aspect-video">
                  <img 
                    src={guide.image} 
                    alt={guide.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <CardContent className="p-6">
                  <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium mb-4 ${guide.color}`}>
                    {guide.icon}
                    <span>{guide.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {guide.description}
                  </p>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {guideCategories.map((category, index) => (
          <section key={category.title} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-lg ${category.color}`}>
                {category.icon}
              </div>
              <h2 className="text-3xl font-bold">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.guides.map(guide => (
                <Card key={guide.id} className="card-hover">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {guide.description}
                    </p>
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Difficulty:</span>
                        <span className="text-muted-foreground">{guide.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Time:</span>
                        <span className="text-muted-foreground">{guide.timeToComplete}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">View Guide</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        <section className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our support team is ready to assist you with any questions you have about using BrandWise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline">Visit Support Center</Button>
            <Button>Contact Support</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guides;
