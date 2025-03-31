
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

export interface InvoiceData {
  id: string;
  date: number; // Unix timestamp
  amount: string;
  status: string;
  pdf?: string;
}

export function useSubscription() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Fetching subscription data for user:', user.id);
      
      // Check subscription status using edge function
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error from check-subscription function:', error);
        throw new Error(error.message);
      }
      
      console.log('Subscription data received:', data);
      setHasActiveSubscription(data.hasActiveSubscription);
      setSubscription(data.subscriptionData);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err.message);
      
      // Fall back to local profile data if the edge function fails
      try {
        console.log('Falling back to profile data');
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('subscription_data, email')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }
        
        console.log('Profile data:', profile);
        
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
  
  const fetchInvoiceHistory = async () => {
    if (!user) return;
    
    try {
      setIsLoadingInvoices(true);
      console.log('Fetching invoice history');
      
      const { data, error } = await supabase.functions.invoke('get-invoice-history');
      
      if (error) {
        console.error('Error from get-invoice-history function:', error);
        throw new Error(error.message);
      }
      
      console.log('Invoice data received:', data);
      setInvoices(data.invoices || []);
    } catch (err) {
      console.error('Error fetching invoice history:', err);
      toast.error('Failed to load invoice history');
    } finally {
      setIsLoadingInvoices(false);
    }
  };
  
  // Create checkout session for subscribing to a plan
  const createCheckoutSession = async (priceId: string) => {
    if (!user) {
      toast.error('You must be logged in to subscribe');
      return;
    }
    
    try {
      console.log(`Creating checkout session for price ID: ${priceId}`);
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId }
      });
      
      if (error) {
        console.error('Error from create-checkout-session function:', error);
        throw new Error(error.message);
      }
      
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
    createCheckoutSession,
    invoices,
    isLoadingInvoices,
    fetchInvoiceHistory
  };
}
