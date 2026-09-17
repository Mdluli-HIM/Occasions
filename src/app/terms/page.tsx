import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata = {
  title: "Terms & Conditions | Occasions",
  description: "The terms that govern your use of the Occasions marketplace.",
};

const sections = [
  {
    title: "1. Acceptance of terms",
    body: [
      "By accessing or using Occasions (\"the platform\"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the platform.",
    ],
  },
  {
    title: "2. Description of service",
    body: [
      "Occasions is an online marketplace that connects customers seeking event services (such as catering, tents, décor, sound and photography) with independent service providers across South Africa.",
      "Occasions does not itself provide catering, equipment hire, décor or any other listed service — we facilitate discovery and initial contact between customers and providers.",
    ],
  },
  {
    title: "3. User accounts",
    body: [
      "You must provide accurate information when creating an account and are responsible for maintaining the confidentiality of your login credentials.",
      "Occasions supports two account types: customer accounts, for browsing providers and requesting quotes, and provider accounts, for listing a business and managing leads.",
    ],
  },
  {
    title: "4. Provider listings",
    body: [
      "Providers are responsible for the accuracy of their listing information, including pricing, service areas, and availability.",
      "A \"Verified\" badge indicates a provider has completed our verification process at the time it was granted; it is not a guarantee of ongoing quality or availability.",
      "Occasions reserves the right to remove or suspend any listing that violates these terms or is reported as fraudulent or misleading.",
    ],
  },
  {
    title: "5. Quotes and bookings",
    body: [
      "Submitting a quote request through the platform creates no obligation on either the customer or the provider to proceed with a booking.",
      "Any agreement, contract, deposit or payment for services is made directly between the customer and the provider. Occasions is not a party to that agreement and is not responsible for the performance, quality, pricing or delivery of services booked through a provider found on the platform.",
    ],
  },
  {
    title: "6. Provider packages and payments",
    body: [
      "Provider listing packages (such as Starter, Featured or Premium) determine visibility features on the platform and are billed as described at the time of purchase.",
      "Package fees relate solely to listing visibility on Occasions and do not constitute payment for, or a guarantee of, any bookings or leads.",
    ],
  },
  {
    title: "7. Prohibited use",
    body: [
      "You may not use the platform to submit false information, harass other users, scrape or misuse platform data, or attempt to circumvent security features.",
      "Providers may not use the quote request system to send unsolicited marketing unrelated to a customer's original enquiry.",
    ],
  },
  {
    title: "8. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, Occasions is not liable for any indirect, incidental or consequential damages arising from your use of the platform, or from any service booked with a provider found through the platform.",
      "Occasions makes no warranty as to the availability, quality or suitability of any provider or service listed on the platform.",
    ],
  },
  {
    title: "9. Termination",
    body: [
      "We may suspend or terminate access to the platform for any account that violates these terms. You may stop using the platform and close your account at any time.",
    ],
  },
  {
    title: "10. Governing law",
    body: [
      "These terms are governed by the laws of the Republic of South Africa, and any disputes will be subject to the jurisdiction of the South African courts.",
    ],
  },
  {
    title: "11. Changes to these terms",
    body: [
      "We may update these Terms & Conditions from time to time. Continued use of the platform after changes are posted constitutes acceptance of the updated terms.",
    ],
  },
  {
    title: "12. Contact us",
    body: [
      "Questions about these terms can be sent to support@occasions.co.za.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#111111]">
      <SiteHeader />

      <main className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5a40]">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Terms & Conditions
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
