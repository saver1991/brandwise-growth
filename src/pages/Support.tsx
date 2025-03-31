
import { useEffect } from "react";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Mail, Clock } from "lucide-react";

const Support = () => {
  useEffect(() => {
    document.title = "Support | BrandWise";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-heading">
            How Can We Help You?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our support team is here to assist you with any questions or issues
            you may encounter while using BrandWise.
          </p>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-6">
                  Chat with our support team in real-time for immediate assistance with
                  your questions.
                </p>
                <Button>Start Chat</Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Mail className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-6">
                  Send us an email and we'll get back to you within 24 hours with
                  a detailed response.
                </p>
                <Button>Contact Us</Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Book a Call</h3>
                <p className="text-muted-foreground mb-6">
                  Schedule a call with one of our experts for personalized guidance
                  and assistance.
                </p>
                <Button>Schedule Now</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">How do I connect my social media accounts?</h3>
              <p className="text-muted-foreground">
                You can connect your social media accounts by going to the Integrations page
                and following the step-by-step instructions for each platform you want to connect.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Can I schedule posts across multiple platforms?</h3>
              <p className="text-muted-foreground">
                Yes, BrandWise allows you to create and schedule content for multiple social media
                platforms simultaneously, saving you time and ensuring consistent messaging.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">How do I analyze my content performance?</h3>
              <p className="text-muted-foreground">
                Navigate to the Analytics section where you'll find comprehensive dashboards
                showing engagement metrics, audience growth, and content performance across all
                your connected platforms.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Can I collaborate with my team?</h3>
              <p className="text-muted-foreground">
                Absolutely! BrandWise offers team collaboration features that allow you to
                assign tasks, request approvals, and manage workflow among team members.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our support team is available Monday through Friday, 9am-6pm EST.
            We typically respond to all inquiries within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Contact Support</Button>
            <Button variant="outline" size="lg">View Knowledge Base</Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Support;
