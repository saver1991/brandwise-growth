
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { saveGAProperties, getSelectedGAProperties, getGAPropertyNames } from "@/services/credentialsService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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

  // Load properties
  useEffect(() => {
    const loadProperties = async () => {
      try {
        // In a real app, this would fetch from the Google Analytics API
        // For demo purposes, we'll simulate some properties
        const demoProperties = [
          { id: "123456789", name: "Corporate Website" },
          { id: "987654321", name: "Marketing Blog" },
          { id: "456789123", name: "E-commerce Store" },
          { id: "789123456", name: "Mobile App" }
        ];
        
        // Short delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProperties(demoProperties);
        
        // Load previously selected properties
        const savedSelected = getSelectedGAProperties();
        if (savedSelected && savedSelected.length) {
          setSelectedProperties(savedSelected);
        }
      } catch (error) {
        console.error("Error fetching GA properties:", error);
        toast.error("Failed to load Google Analytics properties");
      } finally {
        setLoading(false);
      }
    };
    
    loadProperties();
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
        </CardDescription>
      </CardHeader>
      <CardContent>
        {properties.length === 0 ? (
          <p className="text-muted-foreground">No Google Analytics properties found.</p>
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
