
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

const data = [
  {
    name: "Product Design Trends",
    views: 4200,
    shares: 120,
    comments: 85,
  },
  {
    name: "UX Leadership",
    views: 3800,
    shares: 95,
    comments: 62,
  },
  {
    name: "Strategy Tips",
    views: 5100,
    shares: 180,
    comments: 120,
  },
  {
    name: "Case Studies",
    views: 6500,
    shares: 210,
    comments: 150,
  },
  {
    name: "Future of Design",
    views: 3200,
    shares: 85,
    comments: 45,
  },
];

const ContentPerformance = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="col-span-full xl:col-span-2 card-hover">
      <CardHeader>
        <CardTitle>Content Performance by Topic</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 350}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
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
            <Bar dataKey="views" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
            <Bar dataKey="shares" fill="#F4A261" radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" fill="#0F2E3D" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ContentPerformance;
