
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { saveGAProperties, getSelectedGAProperties, getGAPropertyNames, getPlatformCredentials } from "@/services/credentialsService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GAProperty {
  id: string;
  name: string;
}

interface GAPropertySelectorProps {
  onSave?: () => void;
}

const GAPropertySelector = ({ onSave }: GAPropertySelectorProps) => {
  const [properties, setProperties] = useState<GAProperty[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load properties
  useEffect(() => {
    const fetchGAProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get GA credentials
        const credentials = getPlatformCredentials('googleAnalytics');
        
        if (!credentials.apiKey) {
          throw new Error("API key not found");
        }

        console.log("Attempting to fetch GA properties with key:", credentials.apiKey.substring(0, 5) + "...");
        
        try {
          // In a real implementation, this would call our Supabase Edge Function
          // For now, we'll still use simulated data until the Edge Function is set up
          
          // Simulating network delay
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // These would come from the Supabase Edge Function in a real implementation
          // This is still using realistic sample data for demo purposes
          const fetchedProperties: GAProperty[] = [
            { id: "GA4-123456789", name: "Your Corporate Website" },
            { id: "GA4-987654321", name: "Your Marketing Blog" },
            { id: "GA4-456789123", name: "Your E-commerce Store" },
            { id: "UA-789123456", name: "Your Mobile App (Universal Analytics)" }
          ];
          
          console.log("Successfully retrieved properties:", fetchedProperties.length);
          setProperties(fetchedProperties);
          
          // Load previously selected properties
          const savedSelected = getSelectedGAProperties();
          if (savedSelected && savedSelected.length) {
            setSelectedProperties(savedSelected);
          } else if (fetchedProperties.length > 0) {
            // If no properties were previously selected, select the first one by default
            setSelectedProperties([fetchedProperties[0].id]);
          }
        } catch (fetchError) {
          console.error("Error fetching GA properties:", fetchError);
          setError(
            "Failed to fetch Google Analytics properties. To use real Google Analytics data, " +
            "a Supabase Edge Function needs to be implemented to handle the Google OAuth flow and API calls."
          );
          toast.error("Failed to fetch Google Analytics properties");
        }
      } catch (error) {
        console.error("Error in GA properties setup:", error);
        setError("Failed to load Google Analytics properties. Please check your API credentials.");
        toast.error("Failed to load Google Analytics properties");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGAProperties();
  }, []);

  const handleToggleProperty = (propertyId: string) => {
    setSelectedProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const handleSave = () => {
    if (selectedProperties.length === 0) {
      toast.error("Please select at least one property");
      return;
    }
    
    // Create a map of property IDs to names
    const propertyNames: Record<string, string> = {};
    properties.forEach(property => {
      if (selectedProperties.includes(property.id)) {
        propertyNames[property.id] = property.name;
      }
    });
    
    // Save selected properties
    saveGAProperties(selectedProperties, propertyNames);
    
    toast.success("Google Analytics properties updated");
    if (onSave) onSave();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading properties...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Google Analytics Properties</CardTitle>
        <CardDescription>
          Choose which properties you want to track in the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {properties.length === 0 ? (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              To use real Google Analytics data, you need to implement a Supabase Edge Function that handles:
              <ol className="list-decimal ml-6 mt-2">
                <li>Google OAuth authentication flow</li>
                <li>Secure storage of refresh tokens</li>
                <li>API calls to Google Analytics Data API</li>
              </ol>
              <p className="mt-2">Currently using simulated data for demonstration purposes.</p>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-4">
              {properties.map(property => (
                <div key={property.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`property-${property.id}`}
                    checked={selectedProperties.includes(property.id)}
                    onCheckedChange={() => handleToggleProperty(property.id)}
                  />
                  <label
                    htmlFor={`property-${property.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {property.name}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave}>
                Save Preferences
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GAPropertySelector;
