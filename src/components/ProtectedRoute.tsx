
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireOnboarding = true
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isOnboarding = location.pathname === "/onboarding";

  if (loading) {
    // You could add a loading spinner here
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If onboarding is required and not completed, redirect to onboarding
  // Unless we're already on the onboarding page
  if (requireOnboarding && !user.onboardingCompleted && !isOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
