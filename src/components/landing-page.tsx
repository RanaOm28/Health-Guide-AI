import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HydrationEstimator } from "@/components/hydration-estimator";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { WellnessCalculator } from "@/components/wellness-calculator";
import { WellnessJourney } from "@/components/wellness-journey";
import { WellnessPaths } from "@/components/wellness-paths";
import { WellnessTools } from "@/components/wellness-tools";

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <WellnessJourney />
        <WellnessTools />
        <WellnessCalculator />
        <WellnessPaths />
        <HydrationEstimator />
      </main>
      <Footer />
    </>
  );
}
