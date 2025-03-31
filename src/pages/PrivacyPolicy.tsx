
import { useEffect } from "react";
import AuthHeader from "@/components/AuthHeader";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | BrandWise";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-heading text-center">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last Updated: May 1, 2023
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              BrandWise ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform and services.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, sign-up for or make purchases through our Services.
            </p>
            <h3 className="text-xl font-bold mt-6 mb-3">Personal Information</h3>
            <p>
              When you register with us, we collect personal information which may include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Username and password</li>
              <li>Billing address</li>
              <li>Payment information</li>
              <li>Company name and size</li>
              <li>Phone number</li>
            </ul>
            <h3 className="text-xl font-bold mt-6 mb-3">Usage Information</h3>
            <p>
              We automatically collect certain information about how you interact with our Services, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Log and usage data</li>
              <li>Device information</li>
              <li>Location information</li>
              <li>Cookie data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide, maintain, and improve our Services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates, security alerts, and support messages</li>
              <li>Respond to comments, questions, and requests</li>
              <li>Communicate about promotions, upcoming events, and other news about products and services</li>
              <li>Protect, investigate, and deter against fraudulent, unauthorized, or illegal activity</li>
              <li>Develop new products and services</li>
              <li>Monitor usage patterns and analyze trends</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Share Your Information</h2>
            <p>
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>With service providers who perform services on our behalf</li>
              <li>With business partners for marketing and promotional purposes</li>
              <li>In connection with a business transaction such as a merger or acquisition</li>
              <li>When required by law or to respond to legal process</li>
              <li>To protect our rights, property, and safety, or the rights, property, and safety of others</li>
              <li>With your consent or at your direction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request the rectification or erasure of your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time, where relevant</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@brandwise.com<br />
              <strong>Address:</strong> 123 Brand Street, Suite 100, San Francisco, CA 94105
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
