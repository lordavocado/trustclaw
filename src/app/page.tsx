import { LandingNav } from "./_components/landing-nav";
import { HeroSection } from "./_components/hero-section";
import { FeaturesSection } from "./_components/features-section";
import { HowItWorksSection } from "./_components/comparison-section";
import { PricingSection } from "./_components/pricing-section";
import { BottomCtaSection } from "./_components/bottom-cta-section";
import { LandingFooter } from "./_components/landing-footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <BottomCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
