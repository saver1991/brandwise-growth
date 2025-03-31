
import { useEffect, useState } from "react";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageSquare, 
  Mail, 
  FileText, 
  Phone, 
  HelpCircle,
  ChevronDown
} from "lucide-react";

const faqs = [
  {
    question: "How do I connect my social media accounts?",
    answer: "You can connect your social media accounts by navigating to the Integrations page and clicking on the platform you want to connect. Follow the authentication steps to grant BrandWise access to your account."
  },
  {
    question: "Can I schedule posts across multiple platforms?",
    answer: "Yes, BrandWise allows you to schedule content across multiple platforms simultaneously. Simply create your content, select the platforms you want to publish to, and set your preferred date and time."
  },
  {
    question: "How does the AI content generation work?",
    answer: "Our AI content generation tool uses advanced natural language processing to help you create engaging content. You can provide a topic and some keywords, and the AI will generate content ideas or full drafts that you can edit and customize."
  },
  {
    question: "What analytics are available in BrandWise?",
    answer: "BrandWise provides comprehensive analytics including engagement metrics (likes, comments, shares), audience growth, best performing content, optimal posting times, and demographic insights across all your connected platforms."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription by going to your Account Settings and selecting the Billing section. Click on 'Cancel Subscription' and follow the prompts. Your access will continue until the end of your current billing period."
  },
  {
    question: "Is there a limit to how many posts I can schedule?",
    answer: "The number of posts you can schedule depends on your subscription plan. Basic plans include up to 100 scheduled posts per month, while Premium and Professional plans offer unlimited scheduling."
  }
];

export default function Support() {
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  
  useEffect(() => {
    document.title = "Support | BrandWise";
  }, []);
  
  const toggleFAQ = (index: number) => {
    if (openFAQs.includes(index)) {
      setOpenFAQs(openFAQs.filter(i => i !== index));
    } else {
      setOpenFAQs([...openFAQs, index]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Search our knowledge base, browse the FAQs, or get in touch with our support team.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-10 h-12"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Button className="absolute right-1 top-1 h-10">
              Search
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="faq" className="mb-16">
          <TabsList className="grid grid-cols-3 max-w-lg mx-auto mb-8">
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="cursor-pointer overflow-hidden">
                  <div 
                    className="p-6 flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform ${openFAQs.includes(index) ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openFAQs.includes(index) && (
                    <CardContent className="pt-0 pb-6 text-muted-foreground">
                      {faq.answer}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="documentation">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                  <p className="text-muted-foreground mb-4">Set up your account and learn the basics of BrandWise.</p>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Platform Integrations</h3>
                  <p className="text-muted-foreground mb-4">Learn how to connect and manage your social media accounts.</p>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Content Calendar</h3>
                  <p className="text-muted-foreground mb-4">Master content scheduling and planning with BrandWise.</p>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Analytics & Reporting</h3>
                  <p className="text-muted-foreground mb-4">Understand your performance metrics and create custom reports.</p>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">AI Content Tools</h3>
                  <p className="text-muted-foreground mb-4">Leverage AI to generate and optimize your content strategy.</p>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Account Management</h3>
                  <p className="text-muted-foreground mb-4">Manage your team, billing, and account preferences.</p>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Live Chat</h3>
                  <p className="text-muted-foreground mb-4">Chat with our support team in real-time.</p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">Send us an email and we'll respond within 24 hours.</p>
                  <Button variant="outline" className="w-full">Send Email</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">For Premium and Enterprise customers only.</p>
                  <Button variant="outline" className="w-full">Schedule Call</Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Send us a message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email address" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="What is your question about?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea 
                      id="message" 
                      placeholder="Please describe your issue in detail" 
                      className="w-full h-32 rounded-md border border-input bg-background px-3 py-2"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full md:w-auto">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available Monday through Friday, 9am-6pm EST.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="flex gap-2">
              <HelpCircle size={18} />
              <span>Help Center</span>
            </Button>
            <Button variant="outline" className="flex gap-2">
              <MessageSquare size={18} />
              <span>Community Forum</span>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
