
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  try {
    // Get LinkedIn client ID from environment variable
    const LINKEDIN_CLIENT_ID = Deno.env.get('LINKEDIN_CLIENT_ID')
    
    console.log('LinkedIn Client ID request received')
    console.log('Retrieved LinkedIn Client ID:', LINKEDIN_CLIENT_ID ? 'Found a value' : 'No value found')
    
    if (!LINKEDIN_CLIENT_ID) {
      console.error('LinkedIn Client ID not configured')
      return new Response(
        JSON.stringify({ error: 'LinkedIn integration not configured' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }
    
    // Return the client ID to the client
    return new Response(
      JSON.stringify({ clientId: LINKEDIN_CLIENT_ID }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error retrieving LinkedIn client ID:', error)
    
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
