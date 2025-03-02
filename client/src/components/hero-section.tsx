import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-in slide-in-from-bottom duration-500">
        Learn New Skills & Advance Your Career
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500 delay-150">
        Master in-demand skills with our comprehensive online courses. High-quality content at affordable prices, designed for Indian learners.
      </p>
      <Button
        size="lg"
        className="animate-in slide-in-from-bottom duration-500 delay-300"
        onClick={() => {
          document.querySelector("#course-list")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Browse Courses
      </Button>
    </section>
  );
}