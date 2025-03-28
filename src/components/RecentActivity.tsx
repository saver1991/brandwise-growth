
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: number;
  type: "comment" | "connection" | "mention" | "share";
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  time: Date;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "comment",
    user: {
      name: "Alex Chen",
      initials: "AC",
    },
    content: "Commented on your LinkedIn post about product design methodologies",
    time: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: 2,
    type: "connection",
    user: {
      name: "Sophia Rodriguez",
      initials: "SR",
    },
    content: "Connected with you on LinkedIn",
    time: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: 3,
    type: "share",
    user: {
      name: "Michael Thompson",
      initials: "MT",
    },
    content: "Shared your Medium article on design systems",
    time: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: 4,
    type: "mention",
    user: {
      name: "Priya Patel",
      initials: "PP",
    },
    content: "Mentioned you in a comment about product strategy",
    time: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
];

const RecentActivity = () => {
  return (
    <Card className="col-span-full md:col-span-1 card-hover">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-brand-blue/10 text-brand-blue">
                  {activity.user.initials}
                </AvatarFallback>
                {activity.user.avatar && (
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                )}
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  {activity.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.time, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
