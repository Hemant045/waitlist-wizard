import HeroSection from "@/components/hero-section";
import CourseList from "@/components/course-list";
import WaitlistForm from "@/components/waitlist-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <CourseList />
        <WaitlistForm />
      </main>
    </div>
  );
}