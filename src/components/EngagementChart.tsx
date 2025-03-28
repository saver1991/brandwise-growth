
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

const data = [
  { name: "Jan", linkedin: 230, medium: 130, twitter: 40 },
  { name: "Feb", linkedin: 290, medium: 140, twitter: 70 },
  { name: "Mar", linkedin: 280, medium: 170, twitter: 90 },
  { name: "Apr", linkedin: 320, medium: 190, twitter: 120 },
  { name: "May", linkedin: 390, medium: 240, twitter: 140 },
  { name: "Jun", linkedin: 490, medium: 280, twitter: 190 },
];

const EngagementChart = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="col-span-full xl:col-span-2 card-hover">
      <CardHeader>
        <CardTitle>Engagement Across Platforms</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 350}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="linkedin"
              stroke="#0077B5"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="medium"
              stroke="#00AB6C"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="twitter"
              stroke="#1DA1F2"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
