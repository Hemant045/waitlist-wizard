import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import WaitlistForm from "@/components/waitlist-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <FeaturesSection />
        <WaitlistForm />
      </main>
    </div>
  );
}
