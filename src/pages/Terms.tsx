
import { useEffect } from "react";
import AuthHeader from "@/components/AuthHeader";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | BrandWise";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-heading text-center">Terms and Conditions</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last Updated: May 1, 2023
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with the BrandWise website and service (the "Service") operated by BrandWise Inc. ("us", "we", or "our").
            </p>
            <p>
              Please read these Terms and Conditions carefully before using our Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Subscriptions</h2>
            <p>
              Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
            </p>
            <p>
              At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or BrandWise Inc. cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting BrandWise Inc. customer support team.
            </p>
            <p>
              A valid payment method, including credit card, is required to process the payment for your Subscription. You shall provide BrandWise Inc. with accurate and complete billing information including full name, address, state, zip code, telephone number, and valid payment method information. By submitting such payment information, you automatically authorize BrandWise Inc. to charge all Subscription fees incurred through your account to any such payment instruments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Free Trial</h2>
            <p>
              BrandWise Inc. may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").
            </p>
            <p>
              You may be required to enter your billing information in order to sign up for the Free Trial. If you do enter your billing information when signing up for the Free Trial, you will not be charged by BrandWise Inc. until the Free Trial has expired. On the last day of the Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable Subscription fee for the type of Subscription you have selected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.
            </p>
            <p>
              You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Accounts</h2>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            </p>
            <p>
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of BrandWise Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of BrandWise Inc.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p>
              In no event shall BrandWise Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> legal@brandwise.com<br />
              <strong>Address:</strong> 123 Brand Street, Suite 100, San Francisco, CA 94105
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
