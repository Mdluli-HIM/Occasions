import { notFound } from "next/navigation";
import { ProviderOnboardingFlow } from "@/components/provider-onboarding/provider-onboarding-flow";
import {
  onboardingStepIds,
  type OnboardingStepId,
} from "@/data/provider-onboarding-flow";

type ProviderOnboardingStepPageProps = {
  params: Promise<{
    step: string;
  }>;
};

export function generateStaticParams() {
  return onboardingStepIds
    .filter((step) => step !== "address")
    .map((step) => ({
      step,
    }));
}

export default async function ProviderOnboardingStepPage({
  params,
}: ProviderOnboardingStepPageProps) {
  const { step } = await params;

  if (!onboardingStepIds.includes(step as OnboardingStepId)) {
    notFound();
  }

  return <ProviderOnboardingFlow currentStepId={step} />;
}
