
// This is a template for a Supabase Edge Function to handle Google Analytics authentication
// You would deploy this to your Supabase project using the Supabase CLI

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// IMPORTANT: These environment variables need to be set in your Supabase project
// You can set them using: supabase secrets set NAME=VALUE
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID") || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";
const REDIRECT_URI = Deno.env.get("REDIRECT_URI") || "";

serve(async (req) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    // Get authorization header from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    // Extract the token
    const token = authHeader.replace("Bearer ", "");
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Verify the user's JWT token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid user token" }),
        { status: 401, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    // Parse URL and get the endpoint path
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();

    switch(path) {
      case "properties":
        // Handle the properties endpoint
        // In a real implementation, you would fetch the user's GA properties
        // For now, return sample data
        return new Response(
          JSON.stringify({
            properties: [
              { id: "123456789", name: "Your Website" },
              { id: "987654321", name: "Your Blog" },
              { id: "456789123", name: "Your E-commerce Store" }
            ]
          }),
          { 
            status: 200, 
            headers: { ...headers, "Content-Type": "application/json" } 
          }
        );

      // Add more endpoints as needed

      default:
        return new Response(
          JSON.stringify({ error: "Endpoint not found" }),
          { 
            status: 404, 
            headers: { ...headers, "Content-Type": "application/json" } 
          }
        );
    }
  } catch (error) {
    console.error("Edge function error:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...headers, "Content-Type": "application/json" } 
      }
    );
  }
});
