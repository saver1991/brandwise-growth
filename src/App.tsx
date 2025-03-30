
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Ideas from "./pages/Ideas";
import LinkedIn from "./pages/LinkedIn";
import Audience from "./pages/Audience";
import Medium from "./pages/Medium";
import Analytics from "./pages/Analytics";
import WordPress from "./pages/WordPress"; // Add this import
import NotFound from "./pages/NotFound";
import { ProfileProvider } from "./contexts/ProfileContext";

const queryClient = new QueryClient();

function App() {
  return (
    <ProfileProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/ideas" element={<Ideas />} />
              <Route path="/linkedin" element={<LinkedIn />} />
              <Route path="/audience" element={<Audience />} />
              <Route path="/medium" element={<Medium />} />
              <Route path="/wordpress" element={<WordPress />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ProfileProvider>
  );
}

export default App;
