
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already provided consent
    const hasConsented = localStorage.getItem("cookieConsent") === "true";
    
    if (!hasConsented) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAllCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("analyticsCookies", "true");
    localStorage.setItem("marketingCookies", "true");
    setShowConsent(false);
  };

  const acceptEssentialCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("analyticsCookies", "false");
    localStorage.setItem("marketingCookies", "false");
    setShowConsent(false);
  };

  const dismissConsent = () => {
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Cookie Consent</h3>
            <Button variant="ghost" size="icon" onClick={dismissConsent}>
              <X size={18} />
            </Button>
          </div>
          
          <p className="text-muted-foreground">
            We use cookies to enhance your browsing experience, personalize content and ads, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. 
            Visit our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link> to learn more.
          </p>
          
          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" onClick={acceptEssentialCookies}>
              Essential Cookies Only
            </Button>
            <Button onClick={acceptAllCookies}>
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
