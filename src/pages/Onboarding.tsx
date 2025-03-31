
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Check, Settings, Users, Lightbulb } from "lucide-react";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const OnboardingStep = ({ 
  title, 
  description, 
  icon, 
  isActive, 
  isCompleted, 
  onClick 
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) => {
  return (
    <Card 
      className={`p-6 cursor-pointer transition-all ${
        isActive ? "border-primary shadow-md" : "hover:border-primary/50"
      } ${isCompleted ? "bg-muted/30" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${isActive || isCompleted ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          {isCompleted ? <Check className="h-5 w-5" /> : icon}
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1 flex items-center gap-2">
            {title}
            {isCompleted && <span className="text-sm text-muted-foreground">(Completed)</span>}
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user exists, otherwise redirect to login
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const steps = [
    {
      title: "Set Up Your Profile",
      description: "Complete your profile information to personalize your BrandWise experience.",
      icon: <Users className="h-5 w-5" />,
      action: () => navigate("/account/profile"),
    },
    {
      title: "Configure Your Account",
      description: "Set your preferences and notification settings to customize how you use BrandWise.",
      icon: <Settings className="h-5 w-5" />,
      action: () => navigate("/account/settings"),
    },
    {
      title: "Create Your First Profile",
      description: "Set up a brand profile to start managing your content and social media presence.",
      icon: <Lightbulb className="h-5 w-5" />,
      action: () => navigate("/profiles/new"),
    },
  ];

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    
    // Mark as completed if not already
    if (!completedSteps.includes(index)) {
      // For demo purposes, mark as completed immediately
      // In a real app, you might do this after they complete the actual setup
      setCompletedSteps(prev => [...prev, index]);
    }
    
    // Perform the action for this step
    steps[index].action();
  };

  const handleFinish = () => {
    toast({
      title: "Onboarding Complete!",
      description: "You're all set to use BrandWise.",
    });
    navigate("/dashboard");
  };

  const isAllCompleted = completedSteps.length === steps.length;

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      
      <div className="flex-1 flex justify-center items-center p-4 bg-muted/30">
        <div className="w-full max-w-3xl">
          <div className="bg-background rounded-lg shadow-md p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Welcome to BrandWise!</h1>
              <p className="text-muted-foreground text-center mb-8">
                Let's get you set up to make the most of your new account
              </p>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <OnboardingStep
                    key={index}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    isActive={currentStep === index}
                    isCompleted={completedSteps.includes(index)}
                    onClick={() => handleStepClick(index)}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={handleFinish} 
                  className="flex items-center gap-2"
                  size="lg"
                  disabled={!isAllCompleted}
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Onboarding;
