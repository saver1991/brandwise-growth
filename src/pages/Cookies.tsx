import { useEffect } from "react";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";

const Cookies = () => {
  useEffect(() => {
    document.title = "Cookies Policy | BrandWise";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-heading text-center">Cookie Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last Updated: May 1, 2023
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              This Cookie Policy explains how BrandWise Inc. ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at brandwise.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            <p>
              In some cases, we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, BrandWise Inc.) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Why do we use cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Types of cookies we use</h2>
            <p>
              The specific types of first- and third-party cookies served through our Website and the purposes they perform are described below:
            </p>
            <h3 className="text-xl font-bold mt-6 mb-3">Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.
            </p>
            <h3 className="text-xl font-bold mt-6 mb-3">Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
            </p>
            <h3 className="text-xl font-bold mt-6 mb-3">Analytics and Customization Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
            </p>
            <h3 className="text-xl font-bold mt-6 mb-3">Advertising Cookies</h3>
            <p>
              These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How can you control cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager that we make available on our Website.
            </p>
            <p>
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
            </p>
            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Digital Advertising Alliance</li>
              <li>Digital Advertising Alliance of Canada</li>
              <li>European Interactive Digital Advertising Alliance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How often will we update this Cookie Policy?</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@brandwise.com<br />
              <strong>Address:</strong> 123 Brand Street, Suite 100, San Francisco, CA 94105
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cookies;
