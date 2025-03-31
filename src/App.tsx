
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
