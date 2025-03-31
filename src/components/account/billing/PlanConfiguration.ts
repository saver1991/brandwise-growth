
// Store Stripe plan price IDs
export const STRIPE_PLANS = {
  // Replace these with your actual Stripe price IDs
  basic: "price_1OqXJlC0nXqXieKSYwRjKCpr",
  professional: "price_1OqXK7C0nXqXieKSRG0uNxLJ", 
  enterprise: "price_1OqXKQC0nXqXieKS1pWWYWVj"
};

// Plan feature definitions
export const PLAN_FEATURES = {
  basic: {
    name: "Basic",
    price: "$9/month",
    features: [
      "5,000 words",
      "10 optimizations",
      "1 team member"
    ]
  },
  professional: {
    name: "Professional",
    price: "$29/month",
    features: [
      "10,000 words",
      "20 optimizations",
      "3 team members"
    ]
  },
  enterprise: {
    name: "Enterprise",
    price: "$99/month",
    features: [
      "Unlimited words",
      "Unlimited optimizations",
      "10 team members"
    ]
  }
};
