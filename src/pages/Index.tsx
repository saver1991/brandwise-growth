
import { Linkedin, Users, TrendingUp, Award, MessageSquare } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProfileSummary from "@/components/ProfileSummary";
import StatCard from "@/components/StatCard";
import EngagementChart from "@/components/EngagementChart";
import ContentPerformance from "@/components/ContentPerformance";
import ContentIdeas from "@/components/ContentIdeas";
import UpcomingContent from "@/components/UpcomingContent";
import RecentActivity from "@/components/RecentActivity";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="brand-container space-y-8">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">Brand Growth Dashboard</h1>
            <p className="text-muted-foreground">
              Track, analyze and optimize your personal brand
            </p>
          </div>
          
          <ProfileSummary />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="LinkedIn Followers" 
              value="2,845" 
              change={{ value: "12%", positive: true }}
              icon={Linkedin}
              className="bg-gradient-to-br from-card to-[#0077B5]/5"
            />
            <StatCard 
              title="Medium Followers" 
              value="1,249" 
              change={{ value: "8%", positive: true }}
              icon={MessageSquare}
              className="bg-gradient-to-br from-card to-[#00AB6C]/5"
            />
            <StatCard 
              title="Total Audience" 
              value="4,520" 
              change={{ value: "10%", positive: true }}
              icon={Users}
              className="bg-gradient-to-br from-card to-brand-teal/5"
            />
            <StatCard 
              title="Engagement Rate" 
              value="4.8%" 
              change={{ value: "0.5%", positive: true }}
              icon={TrendingUp}
              className="bg-gradient-to-br from-card to-brand-orange/5"
            />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <EngagementChart />
            <UpcomingContent />
            <ContentPerformance />
            <RecentActivity />
          </div>
          
          <ContentIdeas />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
