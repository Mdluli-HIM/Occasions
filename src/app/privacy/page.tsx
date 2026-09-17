import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata = {
  title: "Privacy Policy | Occasions",
  description: "How Occasions collects, uses and protects your information.",
};

const sections = [
  {
    title: "1. Introduction",
    body: [
      "This Privacy Policy explains how Occasions South Africa (Pty) Ltd (\"Occasions\", \"we\", \"us\") collects, uses, discloses and protects personal information when you use our website and services, in accordance with the Protection of Personal Information Act, 2013 (POPIA).",
      "By using Occasions, you consent to the collection and use of your information as described in this policy.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "Account information: name, email address, phone number and password when you register as a customer or provider.",
      "Provider listing information: business details, service categories, coverage areas, pricing, photos and descriptions you submit when listing a business.",
      "Quote requests: name, contact details, event details and messages you submit when requesting a quote from a provider.",
      "Usage information: pages visited, searches performed and general device/browser information, collected automatically to help us improve the service.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "To operate the marketplace: matching customers with providers, delivering quote requests, and displaying provider listings in search results.",
      "To communicate with you: account notifications, lead alerts for providers, and responses to support enquiries.",
      "To improve our services: understanding how the platform is used so we can fix issues and build better features.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    title: "4. Sharing your information",
    body: [
      "When you submit a quote request, your name, contact details and message are shared with the relevant provider so they can respond to your enquiry.",
      "We may share information with service providers who help us operate the platform (such as hosting and email delivery), under confidentiality obligations.",
      "We may disclose information where required by law or to protect the rights, safety or property of Occasions, our users, or the public.",
    ],
  },
  {
    title: "5. Cookies",
    body: [
      "We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how the site is used. You can control cookies through your browser settings, though some features may not work correctly if cookies are disabled.",
    ],
  },
  {
    title: "6. Data security",
    body: [
      "We take reasonable technical and organisational measures to protect your personal information against loss, misuse or unauthorised access. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Your rights",
    body: [
      "Under POPIA, you have the right to access the personal information we hold about you, request correction or deletion of that information, and object to certain processing of your information.",
      "To exercise these rights, contact us using the details below.",
    ],
  },
  {
    title: "8. Data retention",
    body: [
      "We retain personal information for as long as necessary to provide our services and comply with legal obligations. Account information is retained while your account is active, and quote request information is retained to support the customer-provider relationship it relates to.",
    ],
  },
  {
    title: "9. Children's privacy",
    body: [
      "Occasions is not directed at children, and we do not knowingly collect personal information from children under the age of 18 without appropriate consent.",
    ],
  },
  {
    title: "10. Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. Material changes will be reflected by an updated \"last updated\" date on this page.",
    ],
  },
  {
    title: "11. Contact us",
    body: [
      "If you have questions about this Privacy Policy or how your information is handled, contact us at support@occasions.co.za.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#111111]">
      <SiteHeader />

      <main className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm font-bold text-[#8a8a8a]">
            Last updated: January 2026
          </p>

          <div className="mt-10 grid gap-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-black text-[#111111]">
                  {section.title}
                </h2>

                <div className="mt-3 grid gap-3">
                  {section.body.map((paragraph, index) => (
                    <p key={index}
                      className="text-base leading-8 text-[#43494f]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
