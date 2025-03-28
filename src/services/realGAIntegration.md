
# Implementing Real Google Analytics Integration

## Current Status
The application currently displays simulated Google Analytics data. To show real data from your Google Analytics account, you need to:

1. **Complete Google Cloud Setup**:
   - Create a project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Google Analytics Data API
   - Configure OAuth consent screen
   - Create OAuth credentials (OAuth 2.0 Client ID)

2. **Implement a Supabase Edge Function for OAuth**:
   - The Edge Function will handle the OAuth flow with Google
   - It will securely store refresh tokens in your Supabase database
   - It will make authenticated calls to the Google Analytics API

## Implementation Steps

### 1. Complete Google Cloud Setup

If you haven't already:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or use your existing one
3. Search for "Google Analytics Data API" and enable it
4. Go to "APIs & Services" > "OAuth consent screen"
   - Set user type to "External" (unless you have a Google Workspace)
   - Fill in required app information
   - Add the scopes: `.../auth/analytics.readonly`
   - Add test users (including your own email)
5. Go to "APIs & Services" > "Credentials"
   - Create an "OAuth client ID"
   - Application type: "Web application"
   - Add authorized redirect URIs (will be your Supabase Edge Function URL)
   - Save your Client ID and Client Secret

### 2. Create a Supabase Edge Function

Create a new Edge Function in your Supabase project:

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase CLI
supabase login

# Link to your Supabase project
supabase link --project-ref your-project-ref

# Create Edge Function
supabase functions new google-analytics-auth
```

### 3. Implement the Edge Function

Edit the `supabase/functions/google-analytics-auth/index.ts` file with the following code:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0"

// Get environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
const CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID') ?? ''
const CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET') ?? ''
const REDIRECT_URI = Deno.env.get('REDIRECT_URI') ?? ''

// Create Supabase client
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Handle requests
serve(async (req) => {
  // Get the current user from the request
  const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization') ?? '' },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Parse the request URL and path
  const url = new URL(req.url)
  const path = url.pathname.split('/').pop()

  // Handle different endpoints
  switch (path) {
    case 'auth': {
      // Generate Google OAuth URL
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/analytics.readonly&access_type=offline&prompt=consent`
      return new Response(
        JSON.stringify({ url: authUrl }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    case 'callback': {
      // Handle OAuth callback
      const code = url.searchParams.get('code')
      if (!code) {
        return new Response(
          JSON.stringify({ error: 'No authorization code provided' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Exchange code for tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      })

      const tokens = await tokenResponse.json()

      // Store tokens in Supabase
      await supabaseAdmin
        .from('ga_tokens')
        .upsert({
          user_id: user.id,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: Date.now() + tokens.expires_in * 1000
        })

      // Redirect back to the app
      return new Response(
        null,
        { 
          status: 302,
          headers: { Location: '/credentials?tab=googleAnalytics&connected=true' } 
        }
      )
    }

    case 'properties': {
      // Fetch Google Analytics properties
      const { data: tokenData } = await supabaseAdmin
        .from('ga_tokens')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!tokenData || !tokenData.access_token) {
        return new Response(
          JSON.stringify({ error: 'No Google Analytics tokens found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Refresh token if expired
      let accessToken = tokenData.access_token
      if (Date.now() >= tokenData.expires_at) {
        const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: tokenData.refresh_token,
            grant_type: 'refresh_token'
          })
        })

        const refreshedTokens = await refreshResponse.json()
        accessToken = refreshedTokens.access_token

        // Update token in database
        await supabaseAdmin
          .from('ga_tokens')
          .update({
            access_token: accessToken,
            expires_at: Date.now() + refreshedTokens.expires_in * 1000
          })
          .eq('user_id', user.id)
      }

      // Call Google Analytics Admin API to get properties
      const propertiesResponse = await fetch(
        'https://analyticsadmin.googleapis.com/v1alpha/properties',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const propertiesData = await propertiesResponse.json()

      // Format and return properties data
      const properties = propertiesData.properties?.map(prop => ({
        id: prop.name.split('/').pop(),
        name: prop.displayName
      })) || []

      return new Response(
        JSON.stringify({ properties }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    case 'data': {
      // Get property ID from request
      const requestData = await req.json()
      const { propertyIds } = requestData

      if (!propertyIds || !propertyIds.length) {
        return new Response(
          JSON.stringify({ error: 'No property IDs provided' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Get user's access token
      const { data: tokenData } = await supabaseAdmin
        .from('ga_tokens')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!tokenData || !tokenData.access_token) {
        return new Response(
          JSON.stringify({ error: 'No Google Analytics tokens found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Refresh token if needed
      let accessToken = tokenData.access_token
      if (Date.now() >= tokenData.expires_at) {
        // Refresh token logic here...
        // Similar to the code in the 'properties' case
      }

      // Prepare response data structure
      const responseData = {
        properties: [],
        totalVisitors: 0,
        totalPageViews: 0,
        averageBounceRate: 0,
        trafficBySource: [],
        pagePerformance: []
      }

      // Fetch data for each property
      for (const propertyId of propertyIds) {
        // Example request to the Google Analytics Data API (GA4)
        const analyticsResponse = await fetch(
          `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
              dimensions: [{ name: 'date' }],
              metrics: [
                { name: 'totalUsers' },
                { name: 'screenPageViews' },
                { name: 'bounceRate' },
                { name: 'averageSessionDuration' }
              ]
            })
          }
        )

        const analyticsData = await analyticsResponse.json()
        
        // Process analytics data...
        // This will depend on your specific requirements and the structure of the GA4 API response
      }

      // Return analytics data
      return new Response(
        JSON.stringify(responseData),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    default:
      return new Response(
        JSON.stringify({ error: 'Not Found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
  }
})
```

### 4. Set Up Environment Variables in Supabase

Set the required environment variables for your Edge Function:

```bash
supabase secrets set GOOGLE_CLIENT_ID=your_client_id
supabase secrets set GOOGLE_CLIENT_SECRET=your_client_secret
supabase secrets set REDIRECT_URI=https://your-project-ref.supabase.co/functions/v1/google-analytics-auth/callback
```

### 5. Create Database Table for Token Storage

Create a table in your Supabase database to store Google Analytics tokens:

```sql
CREATE TABLE ga_tokens (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE ga_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own tokens"
  ON ga_tokens
  FOR ALL
  USING (auth.uid() = user_id);
```

### 6. Update Frontend Code

Update your frontend code to use the Edge Function instead of simulated data. The key changes would be:

1. Update the connection flow to redirect to the Edge Function's auth endpoint
2. Update the property fetching to call the Edge Function's properties endpoint
3. Update the data fetching to call the Edge Function's data endpoint

## Conclusion

Implementing real Google Analytics integration requires a server-side component for security reasons. By implementing the Supabase Edge Function as described above, you'll be able to securely authenticate with Google, store tokens, and fetch real data from your Google Analytics account.

For more information, refer to:
- [Google Analytics Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
