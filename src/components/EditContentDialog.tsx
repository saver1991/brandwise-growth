
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface CalendarEvent {
  id: number;
  title: string;
  platform: "linkedin" | "medium" | "twitter";
  date: Date;
  status: "draft" | "scheduled";
}

interface EditContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
  onSave: (event: CalendarEvent) => void;
}

export function EditContentDialog({ open, onOpenChange, event, onSave }: EditContentDialogProps) {
  const [title, setTitle] = useState(event?.title || "");
  const [platform, setPlatform] = useState(event?.platform || "linkedin");
  const [date, setDate] = useState<Date | undefined>(event?.date);
  const [status, setStatus] = useState(event?.status || "draft");
  const { toast } = useToast();

  // Reset form when dialog opens with new event
  useState(() => {
    if (event) {
      setTitle(event.title);
      setPlatform(event.platform);
      setDate(event.date);
      setStatus(event.status);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title is required",
        description: "Please enter a title for your content",
        variant: "destructive",
      });
      return;
    }

    if (!date) {
      toast({
        title: "Date is required",
        description: "Please select a date for your content",
        variant: "destructive",
      });
      return;
    }

    onSave({
      id: event?.id || Date.now(),
      title,
      platform: platform as "linkedin" | "medium" | "twitter",
      date,
      status: status as "draft" | "scheduled",
    });

    toast({
      title: "Content updated",
      description: "Your content has been successfully updated",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Content" : "Add New Content"}</DialogTitle>
          <DialogDescription>
            Update your scheduled content details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your content title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={platform}
              onValueChange={(value) => setPlatform(value as "linkedin" | "medium" | "twitter")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Date and Time</Label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <Select 
                value={format(date || new Date(), "HH:00")}
                onValueChange={(value) => {
                  const newDate = new Date(date || new Date());
                  newDate.setHours(parseInt(value, 10));
                  newDate.setMinutes(0);
                  setDate(newDate);
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                      {`${hour.toString().padStart(2, '0')}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as "draft" | "scheduled")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button type="submit" className="bg-brand-teal hover:bg-brand-teal/90">
              <Check className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
