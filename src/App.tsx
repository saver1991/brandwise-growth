
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Ideas from "./pages/Ideas";
import LinkedIn from "./pages/LinkedIn";
import Audience from "./pages/Audience";
import Medium from "./pages/Medium";
import Analytics from "./pages/Analytics";
import Credentials from "./pages/Credentials";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    {/* Auth Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected Routes */}
    <Route path="/" element={
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    } />
    <Route path="/calendar" element={
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    } />
    <Route path="/ideas" element={
      <ProtectedRoute>
        <Ideas />
      </ProtectedRoute>
    } />
    <Route path="/linkedin" element={
      <ProtectedRoute>
        <LinkedIn />
      </ProtectedRoute>
    } />
    <Route path="/audience" element={
      <ProtectedRoute>
        <Audience />
      </ProtectedRoute>
    } />
    <Route path="/medium" element={
      <ProtectedRoute>
        <Medium />
      </ProtectedRoute>
    } />
    <Route path="/analytics" element={
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    } />
    <Route path="/credentials" element={
      <ProtectedRoute>
        <Credentials />
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />
    
    {/* 404 Page */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
