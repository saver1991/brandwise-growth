import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Dashboard from "@/pages/Index";
import ProfilesPage from "@/pages/profiles/ProfilesPage";
import NewProfilePage from "@/pages/profiles/NewProfilePage";
import EditProfilePage from "@/pages/profiles/EditProfilePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import PrivateRoute from "@/components/PrivateRoute";
import WordPress from "@/pages/WordPress";
import LinkedIn from "@/pages/LinkedIn";
import Medium from "@/pages/Medium";
import Calendar from "@/pages/Calendar";
import Audience from "@/pages/Audience";
import Analytics from "@/pages/Analytics";
import Ideas from "@/pages/Ideas";
import Onboarding from "@/pages/Onboarding";
import ProfilePage from "@/pages/account/ProfilePage";
import SecurityPage from "@/pages/account/SecurityPage";
import BillingPage from "@/pages/account/BillingPage";
import SettingsPage from "@/pages/account/SettingsPage";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import About from "@/pages/About";
import Pricing from "@/pages/Pricing";
import Support from "@/pages/Support";
import Affiliate from "@/pages/Affiliate";
import Blog from "@/pages/Blog";
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import LinkedInCallback from "./pages/LinkedInCallback";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ProfileProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
              <Route path="/profiles" element={<PrivateRoute><ProfilesPage /></PrivateRoute>} />
              <Route path="/profiles/new" element={<PrivateRoute><NewProfilePage /></PrivateRoute>} />
              <Route path="/profiles/edit/:id" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
              <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
              <Route path="/ideas" element={<PrivateRoute><Ideas /></PrivateRoute>} />
              <Route path="/audience" element={<PrivateRoute><Audience /></PrivateRoute>} />
              <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
              <Route path="/linkedin" element={<PrivateRoute><LinkedIn /></PrivateRoute>} />
              <Route path="/medium" element={<PrivateRoute><Medium /></PrivateRoute>} />
              <Route path="/wordpress" element={<PrivateRoute><WordPress /></PrivateRoute>} />
              <Route path="/account/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/account/security" element={<PrivateRoute><SecurityPage /></PrivateRoute>} />
              <Route path="/account/billing" element={<PrivateRoute><BillingPage /></PrivateRoute>} />
              <Route path="/account/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
              <Route path="/home" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/support" element={<Support />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/linkedin-callback" element={<LinkedInCallback />} />
            </Routes>
            <Toaster />
            <SonnerToaster />
          </ProfileProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
