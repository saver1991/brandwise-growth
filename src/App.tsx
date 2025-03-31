
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import { ThemeProvider } from "./contexts/ThemeContext";
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
import ProfilePage from "./pages/account/ProfilePage";
import SecurityPage from "./pages/account/SecurityPage";
import BillingPage from "./pages/account/BillingPage";
import SettingsPage from "./pages/account/SettingsPage";
import NewProfilePage from "./pages/profiles/NewProfilePage";
import EditProfilePage from "./pages/profiles/EditProfilePage";
import ProfilesPage from "./pages/profiles/ProfilesPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <ScrollToTop />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/affiliate" element={<Affiliate />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/guides" element={<Guides />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={<PrivateRoute><Index /></PrivateRoute>} />
                  <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
                  <Route path="/ideas" element={<PrivateRoute><Ideas /></PrivateRoute>} />
                  <Route path="/linkedin" element={<PrivateRoute><LinkedIn /></PrivateRoute>} />
                  <Route path="/audience" element={<PrivateRoute><Audience /></PrivateRoute>} />
                  <Route path="/medium" element={<PrivateRoute><Medium /></PrivateRoute>} />
                  <Route path="/wordpress" element={<PrivateRoute><WordPress /></PrivateRoute>} />
                  <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
                  <Route path="/account/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                  <Route path="/account/security" element={<PrivateRoute><SecurityPage /></PrivateRoute>} />
                  <Route path="/account/billing" element={<PrivateRoute><BillingPage /></PrivateRoute>} />
                  <Route path="/account/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
                  <Route path="/profiles/new" element={<PrivateRoute><NewProfilePage /></PrivateRoute>} />
                  <Route path="/profiles/edit/:id" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
                  <Route path="/profiles" element={<PrivateRoute><ProfilesPage /></PrivateRoute>} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CookieConsent />
              </TooltipProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
