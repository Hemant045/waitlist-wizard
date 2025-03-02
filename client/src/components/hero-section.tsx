import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-in slide-in-from-bottom duration-500">
        Transform Your Business
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500 delay-150">
        Revolutionize your workflow with our innovative platform. Join the waitlist to be among the first to experience the future of business management.
      </p>
      <Button
        size="lg"
        className="animate-in slide-in-from-bottom duration-500 delay-300"
        onClick={() => {
          document.querySelector("#waitlist-form")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Join the Waitlist
      </Button>
    </section>
  );
}
