
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  className?: string;
}

const StatCard = ({ title, value, change, icon: Icon, className }: StatCardProps) => {
  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "text-xs", 
            change.positive 
              ? "text-green-500" 
              : "text-red-500"
          )}>
            {change.positive ? "↑" : "↓"} {change.value} since last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
