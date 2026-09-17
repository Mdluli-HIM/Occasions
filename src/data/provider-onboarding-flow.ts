export const onboardingStepIds = [
  "address",
  "about-your-business",
  "service-type",
  "service-model",
  "business-basics",
  "coverage-area",
  "stand-out",
  "photos",
  "services",
  "description",
  "contact",
  "review",
  "success",
] as const;

export type OnboardingStepId = (typeof onboardingStepIds)[number];

export const onboardingSteps: Array<{
  id: OnboardingStepId;
  title: string;
}> = onboardingStepIds.map((id) => ({
  id,
  title: id,
}));
