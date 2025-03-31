
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AuthProvider } from "@/contexts/AuthContext";
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

// Account pages
import ProfilePage from "@/pages/account/ProfilePage";
import SecurityPage from "@/pages/account/SecurityPage";
import BillingPage from "@/pages/account/BillingPage";
import SettingsPage from "@/pages/account/SettingsPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
          <Routes>
            {/* Dashboard routes - both root and /dashboard point to the same component */}
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            
            {/* Profile routes */}
            <Route path="/profiles" element={<PrivateRoute><ProfilesPage /></PrivateRoute>} />
            <Route path="/profiles/new" element={<PrivateRoute><NewProfilePage /></PrivateRoute>} />
            <Route path="/profiles/edit/:id" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
            
            {/* Content routes */}
            <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
            <Route path="/ideas" element={<PrivateRoute><Ideas /></PrivateRoute>} />
            <Route path="/audience" element={<PrivateRoute><Audience /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
            
            {/* Platform-specific routes */}
            <Route path="/linkedin" element={<PrivateRoute><LinkedIn /></PrivateRoute>} />
            <Route path="/medium" element={<PrivateRoute><Medium /></PrivateRoute>} />
            <Route path="/wordpress" element={<PrivateRoute><WordPress /></PrivateRoute>} />
            
            {/* Account settings routes */}
            <Route path="/account/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/account/security" element={<PrivateRoute><SecurityPage /></PrivateRoute>} />
            <Route path="/account/billing" element={<PrivateRoute><BillingPage /></PrivateRoute>} />
            <Route path="/account/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          <Toaster />
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
