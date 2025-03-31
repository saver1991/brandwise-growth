
export interface PersonalInfo {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  companyName: string;
  companySize: string;
}

export interface PlanInfo {
  selectedPlan: "starter" | "professional" | "enterprise";
  billingCycle: "monthly" | "yearly";
}

export interface BillingInfo {
  paymentMethod: "creditCard" | "paypal" | "bankTransfer" | "googlePay" | "applePay" | "amazonPay";
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface RegistrationFormData {
  personal: PersonalInfo;
  plan: PlanInfo;
  billing: BillingInfo;
}
