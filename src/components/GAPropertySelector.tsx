
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { saveGAProperties, getSelectedGAProperties, getGAPropertyNames, getPlatformCredentials } from "@/services/credentialsService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [isUsingDemo, setIsUsingDemo] = useState<boolean>(true);

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

        console.log("Attempting to fetch GA properties");
        
        try {
          // Check if we have a Supabase Edge Function endpoint for Google Analytics
          const edgeFunctionUrl = window.location.origin.includes('localhost') 
            ? 'http://localhost:54321/functions/v1/google-analytics-auth/properties'
            : `${window.location.origin}/functions/v1/google-analytics-auth/properties`;
          
          // Try to fetch from Edge Function
          const response = await fetch(edgeFunctionUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`
            }
          }).catch(err => {
            console.log("Edge function not available:", err);
            return null;
          });
          
          if (response && response.ok) {
            const data = await response.json();
            setProperties(data.properties);
            setIsUsingDemo(false);
            console.log("Successfully retrieved properties from Edge Function:", data.properties.length);
          } else {
            throw new Error("Edge function not available or returned an error");
          }
        } catch (fetchError) {
          console.error("Edge function error:", fetchError);
          
          // Fallback to demo data
          const fetchedProperties: GAProperty[] = [
            { id: "GA4-123456789", name: "Your Corporate Website (Demo)" },
            { id: "GA4-987654321", name: "Your Marketing Blog (Demo)" },
            { id: "GA4-456789123", name: "Your E-commerce Store (Demo)" },
            { id: "UA-789123456", name: "Your Mobile App (Demo)" }
          ];
          
          setProperties(fetchedProperties);
          setIsUsingDemo(true);
          console.log("Using demo properties:", fetchedProperties.length);
          
          setError(
            "Currently using demo data. To display real Google Analytics properties, " +
            "you need to implement a Supabase Edge Function for Google Analytics OAuth. " +
            "See the implementation guide in src/services/realGAIntegration.md"
          );
        }
        
        // Load previously selected properties
        const savedSelected = getSelectedGAProperties();
        if (savedSelected && savedSelected.length) {
          setSelectedProperties(savedSelected);
        } else if (properties.length > 0) {
          // If no properties were previously selected, select the first one by default
          setSelectedProperties([properties[0].id]);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Google Analytics Properties</CardTitle>
        <CardDescription>
          Choose which properties you want to track in the dashboard
          {isUsingDemo && <span className="text-amber-500 ml-2">(Demo Data)</span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertTitle>Using Demo Data</AlertTitle>
            <AlertDescription className="mt-2">
              {error}
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('/services/realGAIntegration.md', '_blank')}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Implementation Guide
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
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
        
        {properties.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        )}
        
        {properties.length === 0 && !loading && (
          <div className="py-8 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-amber-500 mb-4" />
            <p className="text-lg font-medium">No Google Analytics properties found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Please implement the Google Analytics Edge Function or check your API credentials
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GAPropertySelector;
