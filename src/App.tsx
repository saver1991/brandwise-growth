
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Ideas from "./pages/Ideas";
import LinkedIn from "./pages/LinkedIn";
import Audience from "./pages/Audience";
import Medium from "./pages/Medium";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    {/* Auth Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/onboarding" element={
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    } />
    
    {/* Protected Routes */}
    <Route path="/" element={
      <ProtectedRoute>
        <DataProvider>
          <Index />
        </DataProvider>
      </ProtectedRoute>
    } />
    <Route path="/calendar" element={
      <ProtectedRoute>
        <DataProvider>
          <Calendar />
        </DataProvider>
      </ProtectedRoute>
    } />
    <Route path="/ideas" element={
      <ProtectedRoute>
        <DataProvider>
          <Ideas />
        </DataProvider>
      </ProtectedRoute>
    } />
    <Route path="/linkedin" element={
      <ProtectedRoute>
        <DataProvider>
          <LinkedIn />
        </DataProvider>
      </ProtectedRoute>
    } />
    <Route path="/audience" element={
      <ProtectedRoute>
        <DataProvider>
          <Audience />
        </DataProvider>
      </ProtectedRoute>
    } />
    <Route path="/medium" element={
      <ProtectedRoute>
        <DataProvider>
          <Medium />
        </DataProvider>
      </ProtectedRoute>
    } />
    <Route path="/analytics" element={
      <ProtectedRoute>
        <DataProvider>
          <Analytics />
        </DataProvider>
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
