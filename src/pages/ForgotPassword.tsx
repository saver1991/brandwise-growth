
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Reset link sent",
          description: "If an account exists with this email, you'll receive a reset link shortly."
        });
        setIsSubmitted(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "Check your email for a reset link" 
                : "Enter your email and we'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>
          
          {isSubmitted ? (
            <CardContent className="pt-4 pb-2 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-brand-teal/10 p-4">
                  <CheckCircle2 className="h-8 w-8 text-brand-teal" />
                </div>
                <p className="text-center text-muted-foreground">
                  We've sent an email to <span className="font-medium text-foreground">{email}</span> with instructions to reset your password.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you don't see it in your inbox, please check your spam folder.
                </p>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
                <div className="text-center text-sm">
                  <Link to="/login" className="text-primary hover:underline">
                    Back to login
                  </Link>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
