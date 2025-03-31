
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid' | null;

export interface SubscriptionData {
  plan: string;
  price: string;
  renewal_date: string;
  status: SubscriptionStatus;
  payment_method: {
    type: "card";
    last4: string;
    expiry: string;
  } | null;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  stripe_price_id?: string;
}

export function useSubscription() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // Check subscription status using edge function
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        throw new Error(error.message);
      }
      
      setHasActiveSubscription(data.hasActiveSubscription);
      setSubscription(data.subscriptionData);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err.message);
      
      // Fall back to local profile data if the edge function fails
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('subscription_data')
          .eq('id', user.id)
          .single();
          
        if (profileError) throw profileError;
        
        if (profile?.subscription_data) {
          // Type assertion with proper validation
          const subData = profile.subscription_data as unknown;
          
          if (
            subData && 
            typeof subData === 'object' && 
            !Array.isArray(subData) && 
            'plan' in subData && 
            'price' in subData && 
            'renewal_date' in subData && 
            'status' in subData
          ) {
            setSubscription(subData as SubscriptionData);
            setHasActiveSubscription(
              (subData as SubscriptionData).status === 'active'
            );
          }
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create checkout session for subscribing to a plan
  const createCheckoutSession = async (priceId: string) => {
    if (!user) {
      toast.error('You must be logged in to subscribe');
      return;
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId }
      });
      
      if (error) throw new Error(error.message);
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      toast.error(err.message || 'Failed to start checkout process');
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  return { 
    subscription, 
    isLoading, 
    error, 
    hasActiveSubscription, 
    refreshSubscription: fetchSubscription,
    createCheckoutSession
  };
}
