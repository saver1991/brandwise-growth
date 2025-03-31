
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Ideas from "./pages/Ideas";
import LinkedIn from "./pages/LinkedIn";
import Audience from "./pages/Audience";
import Medium from "./pages/Medium";
import WordPress from "./pages/WordPress";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ProfileProvider } from "./contexts/ProfileContext";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Support from "./pages/Support";
import Pricing from "./pages/Pricing";
import Affiliate from "./pages/Affiliate";
import Register from "./pages/Register";
import Integrations from "./pages/Integrations";
import Blog from "./pages/Blog";
import Guides from "./pages/Guides";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import BlogPost from "./pages/BlogPost";
import CookieConsent from "./components/CookieConsent";
import ForgotPassword from "./pages/ForgotPassword";

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
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/ideas" element={<Ideas />} />
              <Route path="/linkedin" element={<LinkedIn />} />
              <Route path="/audience" element={<Audience />} />
              <Route path="/medium" element={<Medium />} />
              <Route path="/wordpress" element={<WordPress />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/register" element={<Register />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieConsent />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ProfileProvider>
  );
}

export default App;
