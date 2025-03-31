
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Dashboard from "@/pages/Index";
import ProfilesPage from "@/pages/profiles/ProfilesPage";
import NewProfilePage from "@/pages/profiles/NewProfilePage";
import EditProfilePage from "@/pages/profiles/EditProfilePage";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/profiles/new" element={<NewProfilePage />} />
            <Route path="/profiles/edit/:id" element={<EditProfilePage />} />
          </Routes>
          <Toaster />
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
