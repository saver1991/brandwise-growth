
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { format } from "date-fns";

interface ContentItem {
  id: number;
  title: string;
  platform: "linkedin" | "medium" | "twitter";
  date: Date;
  status: "draft" | "scheduled" | "in-review";
}

const upcomingContent: ContentItem[] = [
  {
    id: 1,
    title: "How Design Systems Improve Product Consistency and Development Speed",
    platform: "linkedin",
    date: new Date(2023, 6, 15),
    status: "scheduled",
  },
  {
    id: 2,
    title: "Product Strategy: Aligning Business Goals with User Needs",
    platform: "medium",
    date: new Date(2023, 6, 18),
    status: "draft",
  },
  {
    id: 3,
    title: "The Role of User Research in Product Innovation",
    platform: "linkedin",
    date: new Date(2023, 6, 22),
    status: "in-review",
  },
  {
    id: 4,
    title: "Design Leadership: Building and Managing Effective Teams",
    platform: "twitter",
    date: new Date(2023, 6, 25),
    status: "scheduled",
  },
];

const UpcomingContent = () => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-[#0077B5]" />;
      case "medium":
        return <MessageSquare className="h-4 w-4 text-[#00AB6C]" />;
      case "twitter":
        return <Twitter className="h-4 w-4 text-[#1DA1F2]" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Scheduled</Badge>;
      case "in-review":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">In Review</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="col-span-full md:col-span-1 card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingContent.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-sm">{item.title}</h3>
                {getPlatformIcon(item.platform)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {format(item.date, "MMM dd, yyyy")}
                </span>
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingContent;
